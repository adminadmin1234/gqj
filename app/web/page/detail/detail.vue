<template>
<layout :title="dataRes.seo.title" :description="dataRes.seo.description" :keywords="dataRes.seo.keywords">
       <div class='main'>
            <LayoutHeader :activeStr="document"></LayoutHeader>
            <DetailContent :dataRes="dataRes"></DetailContent>
            <LayoutFooter :footerPosition="footerPosition"></LayoutFooter>
       </div>
</layout>
</template>
<script type="babel">
import '../../asset/js/rem.js';
import LayoutHeader from '../../component/layout/index/headercommon/headercommon';
import LayoutFooter from '../../component/layout/index/footer/footer';
import DetailContent from '../../component/layout/index/detailContent/detailContent';
export default {
components: {
    LayoutHeader,
    LayoutFooter,
    DetailContent
},
data(){
  return {
    footerPosition:false,
    document:'document',
  }
},
}
</script>
