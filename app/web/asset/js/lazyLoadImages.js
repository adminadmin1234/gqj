/* 
* @example
* <img src="" class="lazyLoadImg" picAddress="">
* @param src里面写的是占位图或者说兜底图地址（一张默认填充图）
* @param class="lazyLoadImg" 是必须的标识
* @param picAddress里面写的是真正需要懒加载的图片地址
*/
import $ from "jquery";
export default  {
    initConfig() {
      const self = this;
      self.srcFlag = 'picAddress'; // 图片地址
      self.class = 'lazyLoadImg'; // 惰性加载的图片需要添加的class
      self.sensitivity = 40; // 鼠标滚动敏感度，该值越小，惰性越强（加载越少）
      self.init();
    },
    trigger() {
      const self = this;
      const eventType = (self.isPhone && 'touchend') || 'scroll';
      self.imgListData = $('img.' + self.class + '');
      $(window).trigger(eventType);
    },
    init() {
      var self = this;
      $(window).on('scroll', function() {
        self.isLoadImg();
      });
      self.trigger();
    },
    isLoadImg() {
      const self = this;
      function loadNeedImg(img) { // 判断哪些img元素需要加载
        const windowPageYOffset = window.pageYOffset; // 滚动条距离窗口顶部的偏移量
        const offsetAddInner = window.pageYOffset + window.innerHeight; // window.innerHeight返回窗口的文档显示区的高度
        const imgOffsetTop = img.offset().top; // 当前img元素距离窗口顶部的偏移量
        return (
          imgOffsetTop >= windowPageYOffset && // 确保img元素在窗口内
          imgOffsetTop - self.sensitivity <= offsetAddInner //当前img元素是不是在窗口可见范围内，不可见返回:false
        );
      }
      function loadImg(img, index) {
        const domain = window.location.host;
        const imgUrl = 'http://' + domain + img.attr(self.srcFlag);
        const imgLazy = img.attr('src');
        img.attr('src', imgUrl);
        img[0].onload ||  // 开始向服务器请求加载图片
          ((img[0].onload = function() {
            $(this)
              .removeClass(self.class)
              .removeAttr(self.srcFlag),
            (self.imgListData[index] = null),
            (this.onerror = this.onload = null);
          }),
            (img[0].onerror = function() {
              (this.src = imgLazy),
              $(this)
                .removeClass(self.class)
                .removeAttr(self.srcFlag),
              (self.imgListData[index] = null),
              (this.onerror = this.onload = null);
            }));
      }
      self.imgListData.each(function(index, val) {
        if (!val) return;
        const img = $(val);
        if (!loadNeedImg(img)) return;
        const aa = img.attr(self.srcFlag);
        if (!img.attr(self.srcFlag)) return;// 判断是否有规定的picAddress属性，没有则退出当次循环
        loadImg(img, index);
      });
    }
}
/*<img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4259389730,3152819071&fm=26&gp=0.jpg" class="game-detail-logo lazyLoadImg" picAddress="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2390937513,1169699994&fm=27&gp=0.jpg">*/

