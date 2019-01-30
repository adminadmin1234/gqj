<template>
  <div class="index-content-wrap">
    <slot name='content'></slot>
    <div class="content-left">
      <div class="content-up">
        <img src="../../../../asset/images/head-pic.png" class="head-pic" alt="凌晨两点半头像">
        <h1 class="site-name">祝愿每位工程师达到BAT的能力,40岁前财富自由</h1>
      </div>
      <div class="content-left-hr">&nbsp;</div>
      <ul class="content-down">
        <li>收集、分享前端组件</li>
        <li>记录、收藏文档工具</li>
        <li>学习、储备前端技术</li>
      </ul>
      <div class="content-left-hr">&nbsp;</div>
      <ul class="content-down content-down-mobile">
        <li>如本站内容侵犯了您的权益，请联系站长:18312710387</li>
      </ul>
    </div>
    <div class="content-right">
      <div class="">
        <div class="content-wrap-title">最新推荐：</div>
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
<style scoped lang="scss">
@import '../../../../asset/css/mixin.scss';
@import "./content.scss";
</style>
<script type='babel'>
import $ from "jquery";
import format from 'date-fns/format'
export default {
    name:'v-content',
    props:['articleList'],
    filters: {
      formatData(data){
        return format(parseInt(data),'YYYY-MM-DD');
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
    },
    methods: {
    }
  };
</script>
