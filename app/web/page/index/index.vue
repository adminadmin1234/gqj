<template>
       <div class='main'>{{test}}
          <LayoutHeader></LayoutHeader>
          <LayoutContent>
            <div slot='content'><slot name='main'></slot></div>
          </LayoutContent>
        </div>
</template>
<style>
  @import "index.css";
</style>
<script type="babel">
  import LayoutHeader from '../../component/layout/index/header/header';
  import LayoutContent from '../../component/layout/index/content/content';
  export default {
    components: {
      LayoutHeader,
      LayoutContent
    },
    data(){
      return {
        test:'test'
      }
    },
    computed: {
    },
    methods: {
    },
    mounted() {
    }
  }
</script>
