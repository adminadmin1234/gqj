<template>
    <div>
        <div class="menu-nav-wrap-full">
            <div class="menu-nav-wrap">
                <a class="menu-single-a menu-single-wrap" v-bind:class="{ 'menu-single-wrap-active' : index===0}" v-for="(item,index) in dataRes.labelList.list" @click="checkedActive($event)" :href="item.lb_name | targetName">
                {{item.lb_name}}
                </a>
            </div>
        </div>
        <div class="content-wrap">
            <h1 class="page-title">钢琴家-为你收藏程序员常用在线工具</h1>
            <div class="single-wrap-kuang" v-for="(labeItem,labeIndex) in dataRes.labelList.list" v-if="labeItem.toolList.length > 0">
                <div class="label-name-wrap">
                    <div class="label-name" :id="labeItem.lb_name">{{labeItem.lb_name}}</div>
                </div>
                <div>
                    <div class="single-wrap" v-for="(toolItem,toolIndex) in labeItem.toolList">
                        <a class="got-out" target="block" :href="toolItem.tl_address">
                            <img :picAddress="toolItem.tl_logo" :src="toolItem.tl_logo" class="logo lazyLoadImg" :alt="toolItem.tl_title"/>
                            <div class="right-content">
                                <div class="title">{{toolItem.tl_title}}</div>
                                <div class="desc" data-toggle="popover" title="title" data-content="Right?">{{toolItem.tl_desc}}</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div class="not-more">目前内容暂时只有这么多，我们在努力更新中...</div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import '../../../../asset/css/mixin.scss';
    @import "./tool.scss";
</style>
<script type="babel">
import $ from "jquery";
import Util from'../../../../asset/js/util.js';
import lazyLoadImages from'../../../../asset/js/lazyLoadImages.js';
import request from 'framework/network/request';
export default {
data(){
  return {
    defaultIndex:0,
    newList:[],
    reactList:[],
    labelData:[],
    atc_id: '',
    articleDetail:[],
    hrefFileUrl:'',
    labelList:[],
    menuShow:false,
    footerPosition:false,
  }
},
props:['dataRes'],
methods: {
    checkedActive(event){
        $(event.currentTarget).siblings().removeClass('menu-single-wrap-active');
        $(event.currentTarget).addClass('menu-single-wrap-active');
    }
},
filters:{
    targetName(data){
        return '#'+data;
    }
},
mounted() {
    lazyLoadImages.initConfig();
    // 百度统计代码
    var _hmt = _hmt || [];
    (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?f1114bf2679a9e797610cd8a52541da1";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
    })();
    // 自动爬虫（百度）
    (function(){
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        }
        else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();
    // 设置内容边距
    let marginTop = $('.container-fluid').height()+$('.menu-nav-wrap-full').height();
    if(Util.browserRedirect()){//移动端
        $('.content-wrap').css({
            'margin-top': marginTop + 1
        })
    }else{
        $('.content-wrap').css({
            'margin-top': marginTop + 10
        })
    }
    // a锚点
    const marginHeader = $('.container-fluid').height()+$('.menu-nav-wrap-full').height()+$('.page-title').height();
    $('.menu-single-a').click(function(){
        $('html,body').animate({scrollTop: ($($(this).attr('href')).offset().top - marginHeader )},1000);
    });
},
}
</script>
