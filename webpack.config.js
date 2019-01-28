'use strict';
// Document：https://www.yuque.com/easy-team/easywebpack 和 https://www.yuque.com/easy-team/egg-vue 
module.exports = {
  plugins: {
    imagemini: false,
    cssExtract: false
  },
  loaders: { scss: true },
  lib: [ 'vue' ]// 覆盖掉common.js //还需优化
};