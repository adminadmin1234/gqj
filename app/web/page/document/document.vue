<template>
<layout :title="dataRes.seo.title" :description="dataRes.seo.description" :keywords="dataRes.seo.keywords">
       <div class='main'>
          <LayoutHeader :activeStr="document"></LayoutHeader>
          <Document  @totalC="totalChange" :dataRes="dataRes"></Document>
          <LayoutFooter :footerPosition="footerPosition"></LayoutFooter>
       </div>
</layout>
</template>
<style scoped lang="scss">
@import '../../asset/css/mixin.scss';
@import "document.scss";
</style>
<script type="babel">
  import '../../asset/js/rem.js';
  import LayoutHeader from '../../component/layout/index/headercommon/headercommon';
  import Document from '../../component/layout/index/document/document';
  import LayoutFooter from '../../component/layout/index/footer/footer';
  import Vue from 'vue';
  export default {
    components: {
      LayoutHeader,
      LayoutFooter,
      Document
    },
    data(){
      return {
        footerPosition:true,
        document:'document',
      }
    },
    mounted() {
      this.totalChange(this.dataRes.articleList.temp.length);
    },
    methods: {
      totalChange(total) {
        if(total >= 12){
          this.footerPosition = false;
        }else{
          this.footerPosition = true;
        }
      }
    }
  }
</script>
