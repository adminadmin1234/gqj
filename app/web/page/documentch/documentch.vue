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
import Vue from 'vue';
import LayoutHeader from '../../component/layout/index/headercommon/headercommon';
import LayoutFooter from '../../component/layout/index/footer/footer';
import ContentCh from '../../component/layout/index/contentch/contentch';
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
