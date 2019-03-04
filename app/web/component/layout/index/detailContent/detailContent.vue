<template>
    <div>
        <div class="menu-nav-wrap-full" v-bind:class="{ 'menu-nav-wrap-full-h2' : menuShow}">
            <div class="menu-nav-wrap">
                <div class="menu-single-wrap" v-bind:class="{ 'menu-single-wrap-default' : (item.lb_id==labelData.id)}" v-for="(item,index) in dataRes.labelList.list" v-on:mouseenter="menuSingleShow($event)" v-on:mouseleave="menuSingleHide($event)">
                <a class="menu-single-a" :href="item.lb_id | addHref">{{item.lb_name}}</a>
                </div>
            </div>
        </div>
        <div class="content-wrap">
            <div class="breadcrumb">
                <span><a class="breadcrumb-first" :href="labelData.id | addHref">{{labelData.name}}</a></span>
                <span class="breadcrumb-middle">/</span>
                <span class="last-breadcrumb-last">{{dataRes.articleDetail.list[0].atc_title}}</span>
            </div>
            <div class="article-wrap">
                <div class="article-left-wrap">
                    <h1 class="article-left-h1">{{dataRes.articleDetail.list[0].atc_title}}</h1>
                    <div class="article-left-header">
                        <span>预览：{{dataRes.articleDetail.list[0].atc_preview}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>下载：{{dataRes.articleDetail.list[0].atc_download}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>阅读：{{dataRes.articleDetail.list[0].atc_read}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>发布：{{dataRes.articleDetail.list[0].atc_publish_time | formatData}}</span>
                    </div>
                    <div class="article-left-content" id="article-left-content" v-html='dataRes.articleDetail.list[0].atc_content'></div>
                    <a class="el-button-a" v-if="dataRes.articleDetail.list[0].atc_fileUrl != null" :href="dataRes.articleDetail.list[0].atc_fileUrl"><span @click="onDownload" class="article-btn">下载</span></a> 
                    <a class="el-button-a" v-if="dataRes.articleDetail.list[0].atc_fileUrl != null" target="blank" :href="hrefFileUrl"><span @click="onPreview" class="article-btn">预览</span></a>
                </div>
                <div class="article-right-wrap">
                    <div class="kuang-wrap">
                        <h2 class="kuang-wrap-h2">最近更新</h2>
                        <ul>
                            <li class="kuang-li" v-for="(item,index) in dataRes.rightList.newList"><a :href="item.atc_id | addHref1" class="kuang-li-a">{{item.atc_title}}</a></li>
                        </ul>
                    </div>
                    <div class="kuang-wrap">
                        <h2 class="kuang-wrap-h2">相关文章</h2>
                        <ul>
                            <li class="kuang-li" v-for="(item,index) in dataRes.rightList.reactList"><a :href="item.atc_id | addHref1" class="kuang-li-a">{{item.atc_title}}</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import '../../../../asset/css/mixin.scss';
    @import "./detailContent.scss";
</style>
<script type="babel">
import request from 'framework/network/request';
import Vue from 'vue';
import format from 'date-fns/format'
export default {
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
    footerPosition:true,
  }
},
props:['dataRes'],
filters: {
    formatData(data){
    return format(parseInt(data),'YYYY-MM-DD');
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
    // 自动爬虫（百度）
    (function(){
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        }
        else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();
    const _this = this;
    setTimeout(function(){
        _this.onRead();
    },5000)
    if(this.dataRes.labelList.list.length > 10){
        this.menuShow = true;
    }else{
        this.menuShow =false;
    }
    if (typeof this.dataRes.articleDetail.list[0].atc_fileUrl !== 'undefined' && this.dataRes.articleDetail.list[0].atc_fileUrl !== null) {
        this.hrefFileUrl = this.dataRes.articleDetail.list[0].atc_fileUrl.split('.')[0] + '/index.html';
    }
    this.labelData = this.dataRes.rightList.labelData;
    this.articleDetail = this.dataRes.articleDetail.list[0];
}
}
</script>
