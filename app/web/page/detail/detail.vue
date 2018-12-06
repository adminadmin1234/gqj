<template>
       <div class='main'>
          <LayoutHeader></LayoutHeader>
          <div class="menu-nav-wrap-full">
              <div class="menu-nav-wrap">
                  <div class="menu-single-wrap">轮播图</div>
                  <div class="menu-single-wrap">导航栏</div>
                  <div class="menu-single-wrap">canvas</div>
                  <div class="menu-single-wrap">jquery特效</div>
                  <div class="menu-single-wrap">轮播图</div>
                  <div class="menu-single-wrap">轮播图</div>
                  <div class="menu-single-wrap">轮播图</div>
                  <div class="menu-single-wrap">轮播图</div>
                  <div class="menu-single-wrap">轮播图</div>
                  <div class="menu-single-wrap">轮播图</div>
              </div>
            </div>
            <div class="content-wrap">
                <div class="breadcrumb">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">jquery特效</el-breadcrumb-item>
                        <el-breadcrumb-item>超炫稻草人{{articleData}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="article-wrap">
                    <div class="aricle-left-wrap">
                        <el-button><a >预览</a></el-button>
                        <el-button><a href="/public/uploads/html5mock.zip">下载</a></el-button>
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
    title:'博主码',
    atc_id: '',
    articleDetail:[],
    hrefFileUrl:'1234',
    fileeee:'1234'
  }
},
computed: {
    articleData() {
        return 1;
    }
  },
methods: {
    getArticleDetailById(){
        // 获取文章id
        let currtIdArr = location.search.replace('?','');
        this.atc_id = currtIdArr.split('=')[1];
        request.get(`/detail/api/article/detail?id=${this.atc_id}`).then(response => {
            this.articleDetail = response.data.list[0];
            this.hrefFileUrl = this.articleDetail.atc_fileUrl.split('.')[0] + '/index.html';
            console.log('this.articleDetail',this.articleDetail);
        });
    }
},
mounted() {
    this.getArticleDetailById();
    console.log('this.$store.state.articleTotal',this.$store.state.articleTotal)
}
}
</script>
