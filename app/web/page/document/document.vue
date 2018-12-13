<template>
       <div class='main'>
          <LayoutHeader></LayoutHeader>
          <div class="menu-nav-wrap-full" v-bind:class="{ 'menu-nav-wrap-full-h2' : menuShow}">
            <div class="menu-nav-wrap">
                <div class="menu-single-wrap" v-bind:class="{ 'menu-single-wrap-default' : (item.lb_id==labelId)}" @click="menuToLoad(item.lb_id,index)" v-for="(item,index) in labelList" v-on:mouseenter="menuSingleShow($event)" v-on:mouseleave="menuSingleHide($event)">
                  {{item.lb_name}}
                </div>
            </div>
          </div>
          <div class="content-wrap">
              <div class="content-single" v-for="(item,index) in articleList" v-on:mouseenter="dataMiddle($event)" v-on:mouseleave="hiddenMiddle($event)">
                <a :href="item.atc_id | addHref">
                  <img :src="item.atc_content | imgUrlFun" class="content-single-preview" alt="">
                  <div class="content-single-middle">
                    <span class="content-single-middle-span"><i class="el-icon-view">{{item.atc_preview}}</i></span>
                    <span class="content-single-middle-span"><i class="el-icon-star-on">{{item.atc_like}}</i></span>
                    <span class="content-single-middle-span"><i class="el-icon-download">{{item.atc_download}}</i></span>
                    <span class="content-single-middle-span"><i class="el-icon-date">{{item.atc_publish_time | formatData}}</i></span>
                    <span class="content-single-middle-preview"><a :href="item.atc_fileUrl | preview">预览</a></span>
                  </div>
                  <div class="content-single-footer">
                    {{item.atc_title}}
                  </div>
                </a>
              </div>
              <div class="content-pagination">
                <el-pagination
                  @current-change="changePagination"
                  :page-size="pagination.pagesize"
                  layout="total, prev, pager, next"
                  :total="pagination.total">
                </el-pagination>
              </div>
          </div>
          <LayoutFooter></LayoutFooter>
       </div>
</template>
<style>

@import "document.css";

</style>
<script type="babel">
  import LayoutHeader from '../../component/layout/index/headercommon/headercommon';
  import LayoutFooter from '../../component/layout/index/footer/footer';
  import moment from 'moment';
  import Vue from 'vue';
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  import request from 'framework/network/request';
  import $ from 'jquery';
  import store from '../store/app';
  import router from '../router';
  Vue.use(ElementUI);
  export default {
    store,
    router,
    components: {
      LayoutHeader,
      LayoutFooter
    },
    data(){
      return {
        pagination:{
          index:1,
          pagesize:9,
          total:100,
        },
        labelId:null,
        hrefFileUrl:'',
        articleList:[],
        labelList:[],
        menuShow:false,
      }
    },
    mounted() {
      console.log('this.$route.params.id',this.$route.query.id)
      this.labelId = this.$route.query.id;
      this.getLabelList();
    },
    methods: {
      changePagination(index){
        this.pagination.index = index;
        this.loadData(this.labelId);
      },
      menuToLoad(lbId,index){
        this.defaultIndex=index;
        this.labelId = lbId;
        this.loadData(lbId);
      },
      getLabelList(store){
          request.post(`/admin/api/label/list`,{},this.$store).then(response => {
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
        return moment(parseInt(data)).format('YYYY/MM/DD');
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
        return data
      }
    },
  }
</script>
