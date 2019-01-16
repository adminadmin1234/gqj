<template>
<div class="container-fluid">
    <div class="logo-wrap"><img alt="凌晨两点半logo" class="logo" src="../../../../asset/images/logo.png"></div>
    <nav class="nav header-wrap">
        <a class="nav-link header-nav-link" href="/home">{{$t('menu.home')}}</a>
        <a class="nav-link header-nav-link" v-bind:class="{'nav-active':activeStr === 'document'}" href="/document">{{$t('menu.component')}}</a>
        <a class="nav-link header-nav-link" v-bind:class="{'nav-active':activeStr === 'documentch'}" href="/documentch">{{$t('menu.document')}}</a>
    </nav>
</div>
</template>
<style scoped lang="scss">
@import '../../../../asset/css/mixin.scss';
@import "./headercommon.scss";
</style>
<script type='babel'>
  export default{
    props: ['activeStr'],
    mounted() {
        console.log(this.activeStr,'activeStr')
    },
  };
</script>