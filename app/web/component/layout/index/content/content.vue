<template>
  <div class="content-wrap">
    <div class="content-left">
      <div class="content-up">
        <!--<img src="../../../../asset/images/head-pic.jpg" class="head-pic" alt="">-->
        <h1 class="site-name">世界知最</h1>
        <hr class="content-left-hr">
      </div>
      <ul class="content-down">
        <li>分享web前端技术</li>
        <li>收集常用工具文档</li>
      </ul>
      <div class="content-desc">你是一只钟爱代码的猿吗！？</div>
      <div class="content-desc">你是否有那么一瞬是enjoy这个职业的！？</div>
    </div>
    <div class="content-right">
      <div class="code-wrap">
        <!--<img src="../../../../asset/images/code.png" alt="">-->
        <p>扫一扫有惊喜！</p>
      </div>
      <div class="content-wrap">
        <div>热门推荐</div>
        <ul class="content-wrap-ul">
          <li v-for="item in articleList">
            <img :src="item.atc_content | imgUrlFun" alt="" class="content-li-picture">
            <div class="content-detail-wrap">
              <p>{{item.atc_title}}</p>
              <span class="content-detail-date">{{item.atc_publish_time | formatData}}</span>
              <span class="content-detail-label" v-for="itemLabel in item.labelList">{{itemLabel}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style>
  @import 'content.css';
</style>
<script type='babel'>
import request from 'framework/network/request';
import moment from 'moment';
export default {
    name:'v-content',
    data(){
      return {
        articleList: []
      }
    },
    filters: {
      formatData(data){
          return moment(parseInt(data)).format('YYYY-MM-DD');
      },
      imgUrlFun(str){
        let data = '';
            str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
                  data =  capture;
            });
            console.log('data',data)
        return data
      }
    },
    mounted() {
      this.loadData();
    },
    methods: {
      loadData() {
        request.get('/index/api/article/list',{},this.$store).then(response => {
          this.articleList = response.data.temp;
          console.log('this.articleList',this.articleList);
        });
      }
    }
  };
</script>
