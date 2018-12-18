<template>
       <div class='main'>
            <LayoutHeader></LayoutHeader>
            <div class="menu-nav-wrap-full" v-bind:class="{ 'menu-nav-wrap-full-h2' : menuShow}">
                <div class="menu-nav-wrap">
                    <div class="menu-single-wrap" v-bind:class="{ 'menu-single-wrap-default' : (item.lb_id==labelData.id)}" @click="menuToLoad(item.lb_id,index)" v-for="(item,index) in labelList" v-on:mouseenter="menuSingleShow($event)" v-on:mouseleave="menuSingleHide($event)">
                    <a class="menu-single-a" :href="item.lb_id | addHref">{{item.lb_name}}</a>
                    </div>
                </div>
            </div>
            <div class="content-wrap">
                <div class="breadcrumb">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item><a class="breadcrumbFirst" :href="labelData.id | addHref">{{labelData.name}}</a></el-breadcrumb-item>
                        <el-breadcrumb-item>{{articleDetail.atc_title}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="article-wrap">
                    <div class="article-left-wrap">
                        <h1 class="article-left-h1">{{articleDetail.atc_title}}</h1>
                        <div class="article-left-header">
                           <span>预览：{{articleDetail.atc_preview}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                           <span>下载：{{articleDetail.atc_download}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                           <span>阅读：{{articleDetail.atc_read}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                           <span>发布：{{articleDetail.atc_publish_time | formatData}}</span>
                        </div>
                        <div class="article-left-content" v-html='articleDetail.atc_content'></div>
                        <a class="el-button-a" :href="articleDetail.atc_fileUrl"><el-button @click="onDownload" class="el-button-sp article-btn">下载</el-button></a> 
                        <a class="el-button-a" target="blank" :href="hrefFileUrl"><el-button @click="onPreview" class="el-button-sp article-btn">预览</el-button></a>
                        
                    </div>
                    <div class="article-right-wrap">
                        <div class="kuang-wrap">
                            <h2 class="kuang-wrap-h2">最近更新</h2>
                            <ul>
                               <li class="kuang-li" v-for="(item,index) in newList"><a :href="item.atc_id | addHref1" class="kuang-li-a">{{index+1}}.{{item.atc_title}}</a></li>
                            </ul>
                        </div>
                        <div class="kuang-wrap">
                            <h2 class="kuang-wrap-h2">相关文章</h2>
                            <ul>
                                <li class="kuang-li" v-for="(item,index) in reactList"><a :href="item.atc_id | addHref1" class="kuang-li-a">{{index+1}}.{{item.atc_title}}</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <LayoutFooter></LayoutFooter>
       </div>
</template>
<style>
@import "detail.css";
</style>
<script type="babel">
import {GET_ARTICLE_DETAIL, SET_LABEL_LIST} from '../admin/home/store/app/mutation-type';
import request from 'framework/network/request';
import $ from 'jquery';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import LayoutHeader from '../../component/layout/index/headercommon/headercommon';
import LayoutFooter from '../../component/layout/index/footer/footer';
import store from '../store/app';
import router from '../router';
import moment from 'moment';
export default {
store,
router,
components: {
    LayoutHeader,
    LayoutFooter
},
data(){
  return {
    defaultIndex:0,
    newList:[],
    reactList:[],
    labelData:[],
    atc_id: '',
    articleDetail:[],
    hrefFileUrl:'',
    labelList:[],
    menuShow:false,
  }
},
filters: {
    formatData(data){
    return moment(parseInt(data)).format('YYYY-MM-DD');
    },
    addHref(data){
    return '/document?id=' + data;
    },
    addHref1(data){
    return '/detail?id=' + data;
    },
    imgUrlFun(str){
    let data = '';
        str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
                data =  capture;
        });
    return data
    }
},
methods: {
    menuToLoad(lbId,index){
        this.defaultIndex=index;
        this.$router.push({
          name: 'Document',
          params: {
            id: lbId
          }
        });
      },
    onDownload(){
        request.get(`/detail/api/article/countDownload?atcid=${this.articleDetail.atc_id}`).then(response => {
        });
    },
    onPreview(){
        request.get(`/detail/api/article/countPreview?atcid=${this.articleDetail.atc_id}`).then(response => {
        });
    },
    onRead(){
        request.get(`/detail/api/article/countRead?atcid=${this.articleDetail.atc_id}`).then(response => {
        });
    },
    menuSingleShow(event){
        $(event.currentTarget).addClass('menu-single-wrap-active');
      },
    menuSingleHide(event){
        $(event.currentTarget).removeClass('menu-single-wrap-active');
      },
    getArticleDetailById(){
        // 获取文章id
        let currtIdArr = location.search.replace('?','');
        this.atc_id = currtIdArr.split('=')[1];
        // 通过文章id获取右边的两个列表
        this.getRightList(this.atc_id);
        request.get(`/detail/api/article/detail?id=${this.atc_id}`).then(response => {
            this.articleDetail = response.data.list[0];
            if (typeof this.articleDetail.atc_fileUrl !== 'undefined' && this.articleDetail.atc_fileUrl !== null) {
                this.hrefFileUrl = this.articleDetail.atc_fileUrl.split('.')[0] + '/index.html';
            }
        });
    },
    getLabelList(store){
        request.post(`/admin/api/label/list`,{},this.$store).then(response => {
            this.labelList = response.data.list;
            if(this.labelList.length > 10){
                this.menuShow = true;
            }else{
                this.menuShow =false;
            }
        });
    },
    getRightList(lbId){
        request.get(`/detail/api/article/list?id=${lbId}`).then(response => {
            this.reactList = response.data.reactList;
            this.newList = response.data.newList;
            this.labelData = response.data.labelData;
        });
    }
},
mounted() {
    // 百度统计代码
    var _hmt = _hmt || [];
    (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?f1114bf2679a9e797610cd8a52541da1";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
    })();
    const _this = this;
    setTimeout(function(){
        _this.onRead();
    },5000)
    this.getArticleDetailById();
    this.getLabelList(this.$store);
}
}
</script>
