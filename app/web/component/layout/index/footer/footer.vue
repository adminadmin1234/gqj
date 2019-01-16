<template>
    <footer class='footer' v-bind:class="{'footerFixed':footerPosition}">
        <span class="footer-span">香港服务器</span><span class="vertical-line">|</span>
        <span class="footer-span">中国广州</span><span class="vertical-line">|</span>
        <span class="footer-span">微信：lzhlad</span><span class="vertical-line">|</span>
        <span class="footer-span"><a href="/home">关于我们</a></span>
    </footer>
</template>
<style>
  @import './footer.css';
</style>
<script type='babel'>
  export default{
    props: ['footerPosition'],
    mounted() {
    },
  };
</script>
