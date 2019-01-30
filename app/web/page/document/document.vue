<template>
       <div class='main'>
          <LayoutHeader :activeStr="document"></LayoutHeader>
          <div class="menu-nav-wrap-full" v-bind:class="{ 'menu-nav-wrap-full-h2' : menuShow}">
            <div class="menu-nav-wrap">
                <div class="menu-single-wrap" v-bind:class="{ 'menu-single-wrap-default' : (item.lb_id==labelId)}" @click="menuToLoad(item.lb_id,index)" v-for="(item,index) in labelList" v-on:mouseenter="menuSingleShow($event)" v-on:mouseleave="menuSingleHide($event)">
                  {{item.lb_name}}
                </div>
            </div>
          </div>
          <div class="content-wrap">
              <div class="search-con">
                <input type="text" class="search-text" v-model="keyword">
                <div @click="search" class="search-sub">搜索</div>
              </div>
              <div class="content-single-wrap">
                <div class="content-single" v-for="(item,index) in articleList" v-on:mouseenter="dataMiddle($event)" v-on:mouseleave="hiddenMiddle($event)">
                  <a :href="item.atc_id | addHref">
                    <img :src="item.atc_content | imgUrlFun" class="content-single-preview" :alt="item.atc_title">
                    <div class="content-single-middle">
                      <span class="content-single-middle-span"><i class="el-icon-view">{{item.atc_preview}}</i></span>
                      <span class="content-single-middle-span content-single-middle-span-mobile-like"><i class="el-icon-star-on">{{item.atc_like}}</i></span>
                      <span class="content-single-middle-span"><i class="el-icon-download">{{item.atc_download}}</i></span>
                      <span class="content-single-middle-span content-single-middle-span-mobile"><i class="el-icon-date">{{item.atc_publish_time | formatData}}</i></span>
                      <a class="content-single-middle-a" v-if="item.atc_fileUrl != null" target="blanck" :href="item.atc_fileUrl | preview"><span @click="onPreview(item.atc_id)" class="content-single-middle-preview">预览</span></a>
                    </div>
                    <div class="content-single-footer">
                      {{item.atc_title}}
                    </div>
                  </a>
                </div>
              </div>
              <div class="not-content-wrap" v-if="pagination.total==0">
                <img class="not-content-img" src="../../asset/images/logo.png" alt="">
                <h2>暂无内容</h2>
              </div>
              <div class="content-pagination" v-if="pagination.total>0">
                <el-pagination
                  @current-change="changePagination"
                  :page-size="pagination.pagesize"
                  layout="total, prev, pager, next"
                  :total="pagination.total">
                </el-pagination>
              </div>
          </div>
          <LayoutFooter :footerPosition="footerPosition"></LayoutFooter>
       </div>
</template>
<style scoped lang="scss">
@import '../../asset/css/mixin.scss';
@import "document.scss";
@import "~element-ui/lib/theme-chalk/index.css";
</style>
<script type="babel">
  import '../../asset/js/rem.js';
  import LayoutHeader from '../../component/layout/index/headercommon/headercommon';
  import LayoutFooter from '../../component/layout/index/footer/footer';
  import format from 'date-fns/format'
  import Vue from 'vue';
  import request from 'framework/network/request';
  import $ from 'jquery';
  import store from '../store/app';
  import router from '../router';
  import { Pagination } from 'element-ui'
  Vue.component(Pagination.name, Pagination);
  export default {
    store,
    router,
    components: {
      LayoutHeader,
      LayoutFooter,
      'remoteJquery': {
      render(createElement) {
          return createElement(
            'script',
            {
              attrs: {
                type: 'text/javascript',
                src: 'https://code.jquery.com/jquery-3.3.1.min.js',
              },
            },
          );
        },
      },
      'remoteElementUI': {
      render(createElement) {
          return createElement(
            'script',
            {
              attrs: {
                type: 'text/javascript',
                src: 'https://cdn.bootcss.com/element-ui/2.4.11/index.js',
              },
            },
          );
        },
      },
    },
    data(){
      return {
        pagination:{
          index:1,
          pagesize:12,
          total:0,
        },
        labelId:null,
        hrefFileUrl:'',
        articleList:[],
        labelList:[],
        menuShow:false,
        keyword:null,
        footerPosition:true,
        document:'document',
      }
    },
    watch:{
    },
    mounted() {
      const _this = this;
      this.labelId = this.$route.query.id;
      this.getLabelList();
      document.onkeydown = function (e) { // 回车提交表单
      // 兼容FF和IE和Opera
          var theEvent = window.event || e;
          var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
          if (code == 13) {
              _this.search();
          }
      }
    },
    methods: {
      changePagination(index){
        this.pagination.index = index;
        this.loadData(this.labelId);
      },
      onPreview(atcid){
          request.get(`/detail/api/article/countPreview?atcid=${atcid}`).then(response => {
          });
      },
      menuToLoad(lbId,index){
        this.defaultIndex=index;
        this.labelId = lbId;
        this.loadData(lbId);
      },
      search(){
        request.get(`/document/api/article/search?keyword=${this.keyword}`).then(response => {
          this.articleList = response.data.temp;
          if(this.articleList.length >= 12){
            this.footerPosition = false;
            }else{
              this.footerPosition = true;
            }
          this.pagination.total = response.data.total;
        });
      },
      getLabelList(store){
          request.post(`/admin/api/label/list`,{lb_type:1},this.$store).then(response => {
              this.labelList = response.data.list;
              if(this.labelId != null){
                this.loadData(this.labelId);
              } else {
                this.labelId = this.labelList[0].lb_id;
                this.loadData(this.labelId);
              }
              if(this.labelList.length > 10){
                  this.menuShow = true;
              }else{
                  this.menuShow =false;
              }
          });
      },
      loadData(lbId) {
        request.get(`/document/api/article/list?id=${lbId}&index=${this.pagination.index}&pagesize=${this.pagination.pagesize}`).then(response => {
          this.articleList = response.data.temp;
          this.pagination.total = response.data.total;
        });
      },
      menuSingleShow(event){
        $(event.currentTarget).addClass('menu-single-wrap-active');
      },
      menuSingleHide(event){
        $(event.currentTarget).removeClass('menu-single-wrap-active');
      },
      dataMiddle(event){
        $(event.currentTarget).find('.content-single-middle').fadeIn("slow");
      },
      hiddenMiddle(event){
        $(event.currentTarget).find('.content-single-middle').fadeOut("slow");
      },
    },
    filters: {
      formatData(data){
        return format(parseInt(data),'YYYY-MM-DD');
      },
      addHref(data){
        return '/detail?id=' + data;
      },
      preview(data){
        if(data){
          return data.split('.')[0] + '/index.html';
        }
      },
      imgUrlFun(str){
        let data = '';
            str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
                  data =  capture;
            });
            if(data==null || data==''){
              data = '/public/img/default.jpeg'
            }
        return data
      }
    },
  }
</script>
