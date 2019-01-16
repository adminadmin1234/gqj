<template>
<layout :title="dataRes.seo.title" :description="dataRes.seo.description" :keywords="dataRes.seo.keywords">
       <div class='main'>
            <LayoutHeader :activeStr="documentch"></LayoutHeader>
            <ContentCh :dataRes="dataRes"></ContentCh>
            <LayoutFooter :footerPosition="footerPosition"></LayoutFooter>
       </div>
</layout>
</template>
<script type="babel">
import '../../asset/js/rem.js';
import request from 'framework/network/request';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import LayoutHeader from '../../component/layout/index/headercommon/headercommon';
import LayoutFooter from '../../component/layout/index/footer/footer';
import ContentCh from '../../component/layout/index/contentch/contentch';
import moment from 'moment';
export default {
components: {
    LayoutHeader,
    LayoutFooter,
    ContentCh
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
    menuShow:false,
    documentch:'documentch',
    footerPosition:false,
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
}
}
</script>
