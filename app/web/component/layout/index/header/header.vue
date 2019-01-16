<template>
<div class="container-fluid">
    <div class="logo-wrap"><img class="logo" alt="凌晨零点半logo" src="../../../../asset/images/logo.png" @click="onOffChart"></div>
    <nav class="header-wrap">
        <a class="nav-link header-nav-link nav-active" href="/home">{{$t('menu.home')}}</a>
        <a class="nav-link header-nav-link" href="/document">{{$t('menu.component')}}</a>
        <a class="nav-link header-nav-link" href="/documentch">{{$t('menu.document')}}</a>
    </nav>
</div>
</template>
<script type="babel">
import $ from 'jquery'
export default {
  components: {},
  data() {
    return {
      interval:null,
      isDown:true,
    };
  },
  computed: {},
  methods: {
    browserRedirect() {
        let sUserAgent = navigator.userAgent.toLowerCase();
        let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        let bIsMidp = sUserAgent.match(/midp/i) == "midp";
        let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        let bIsAndroid = sUserAgent.match(/android/i) == "android";
        let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            
        } else {
            //跳转pc端页面
              this.effect({
                    minSize: 8,		//雪花的最小尺寸
                    maxSize: 40, 	//雪花的最大尺寸
                    newOn: 600		//雪花出现的频率 这个数值越小雪花越多
                })
        }
    },
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
  beforeMount() {
    // 只会在浏览器执行  
    this.browserRedirect()
  },
};
</script>
<style scoped lang="scss">
@import '../../../../asset/css/mixin.scss';
@import "./header.scss";
</style>
