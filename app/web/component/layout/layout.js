import Vue from 'vue';
export default function createLayout(name, components, tpl) {
  return {
    name,
    props: ['title', 'description', 'keywords'],
    components,
    computed: {
      vTitle() {
        return this.$root.title || this.title || '钢琴家_前端网址导航_前端工具集合';
      },
      vKeywords() {
        return this.$root.keywords || this.keywords || '钢琴家，前端中文文档api，前端中转站，前端工具集合，大前端技能，全栈工程师知识，前端网址导航';
      },
      vDescription() {
        return this.$root.description || this.description || '做最全的前端工程师网址导航，维护实用的前端知识体系，提供实用的前端工具让开发更简单、方便、快捷，敲代码像弹钢琴一样优雅';
      },
      baseClass() {
        return this.$root.baseClass;
      }
    },
    template: EASY_ENV_IS_BROWSER ? tpl : `<!DOCTYPE html>
                  <html lang="en">
                    <head>
                      <meta name="baidu-site-verification" content="oqp2PMKVqM" />
                      <title>{{vTitle}}</title>
                      <meta charset="utf-8">
                      <meta http-equiv="X-UA-Compatible" content="IE=edge">
                      <meta name="keywords" :content="vKeywords">
                      <meta name="description" :content="vDescription">
                      <meta http-equiv="content-type" content="text/html;charset=utf-8">
                      <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
                      <!-- Add to home screen for Windows -->
                      <meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
                      <meta name="msapplication-TileColor" content="#2F3BA2">
                      <!-- Add to home screen for Safari on iOS -->
                      <meta name="apple-mobile-web-app-capable" content="yes">
                      <meta name="apple-mobile-web-app-status-bar-style" content="black">
                      <meta name="apple-mobile-web-app-title" content="Weather PWA">
                      <link rel="apple-touch-icon" href="/logo.png">
                      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                      <script>
                        var _hmt = _hmt || [];
                        (function() {
                          var hm = document.createElement('script');
                          hm.src = 'https://hm.baidu.com/hm.js?34e7e3da8b7c8ba1430d3d1aa3156363';
                          var s = document.getElementsByTagName('script')[0]; 
                          s.parentNode.insertBefore(hm, s);
                        })();
                      </script>
                    </head>
                    <body :class="baseClass">
                      ${tpl}
                    </body>
                  </html>`,
    install(vue, options) {
      //
    }
  };
}
