if(EASY_ENV_IS_BROWSER){ // 只在浏览器环境下渲染，避免在node中缺少某些浏览器对象而报错！
    (function(){
        let designW = 1920;  //设计稿宽
        let font_rate = 100;
        //适配
        document.getElementsByTagName("html")[0].style.fontSize = document.body.offsetWidth / designW * font_rate + "px";
        document.getElementsByTagName("body")[0].style.fontSize = document.body.offsetWidth / designW * font_rate + "px";
        
        //监测窗口大小变化
        window.addEventListener("resize", function() {
            document.getElementsByTagName("html")[0].style.fontSize = document.body.offsetWidth / designW * font_rate + "px";
            document.getElementsByTagName("body")[0].style.fontSize = document.body.offsetWidth / designW * font_rate + "px";
        }, false);
    })();
}