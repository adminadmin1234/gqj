<template>
<div class="container-fluid">
    <div class="logo-wrap"><img class="logo" src="../../../../asset/images/logo-index.svg"></div>
    <nav class="nav header-wrap">
        <a class="nav-link header-nav-link active" href="/home">{{$t('menu.home')}}</a>
        <a class="nav-link header-nav-link" href="/category">{{$t('menu.category')}}</a>
        <a class="nav-link header-nav-link" href="#">旁门</a>
        <a class="nav-link header-nav-link" href="#">收藏</a>
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
      collapsed: false
    };
  },
  computed: {},
  methods: {
    menuBtn() {
      this.collapsed = !this.collapsed;
    },
    effect1(options){
    let $flake = $('<div id="snowbox" />').css({'position': 'absolute', 'top': '-50px'}).html('&#10052;'),//,
        documentHeight 	= $(document).height(),
        documentWidth	= $(document).width(),
        defaults = {
                            minSize		: 2,		//雪花的最小尺寸
                            maxSize		: 10,		//雪花的最大尺寸
                            newOn		: 10,		//雪花出现的频率
                            flakeColor	: "#64dbfb"	
                        },
        options1	= $.extend({}, defaults, options);
    let interval		= setInterval( function(){
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
}
  },
  mounted() {
  },
  created() {
    this.effect1({ 
    minSize: 4,		//雪花的最小尺寸
    maxSize: 50, 	//雪花的最大尺寸
    newOn: 400		//雪花出现的频率 这个数值越小雪花越多
})
  },
};
</script>
