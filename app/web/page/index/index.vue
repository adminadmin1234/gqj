<template>
    <layout :title="title" :description="description" :keywords="keywords">
      <LayoutHeader></LayoutHeader>
      <LayoutContent :articleList = "articleList.temp"></LayoutContent>
      <LayoutFooter></LayoutFooter>
    </layout>
</template>
<style lang="scss">
  @import '../../asset/css/mixin.scss';
  @import 'index.scss';
</style>
<script type="text/babel">
  import '../../asset/js/rem.js';
  import LayoutHeader from '../../component/layout/index/header/header';
  import LayoutFooter from '../../component/layout/index/footer/footer';
  import LayoutContent from '../../component/layout/index/content/content';
  export default {
    components: {
      LayoutHeader,
      LayoutContent,
      LayoutFooter
    },
    data: function () {
      return {
      }
    },
    computed: {
    },
    methods: {
    },
    created() {
    },
  }
</script>
