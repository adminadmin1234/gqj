<template>
  <div class="index-content-wrap">
    <slot name='content'></slot>
    <div class="content-left">
      <div class="content-up">
        <img src="../../../../asset/images/head-pic.jpg" class="head-pic" alt="凌晨两点半头像">
        <h1 class="site-name">凌晨两点半</h1>
        <hr class="content-left-hr">
      </div>
      <ul class="content-down">
        <li>收集、分享前端组件</li>
        <li>记录、收藏文档工具</li>
        <li>学习、储备前端技术</li>
      </ul>
      <hr class="content-left-hr">
      <ul class="content-down">
        <li>如本站内容侵犯了您的权益，请联系站长:18312710387</li>
      </ul>
    </div>
    <div class="content-right">
      <div class="">
        <div class="content-wrap-title">文章推荐：</div>
        <ul class="content-wrap-ul">
          <li v-for="item in articleList" >
              <img :src="item.atc_content | imgUrlFun" :alt="item.atc_title" class="content-li-picture">
              <a :href="item.atc_id | addHref" class="content-wrap-a">
                <div class="content-detail-wrap">
                  <p>{{item.atc_title}}</p>
                  <span class="content-detail-date">{{item.atc_publish_time | formatData}}</span>
                  <span class="content-detail-label" v-for="itemLabel in item.labelList">{{itemLabel}}</span>
                </div>
              </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @import 'content.css';
</style>
<script type='babel'>
import request from 'framework/network/request';
import moment from 'moment';
export default {
    name:'v-content',
    data(){
      return {
        title:'博主微信',
        // articleList: []
      }
    },
    props:['articleList'],
    filters: {
      formatData(data){
        return moment(parseInt(data)).format('YYYY-MM-DD');
      },
      addHref(data){
        return '/detail?id=' + data;
      },
      imgUrlFun(str){
        let data = '';
            str.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/, function (match, capture) {
                  data =  capture;
            });
            if(data==null || data==''){
              data = '/public/default.jpeg'
            }
        return data
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

      // this.loadData();
      // this.articleList = window.__INITIAL_STATE__.temp;
      // console.log('window.__INITIAL_STATE__',window.__INITIAL_STATE__);
      console.log('this.articleList',this.articleList);
    },
    methods: {
      loadData() {
        request.get('/index/api/article/list').then(response => {
          this.articleList = response.data.temp;
        });
      }
    }
  };
</script>



