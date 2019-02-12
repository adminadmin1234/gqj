<template>
<layout :title="dataRes.seo.title" :description="dataRes.seo.description" :keywords="dataRes.seo.keywords">
       <div class='main'>
            <LayoutHeader :activeStr="tool"></LayoutHeader>
            <Tool :dataRes="dataRes"></Tool>
            <LayoutFooter :footerPosition="footerPosition"></LayoutFooter>
       </div>
</layout>
</template>
<script type="babel">
import '../../asset/js/rem.js';
import Vue from 'vue';
import LayoutHeader from '../../component/layout/index/headercommon/headercommon';
import LayoutFooter from '../../component/layout/index/footer/footer';
import Tool from '../../component/layout/index/tool/tool';
export default {
components: {
    LayoutHeader,
    LayoutFooter,
    Tool
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
    tool:'tool',
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
