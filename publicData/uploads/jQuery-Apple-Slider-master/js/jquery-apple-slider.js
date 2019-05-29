/* by：弦云孤赫——David Yang
** https://github.com/yangyunhe369/jQuery-Apple-Slider
**
** 仿苹果轮播图插件——jquery-apple-slider.js
** 插件支持图片数量为至少为三张的情况，且可以无限轮播
** 版本：v1.3
** 更新日期：2017-12-15
*/
+function($) {
  $.fn.AppleSlider = function (options) {
    var _options = $.extend({
        imgItem: '.gallery_item',                 // 轮播列表框
        imgNum: 3,                                // 轮播图数量
        autoPlay: true,                           // 是否自动轮播
        autoTime: 5000                            // 自动轮播时间间隔
    }, options);
    // 定义轮播图实例对象
    var Slider = {
      win_w: $(window).width(),                   // 轮播容器宽度值
      slide_state: 0,                             // 轮播状态值(为1时不能执行滚动动画)
      _this: $(this),                             // 当前对象
      _imgNum: _options.imgNum,                   // 轮播图数量
      _imgItem: _options.imgItem,                 // 轮播容器class名称
      _index: 0,                                  // 当前显示轮播图绝对序号
      _autoPlay: _options.autoPlay,               // 是否自动轮播
      _autoTime: _options.autoTime,               // 自动轮播时间间隔
      sildeTimer: null,                           // 自动轮播定时器
      stateTimer: null,                           // 状态值改变定时器
      init: function () {                         // 初始化轮播图方法
        var self = this,                                  // 轮播图实例对象
            listDom = self._this.find(self._imgItem);     // 轮播图容器dom集合
        // 给所有轮播图添加对应idx值
        for(var i = 0;i < listDom.length;i++){
          listDom.eq(i).attr('data-idx',i);
        }
        // 初始化轮播图定位
        for(var i = 0;i < self._imgNum;i++){
          self._this.find(self._imgItem + '[data-idx='+ i +']').css({'transform':'translate3d('+ self.win_w * i +'px,0,0)','transition':'all 0s ease-in-out'});
          if (i == this._imgNum - 1) {
            self._this.find(self._imgItem + '[data-idx='+ i +']').css({'transform':'translate3d(-'+ self.win_w +'px,0,0)','transition':'all 0s ease-in-out'});
          }
        }
        // 初始化轮播导航按钮
        var li_html = '',               // 导航按钮单个按钮html
            ul_html = '',               // 导航按钮容器html
            btn_html = '';              // 左右翻页按钮html
        // 生成导航按钮html结构
        for(var i = 0;i < self._imgNum;i++){
          if (self._autoPlay && i == 0) { // 当自动轮播时
            li_html = '<li data-target="'+i+'" class="nav_slide nav_slide_'+i+' active autoplay"><div class="slide_btn"></div></li>';
          } else if (i == 0) {
            li_html = '<li data-target="'+i+'" class="nav_slide nav_slide_'+i+' active"><div class="slide_btn"></div></li>';
          } else {
            li_html += '<li data-target="'+i+'" class="nav_slide nav_slide_'+i+'"><div class="slide_btn"></div></li>';
          }
        }
        ul_html = '<ul class="nav">' + li_html +'</ul>';
        self._this.append(ul_html);
        // 判断浏览设备是否添加触屏滑动效果
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) { // 当为移动设备时
          // 监听触屏滑动事件
          self._this.swipe({
            swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
              // 清除自动轮播定时器
              self.cleanAutoMove();
              if(direction == "left"){ // 向左滑动时
                if(self.slide_state == 0){
                  self.moveTo("right",1);
                }
              }else if(direction == "right"){ // 向右滑动时
                if(self.slide_state == 0){
                  self.moveTo("left",1);
                }
              } 
            }
          });
        } else { // 当为PC端时
          btn_html = '<div class="nav_btn left"><div class="btn_left"></div></div><div class="nav_btn right"><div class="btn_right"></div></div>';
          self._this.append(btn_html);
          // 向右滚动按钮事件
          self._this.find('.nav_btn.right').on('click',function () {
            // 清除自动轮播定时器
            self.cleanAutoMove();
            if (self.slide_state == 0) {
              self.moveTo("right",1);
            }
          })
          // 向左滚动按钮事件
          self._this.find('.nav_btn.left').on('click',function () {
            // 清除自动轮播定时器
            self.cleanAutoMove();
            if (self.slide_state == 0) {
              self.moveTo("left",1);
            }
          })
        }
        // 点击导航按钮事件
        self._this.find('.nav li').on('click',function () {
          // 清除自动轮播定时器
          self.cleanAutoMove();
          if(self.slide_state == 1){
            return;
          }
          var idx = self.changeIndex(self._index),    // 当前轮播图的相对序号
              li_idx = $(this).index();               // 点击的按钮序号
          // 给当前按钮添加class
          $(this).addClass('active').siblings().removeClass('active');
          // 判断当前轮播图移动方向，以及移动次数
          if (li_idx > idx) {  // 向右移动
            self.moveTo("right",li_idx - idx);
          } else if (li_idx < idx){ // 向左移动
            self.moveTo("left",idx - li_idx);
          } else if (li_idx == idx){
            return;
          }
          // 清除定时器
          clearTimeout(self.stateTimer);
          self.stateTimer = setTimeout(function(){
            self.slide_state = 0;
          },700);
        })
        // 当为自动轮播时
        if (self._autoPlay) {
          // 开启自动轮播
          self.autoMove();
          // 页面可见与不可见时相关处理事件
          self.setPageVisibilityFn();
        }
      },
      moveTo: function (direction,moveTimes) { // 移动事件
        var self = this;
        // 改变轮播状态，避免移动过程中连续执行动画
        self.slide_state = 1;
        // 根据传入参数，设置当前轮播图序号值
        if (direction == "left") { // 向左滚动
          self._index -= moveTimes;
        } else if (direction == "right") { // 向右滚动
          self._index += moveTimes;
        }
        // 初始化变量
        var i = self._index ,                          // 当前轮播图的绝对序号
            idx = self.changeIndex(self._index),       // 当前轮播图的相对序号
            warp_w = - self.win_w * i,                 // 最外层容器移动距离
            st_arr = [],                               // 轮播图系数数组
            idxW_arr = [];                             // 轮播图移动距离数组
        // 设置轮播图系数，轮播图移动距离
        for(var k = 0;k < self._imgNum;k++){
          if (k == 0) { // 第一张轮博图
            st_arr[k] = Math.floor((i + 1) / self._imgNum);                        // 轮播图系数
            idxW_arr[k] = self.win_w * self._imgNum * st_arr[k];                   // 轮播图移动距离
          } else if (k == self._imgNum - 1) { // 最后一张轮播图
            st_arr[k] = Math.floor((i - 1) / self._imgNum) + 1;                    // 轮播图系数
            idxW_arr[k] = - self.win_w + st_arr[k] * self._imgNum * self.win_w;    // 轮播图移动距离
          } else {
            st_arr[k] = Math.floor(i / self._imgNum); // 轮播图系数
            idxW_arr[k] = self.win_w * k + st_arr[k] * self._imgNum * self.win_w;  // 轮播图移动距离
          }
        }
        // 控制轮播图移动事件
        self._this.find('.gallery_slide_wrapper').css({'transform':'translate3d('+ warp_w +'px,0,0)','transition':'all .7s ease-in-out'});
        for(var k = 0;k < self._imgNum;k++){
          self._this.find(self._imgItem+'[data-idx="'+k+'"]').css({'transform':'translate3d('+ idxW_arr[k] +'px,0,0)','transition':'all .7s ease-in-out'});
        }
        // 控制图层在未显示时无延时移动
        if (idx == 0 && direction == "right" && moveTimes == 1 || 
           idx == self._imgNum - 1 && direction == "left" && moveTimes == 1) { // self._imgNum - 1 <=> 0 
          for(var k = 0;k < self._imgNum;k++){
            if (k != 0 && k != self._imgNum - 1) {
              self._this.find(self._imgItem+'[data-idx="'+ k +'"]').css({'transition':'all 0s ease-in-out'});
            }
          }
        } else if (idx == 0 && direction == "left" && moveTimes == 1 ||
           idx == 1 && direction == "right" && moveTimes == 1) { // 0 <=> 1 
          self._this.find(self._imgItem+'[data-idx="'+ (self._imgNum - 1) +'"]').css({'transition':'all 0s ease-in-out'});
        } else if (idx == self._imgNum - 2 && direction == "left" && moveTimes == 1 ||
           idx == self._imgNum - 1 && direction == "right" && moveTimes == 1) { // self._imgNum - 2 <=> self._imgNum - 1 
          self._this.find(self._imgItem+'[data-idx="0"]').css({'transition':'all 0s ease-in-out .7s'}).addClass('zIndex').siblings().removeClass('zIndex');
        } else if (idx == 0 && direction == "left" && moveTimes > 1 && moveTimes < self._imgNum - 1 ||
           idx != 0 && idx != self._imgNum - 1 && direction == "right" && moveTimes > 1 && moveTimes < self._imgNum - 1) { // 0 <=> self._imgNum - n 
          self._this.find(self._imgItem+'[data-idx="'+ (self._imgNum - 1) +'"]').css({'transition':'all 0s ease-in-out .7s'}).addClass('zIndex').siblings().removeClass('zIndex');     
        } else if (idx == self._imgNum - 1 && direction == "right" && moveTimes > 1 && moveTimes < self._imgNum - 1 ||
           idx != 0 && idx != self._imgNum - 1 && direction == "left" && moveTimes > 1 && moveTimes < self._imgNum - 1) { // self._imgNum - n <=> 4        
          self._this.find(self._imgItem+'[data-idx="0"]').css({'transition':'all 0s ease-in-out .7s'}).addClass('zIndex').siblings().removeClass('zIndex');     
        } else if (idx == self._imgNum - 1 && direction == "right" && moveTimes == self._imgNum - 1) { // self._imgNum - 1 <=> 0         
          self._this.find(self._imgItem+'[data-idx="'+ (self._imgNum - 1) +'"]').css({'transition':'all 0s ease-in-out'});
          self._this.find(self._imgItem+'[data-idx="0"]').css({'transition':'all 0s ease-in-out .7s'}).addClass('zIndex').siblings().removeClass('zIndex');     
        } else if (idx == 0 && direction == "left" && moveTimes == self._imgNum - 1) { // 0 <=> self._imgNum - 1        
          self._this.find(self._imgItem+'[data-idx="0"]').css({'transition':'all 0s ease-in-out'});
          self._this.find(self._imgItem+'[data-idx="'+ (self._imgNum - 1) +'"]').css({'transition':'all 0s ease-in-out .7s'}).addClass('zIndex').siblings().removeClass('zIndex');
        }     
        // 控制背景文字移动、控制背景图片移动
        self._this.find(self._imgItem+'[data-idx="'+ idx +'"]').find('.gallery_item_content').css({transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)',transition: 'all .7s ease-in-out'});
        self._this.find(self._imgItem+'[data-idx="'+ idx +'"]').find('.gallery_image').css({transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)',transition: 'all .7s ease-in-out'});
        if (idx == self._imgNum - 1) {
          for(var k = 0;k < self._imgNum;k++){
            if (k > 1) {
              self._this.find(self._imgItem+'[data-idx="'+ (idx - k) +'"]').find('.gallery_item_content').css({transform: 'translate3d('+ self.win_w * .2 +'px, 0px, 0px) scale3d(1, 1, 1)',transition: 'all .7s ease-in-out'});
              self._this.find(self._imgItem+'[data-idx="'+ (idx - k) +'"]').find('.gallery_image').css({transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)',transition: 'all .7s ease-in-out'});
            }
          }
        } else {
          for(var k = 0;k < self._imgNum;k++){
            if (k < self._imgNum - 1 && k > 0) {
              self._this.find(self._imgItem+'[data-idx="'+ (idx + k) +'"]').find('.gallery_item_content').css({transform: 'translate3d('+ self.win_w * .2 +'px, 0px, 0px) scale3d(1, 1, 1)',transition: 'all .7s ease-in-out'});
              self._this.find(self._imgItem+'[data-idx="'+ (idx + k) +'"]').find('.gallery_image').css({transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)',transition: 'all .7s ease-in-out'});
            }
          }     
        }
        if (idx > 0) {
          self._this.find(self._imgItem+'[data-idx="'+ (idx - 1) +'"]').find('.gallery_item_content').css({transform: 'translate3d('+ self.win_w * .95 +'px, 0px, 0px) scale3d(.9, .9, 1)',transition: 'all .7s ease-in-out'});
          self._this.find(self._imgItem+'[data-idx="'+ (idx - 1) +'"]').find('.gallery_image').css({transform: 'translate3d('+ self.win_w * .9 +'px, 0px, 0px) scale3d(.9, .9, 1)',transition: 'all .7s ease-in-out'});      
        } else {
          self._this.find(self._imgItem+'[data-idx="'+ (idx + self._imgNum - 1) +'"]').find('.gallery_item_content').css({transform: 'translate3d('+ self.win_w * .95 +'px, 0px, 0px) scale3d(.9, .9, 1)',transition: 'all .7s ease-in-out'});
          self._this.find(self._imgItem+'[data-idx="'+ (idx + self._imgNum - 1) +'"]').find('.gallery_image').css({transform: 'translate3d('+ self.win_w * .9 +'px, 0px, 0px) scale3d(.9, .9, 1)',transition: 'all .7s ease-in-out'});      
        }
        // 连续滚动时背景图片文字移动逻辑
        if (direction == "right" && moveTimes > 1 && moveTimes < self._imgNum - 1 || 
           direction == "left" && moveTimes > 1 && moveTimes < self._imgNum - 1) {
          self._this.find(self._imgItem).find('.gallery_item_content').css({transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)',transition: 'all 0s ease-in-out'});
          self._this.find(self._imgItem).find('.gallery_image').css({transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)',transition: 'all 0s ease-in-out'});
          if (idx > 0) {
            self._this.find(self._imgItem+'[data-idx="'+ (idx - 1) +'"]').find('.gallery_item_content').css({transform: 'translate3d('+ self.win_w * .95 +'px, 0px, 0px) scale3d(.9, .9, 1)',transition: 'all 0s ease-in-out .7s'});
          } else {
            self._this.find(self._imgItem+'[data-idx="'+ (idx + self._imgNum - 1) +'"]').find('.gallery_image').css({transform: 'translate3d('+ self.win_w * .9 +'px, 0px, 0px) scale3d(.9, .9, 1)',transition: 'all 0s ease-in-out .7s'});
          }
        }
        // 控制导航按钮移动
        self._this.find('.nav li').eq(idx).addClass('active').siblings().removeClass('active');
        // 当自动轮播时导航按钮动画效果
        if (self._autoPlay) {
          self._this.find('.nav li').eq(idx).addClass('autoplay').siblings().removeClass('autoplay');
        }
        // 控制滚动状态
        clearTimeout(self.stateTimer);
        self.stateTimer = setTimeout(function () {
          self.slide_state = 0;
        },700);
      },
      setPageVisibilityFn: function () { // 页面可见与不可见时相关处理事件
        // 判断当前页面是否可见，不可见时清除自动轮播定时器，可见时添加
        var self = this,
            hiddenProperty = 'hidden' in document ? 'hidden' :    
            'webkitHidden' in document ? 'webkitHidden' :    
            'mozHidden' in document ? 'mozHidden' :    
            null;
        var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
        // 监听页面是否可见事件
        document.addEventListener(visibilityChangeEvent, function () {
          // 当前轮播图的相对序号
          var idx = self.changeIndex(self._index);
          if (!document[hiddenProperty]) {  // 可见状态
            setTimeout(function() {
              // 开启自动轮播
              self.autoMove();
              // 重置导航按钮动画
              self._this.find('.nav_slide').eq(idx).addClass('autoplay');
            }, 200)
          } else { // 不可见状态
            // 清除自动轮播定时器
            self.cleanAutoMove();
            self._this.find('.nav_slide').eq(idx).removeClass('active');
          }
        });
      },
      changeIndex: function (i) { // 将绝对序号变为相对序号
        var self = this,
            i = i % self._imgNum;
        if (i < 0) {
          i = self._imgNum + i;
        } else if (i == 0) {
          i = 0;
        }
        return i;
      },
      autoMove: function () { // 自动轮播事件
        var self = this;
        self._autoPlay = true;
        // 判断是否重新执行导航按钮动画事件
        self.sildeTimer = setInterval(function () {
          self.moveTo("right",1);
        },_options.autoTime);
      },
      cleanAutoMove: function () { // 清除自动轮播定时器
        var self = this;
        if (self._autoPlay == false) return false;
        self._autoPlay = false;
        self._this.find('.nav li').removeClass('autoplay');
        clearInterval(self.sildeTimer);
      }
    }
    // 初始化轮播图
    Slider.init();
  };
}(jQuery)