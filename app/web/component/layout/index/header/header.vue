<template>
<div class="container-fluid">
    <div class="logo-wrap">
    <div class="logo"></div>
    </div>
    <nav class="header-wrap">
        <a class="nav-link header-nav-link nav-active" href="/home">{{$t('menu.home')}}</a>
        <a class="nav-link header-nav-link" href="/document">{{$t('menu.component')}}</a>
        <a class="nav-link header-nav-link" href="/documentch">{{$t('menu.document')}}</a>
    </nav>
</div>
</template>
<style scoped lang="scss">
@import '../../../../asset/css/mixin.scss';
@import "./header.scss";
</style>
<script type="babel">
import Util from '../../../../asset/js/util.js';
export default {
  components: {},
  data() {
    return {
      interval:null,
      isDown:true,
      logoUrl:''
    };
  },
  computed: {},
  methods: {
    effect(options){
            const chartMap = ['❄','10','01'],
                  chartColor = ['#64dbfb','#4e3099','#27a8e1','#4e0157','#d601d6'];
            let chartIndex = parseInt(Math.random()*chartMap.length);
            let colorIndex = parseInt(Math.random()*chartColor.length);
            let $flake = $('<div id="snowbox" />').css({'position': 'absolute', 'top': '-50px'}).html(chartMap[chartIndex]);
            let documentHeight 	= $(document).height(),
                documentWidth	= $(document).width(),
                defaults = {
                                    minSize		: 2,		//雪花的最小尺寸
                                    maxSize		: 10,		//雪花的最大尺寸
                                    newOn		: 10,		//雪花出现的频率
                                    flakeColor	: chartColor[colorIndex]
                                };
            let options1 = $.extend({}, defaults, options);
                this.interval = setInterval( function(){ // 定时器
            let startPositionLeft 	= Math.random() * documentWidth - 100,
                startOpacity		= 0.5 + Math.random(),
                sizeFlake			= options1.minSize + Math.random() * options1.maxSize,
                endPositionTop		= documentHeight - 40,
                endPositionLeft		= startPositionLeft - 100 + Math.random() * 500,
                durationFall		= documentHeight * 10 + Math.random() * 5000;
            $flake.clone().appendTo('body').css({
                        left: startPositionLeft,
                        opacity: startOpacity,
                        'font-size': sizeFlake,
                        color: options1.flakeColor
                    }).animate({
                        top: endPositionTop,
                        left: endPositionLeft,
                        opacity: 0.2
                    },durationFall,'linear',function(){
                        $(this).remove()
                    }
                );
        }, options1.newOn);
    },
    onOffChart(){
        if(!this.isDown){
            this.effect({
                minSize: 8,		//雪花的最小尺寸
                maxSize: 40, 	//雪花的最大尺寸
                newOn: 600		//雪花出现的频率 这个数值越小雪花越多
            });
            this.isDown = true;
        }else{
            clearInterval(this.interval);
            this.isDown = false;
        }
    }
  },
  mounted() {
  },
  created() {
    
  },
  beforeMount() { // 只会在浏览器执行  
    // if(!Util.browserRedirect()){
    //     //pc端页面
    //     this.effect({
    //         minSize: 8,		//雪花的最小尺寸
    //         maxSize: 40, 	//雪花的最大尺寸
    //         newOn: 600		//雪花出现的频率 这个数值越小雪花越多
    //     })
    // }
    // if(Util.browserRedirect()){ // 移动端
    //     $('body').css({
    //         'overflow-x': 'hidden'
    //     })
    // }
  },
};
</script>

