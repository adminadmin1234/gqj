# jQuery-Apple-Slider
一个具备视差位移效果的jQuery轮播图插件

该轮播图效果为切换轮播图时会产生视差效果，以及文字的一个缩放效果，PC端、移动端均可使用。

**demo**：[线上地址](https://yangyunhe369.github.io/jQuery-Apple-Slider/)

**代码详解**：[博客链接](http://www.yangyunhe.me/2017/jquery-appleSlider/)

ps:由于本插件使用了大量CSS3属性，对于低版本浏览器（如ie9以下版本等不支持CSS3属性的浏览器）不兼容；演示页面（`index.html`, `mobile.html`）分别对应PC端、移动端页面效果，移动端可支持触屏滑动翻页，如需在移动端进行使用滑动切换图片功能，需引入`jquery.touchSwipe.min.js`文件。

## 下载源码

```
git clone https://github.com/yangyunhe369/jQuery-Apple-Slider.git
```
## 项目截图
![cover](images/cover.gif)

## 使用方法

``` javascript
调用轮播插件：
Html：
<div class="slide_wrapper">
  <div class="gallery_slide_wrapper">
    <a class="gallery_item" href="javascript:;">
      <div class="gallery_item_content">
        <div class="gallery_item_lockup_wrapper">
          <span>...</span>
        </div>
      </div>
      <div class="gallery_image"></div>
    </a>
    ...
  </div>
</div>
Javascript：
$(".slide_wrapper").AppleSlider({
  imgItem:'.gallery_item',          // 轮播图容器Class
  imgNum:3,                         // 轮播图数量至少为3张
  autoPlay:true                     // 是否为自动轮播
});
```

## 项目更新

2017.10.11 — v1.1：重构代码，添加页面不可见状态停止自动轮播，页面可见时启动自动轮播。

2017.12.13 — v1.2：更好的适配移动端，添加移动端触屏滑动切换效果。

2017.12.15 — v1.3：优化代码，取消页面可见时，轮播图立即执行切换效果，优化为重新播放导航按钮动画。

ps：这里通过visibilitychange事件监听浏览器标签页面状态变化，简单来说，浏览器标签页被隐藏或显示的时候会触发visibilitychange事件，并利用document.hidden属性来判断页面是否可见，具体操作实现可阅读源码查看。

## 说明

如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

## 个人简介
作者：弦云孤赫(David Yang)

职业：web前端开发工程师

爱好：网游、音乐（吉他）

## 联系方式
QQ：314786482

微信：yangyunhe_yyh

坐标：四川成都

