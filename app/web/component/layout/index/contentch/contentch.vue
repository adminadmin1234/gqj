<template>
    <div>
        <div class="menu-nav-wrap-full" v-bind:class="{ 'menu-nav-wrap-full-h2' : menuShow}">
            <div class="menu-nav-wrap">
                <div class="menu-single-wrap" v-bind:class="{ 'menu-single-wrap-active' : index===0}" v-for="(item,index) in dataRes.labelList.list" @click="checkedActive($event)">
                <a class="menu-single-a" :href="item.lb_name | targetName">{{item.lb_name}}</a>
                </div>
            </div>
        </div>
        <div class="content-wrap">
            <div class="single-wrap-kuang" v-for="(labeItem,labeIndex) in dataRes.labelList.list" v-if="labeItem.docList.length > 0">
                <h2 :id="labeItem.lb_name">{{labeItem.lb_name}}</h2>
                <div>
                    <div class="single-wrap" v-for="(docItem,docIndex) in labeItem.docList">
                        <img :src="docItem.doc_logo" class="logo" :alt="docItem.doc_title"/>
                        <div class="right-content">
                            <div class="title">{{docItem.doc_title}}</div>
                            <div class="desc">{{docItem.doc_desc}}</div>
                            <div class="icon-wrap">
                                <a target="block" :href="docItem.doc_address"><img src="../../../../asset/images/home.png" class="home"/></a>
                                <a v-if="docItem.doc_github !== null" target="block" :href="docItem.doc_github"><img src="../../../../asset/images/github.png" class="github"/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    @import '../../../../asset/css/mixin.scss';
    @import "./contentch.scss";
</style>
<script type="babel">
import request from 'framework/network/request';
import Vue from 'vue';
import $ from 'jquery';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import moment from 'moment';
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
        // $(event.currentTarget).parentNode.children[1].removeClass('menu-single-wrap-active');
        // $(event.currentTarget).addClass('menu-single-wrap-active');
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
    const _this = this;
    setTimeout(function(){
        _this.onRead();
    },5000)
    if(this.dataRes.labelList.list.length > 10){
        this.menuShow = true;
    }else{
        this.menuShow =false;
    }
}
}
</script>
