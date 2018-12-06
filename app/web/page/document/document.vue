<template>
       <div class='main'>{{test}}
          <LayoutHeader></LayoutHeader>
          <div class="menu-nav-wrap-full">
              <div class="menu-nav-wrap">
                  <div class="menu-single-wrap">轮播图</div>
                  <div class="menu-single-wrap">导航栏</div>
                  <div class="menu-single-wrap">canvas</div>
                  <div class="menu-single-wrap">jquery特效</div>
                  <div class="menu-single-wrap">轮播图</div>
                  <div class="menu-single-wrap">轮播图</div>
                  <div class="menu-single-wrap">轮播图</div>
                  <div class="menu-single-wrap">轮播图</div>
                  <div class="menu-single-wrap">轮播图</div>
                  <div class="menu-single-wrap">轮播图</div>
              </div>
            </div>
            <div class="content-wrap">
              <div class="content-single">
              </div>
              <div class="content-single">
              </div>
              <div class="content-single">
              </div>
              <div class="content-single">
              </div>
              <div class="content-single">
              </div>
            </div>
       </div>
</template>
<style>

@import "document.css";
</style>
<script type="babel">
  import LayoutHeader from '../../component/layout/index/headercommon/headercommon';
  export default {
    components: {
      LayoutHeader,
    },
    data(){
      return{
        test:'laoda'
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
