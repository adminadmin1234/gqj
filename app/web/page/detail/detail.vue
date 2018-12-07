<template>
       <div class='main'>
          <LayoutHeader></LayoutHeader>
          <div class="menu-nav-wrap-full" v-bind:class="{ 'menu-nav-wrap-full-h2' : true}">
              <div class="menu-nav-wrap">
                  <div class="menu-single-wrap">轮播图{{labelList}}</div>
                  <div class="menu-single-wrap">导航栏</div>
                  <div class="menu-single-wrap">canvas</div>
                  <div class="menu-single-wrap">jquery特效</div>
                  <div class="menu-single-wrap">轮播图</div>
                  <div class="menu-single-wrap">轮播图</div>
                  <div class="menu-single-wrap">轮播图</div>
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
                        <el-button><a :href="articleData.hrefFileUrl">预览</a></el-button>
                        <el-button><a :href="articleData.atc_fileUrl">下载</a></el-button>
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
import store from '../admin/home/store/app';
import {GET_ARTICLE_DETAIL, SET_LABEL_LIST} from '../admin/home/store/app/mutation-type';
import request from 'framework/network/request';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import LayoutHeader from '../../component/layout/index/headercommon/headercommon';
export default {
store,
components: {
    LayoutHeader,
},
data(){
  return {
    atc_id: '',
  }
},
computed: {
    articleData() {
        return this.$store.state.article;
    },
    labelList() {
        return this.$store.state.labelList;
    }
  },
methods: {
    getArticleDetailById(){
        // 获取文章id
        let currtIdArr = location.search.replace('?','');
        this.atc_id = currtIdArr.split('=')[1];
        this.$store.dispatch(GET_ARTICLE_DETAIL, { id: this.atc_id });
    },
    getLabelList(store){
        store.dispatch(SET_LABEL_LIST, {});
    }
},
mounted() {
    this.getArticleDetailById();
    this.getLabelList(this.$store);
}
}
</script>
