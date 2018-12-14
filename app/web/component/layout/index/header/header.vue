<template>
<div class="container-fluid">
    <div class="logo-wrap"><img class="logo" src="../../../../asset/images/logo.png" @click="onOffChart"></div>
    <nav class="nav header-wrap">
        <a class="nav-link header-nav-link active" href="/home">{{$t('menu.home')}}</a>
        <a class="nav-link header-nav-link" href="/document">{{$t('menu.component')}}</a>
    </nav>
</div>
</template>
<script type="babel">
import "./header.css";
import $ from 'jquery';
export default {
  components: {},
  data() {
    return {
      collapsed: false,
      interval:null,
      isDown:true,
    };
  },
  computed: {},
  methods: {
    menuBtn() {
      this.collapsed = !this.collapsed;
    },
    effect(options){
            const chartMap = ['❄','❤️','🌹','💃','🔥'],
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
    this.effect({
        minSize: 8,		//雪花的最小尺寸
        maxSize: 40, 	//雪花的最大尺寸
        newOn: 600		//雪花出现的频率 这个数值越小雪花越多
    })
  },
};
</script>
<style lang="css">
    body{
          overflow: hidden
    }
</style>
