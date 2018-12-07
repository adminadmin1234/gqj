<template>
       <div class='main'>
          <LayoutHeader></LayoutHeader>
          <div class="menu-nav-wrap-full" v-bind:class="{ 'menu-nav-wrap-full-h2' : menuShow}">
              <div class="menu-nav-wrap">
                  <div class="menu-single-wrap" v-for="item in labelList">
                    {{item.lb_name}}
                  </div>
              </div>
            </div>
            <div class="content-wrap">
                <div class="breadcrumb">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">jquery特效</el-breadcrumb-item>
                        <el-breadcrumb-item>超炫稻草人</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="article-wrap">
                    <div class="aricle-left-wrap">
                        <el-button><a :href="hrefFileUrl">预览</a></el-button>
                        <el-button><a :href="articleDetail.atc_fileUrl">下载</a></el-button>
                    </div>
                    <div class="aricle-right-wrap">
                    </div>
                </div>
            </div>
       </div>
</template>
<style>
@import "detail.css";
</style>
<script type="babel">
import {GET_ARTICLE_DETAIL, SET_LABEL_LIST} from '../admin/home/store/app/mutation-type';
import request from 'framework/network/request';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import LayoutHeader from '../../component/layout/index/headercommon/headercommon';
import store from '../store/app';
import router from '../router';
export default {
store,
router,
components: {
    LayoutHeader,
},
data(){
  return {
    atc_id: '',
    articleDetail:[],
    hrefFileUrl:'',
    labelList:[],
    menuShow:false,
  }
},
computed: {
    // articleData() {
    //     return this.$store.state.article;
    // },
    // labelList() {
    //     return this.$store.state.labelList;
    // }
  },
methods: {
    getArticleDetailById(){
        // 获取文章id
        let currtIdArr = location.search.replace('?','');
        this.atc_id = currtIdArr.split('=')[1];
        request.get(`/detail/api/article/detail?id=${this.atc_id}`).then(response => {
            this.articleDetail = response.data.list[0];
            if (typeof this.articleDetail.atc_fileUrl !== 'undefined' && this.articleDetail.atc_fileUrl !== null) {
                this.hrefFileUrl = this.articleDetail.atc_fileUrl.split('.')[0] + '/index.html';
            }
            console.log('this.articleDetail',this.articleDetail);
        });
    },
    getLabelList(store){
        // store.dispatch(SET_LABEL_LIST, {});
        request.post(`/admin/api/label/list`,{},this.$store).then(response => {
            console.log('getLabelList-response',response);
            this.labelList = response.data.list;
            if(this.labelList.length > 10){
                this.menuShow = true;
            }else{
                this.menuShow =false;
            }
        });
    }
},
mounted() {
    console.log('storestorestorestore', this.$store);
    this.getArticleDetailById();
    this.getLabelList(this.$store);
}
}
</script>
