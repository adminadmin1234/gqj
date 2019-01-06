<template>
    <footer class='footer' v-bind:class="{'footerFixed':footerPosition}">
        <span class="footer-span">香港服务器</span><span class="vertical-line">|</span>
        <span class="footer-span">广州天河</span><span class="vertical-line">|</span>
        <span class="footer-span">微信：lzhlad</span><span class="vertical-line">|</span>
        <span class="footer-span">关于我们</span>
    </footer>
</template>
<style>
  @import './footer.css';
</style>
<script type='babel'>
  export default{
    props: ['footerPosition'],
    mounted() {
      console.log('footerPosition',this.footerPosition)
    },
  };
  
</script>
