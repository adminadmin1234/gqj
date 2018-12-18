<template>
       <div class='main'>
          <LayoutHeader></LayoutHeader>
          <LayoutContent>
            <div slot='content'><slot name='main'></slot></div>
          </LayoutContent>
          <LayoutFooter></LayoutFooter>
        </div>
</template>
<style>
  .footer{
    position:fixed;
    bottom:0;
  }
</style>
<script type="text/babel">
  import LayoutHeader from '../../component/layout/index/header/header';
  import LayoutFooter from '../../component/layout/index/footer/footer';
  import LayoutContent from '../../component/layout/index/content/content';
  import store from '../store/app';
  import router from '../router';
  export default {
    store,
    router,
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
