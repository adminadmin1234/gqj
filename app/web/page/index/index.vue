<template>
       <div class='main'>
          <LayoutHeader></LayoutHeader>
          <LayoutContent>
            <div slot='content'><slot name='main'></slot></div>
          </LayoutContent>
        </div>
</template>
<script type="text/babel">
  import LayoutHeader from '../../component/layout/index/header/header';
  import LayoutContent from '../../component/layout/index/content/content';
  import store from '../store/app';
  import router from '../router';
  export default {
    store,
    router,
    components: {
      LayoutHeader,
      LayoutContent
    },
    data: function () {
      return {
        test:1
      }
    },
    computed: {
    },
    methods: {
    },
    created() {
      console.log('store', store);
      console.log('storestorestorestore', this.$store);
    },
  }
</script>
