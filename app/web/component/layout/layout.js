import Vue from 'vue';
export default function createLayout(name, components, tpl) {
  return {
    name,
    props: ['title', 'description', 'keywords'],
    components,
    computed: {
      vTitle() {
        return this.$root.title || this.title || '凌晨两点半';
      },
      vKeywords() {
        return this.$root.keywords || this.keywords || '凌晨两点半，canvas，3d特效，微信小程序，活动页，官网模板';
      },
      vDescription() {
        return this.$root.description || this.description || '凌晨零点半作者是只前端猿；在空闲时间，喜欢收集前端的各种工具、插件、架构来分享';
      },
      baseClass() {
        return this.$root.baseClass;
      }
    },
    template: EASY_ENV_IS_BROWSER ? tpl : `<!DOCTYPE html>
                  <html lang="en">
                    <head>
                     <meta name="baidu-site-verification" content="zB7PIlT1gD" />
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
