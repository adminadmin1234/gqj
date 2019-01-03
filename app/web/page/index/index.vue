<template>
    <layout :title="title" :description="description" :keywords="keywords">
      <LayoutHeader></LayoutHeader>
      <LayoutContent :articleList = "articleList.temp"></LayoutContent>
      <LayoutFooter></LayoutFooter>
    </layout>
</template>
<style>
  .footer{
    position:fixed;
    bottom:0;
  }
</style>
<script type="text/babel">
  import Vue from 'vue';
  import LayoutHeader from '../../component/layout/index/header/header';
  import LayoutFooter from '../../component/layout/index/footer/footer';
  import LayoutContent from '../../component/layout/index/content/content';
  // import store from '../store/app';
  import store from '../admin/home/store/app'
  import VueI18n from 'vue-i18n';
  import createI18n from 'framework/i18n/site';
  import router from '../router';
  Vue.use(VueI18n);
  export default {
    // store,
    // router,
    components: {
      LayoutHeader,
      LayoutContent,
      LayoutFooter
    },
    data: function () {
      return {
        title:'凌晨零点半',
        description:'凌晨零点半作者是只前端猿；在空闲时间，喜欢收集前端的各种工具、插件、架构来分享',
        keywords:'凌晨两点半，canvas，3d特效，微信小程序，活动页，官网模板，焦点图，日期钟表'
      }
    },
    computed: {
    },
    hook :{
      render(context, options) {
        const i18n = createI18n(context.state.locale);
        options.i18n = i18n;
      }
    },
    methods: {
    },
    created() {
    },
  }
</script>
