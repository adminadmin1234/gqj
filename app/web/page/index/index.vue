<template>
    <layout :title="title" :description="description" :keywords="keywords">
      <LayoutHeader></LayoutHeader>
      <LayoutContent :articleList = "articleList.temp"></LayoutContent>
      <LayoutFooter :footerPosition="footerPosition"></LayoutFooter>
    </layout>
</template>
<style>
  @import "index.scss";
</style>
<script type="text/babel">
  import '../../asset/js/rem.js';
  import Util from '../../asset/js/util.js';
  import LayoutHeader from '../../component/layout/index/header/header';
  import LayoutFooter from '../../component/layout/index/footer/footer';
  import LayoutContent from '../../component/layout/index/content/content';
  export default {
    data() {
      return {
        title:'',
        description:'',
        keywords:'',
        footerPosition:true,
      }
    },
    components: {
      LayoutHeader,
      LayoutContent,
      LayoutFooter,
    },
    beforeMount() {
      if(Util.browserRedirect()){ // 移动端
        this.footerPosition = false;
      }
    },
  }
</script>
