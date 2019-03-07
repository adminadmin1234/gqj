'use strict';
const webpack = require('webpack');
const path = require('path');
// 过滤自己本地的文件
// Document：https://www.yuque.com/easy-team/easywebpack 和 https://www.yuque.com/easy-team/egg-vue 
module.exports = {
  // https://www.yuque.com/easy-team/easywebpack/plugin
  plugins: {
    imagemini: false,
  },
  loaders: { scss: true }, // 加载scss文件
  lib: [ 'vue' ], // 覆盖掉common.js //还需优化
  devtool: 'source-map',
  // externals: { // 打包的时候排除掉，不要让它被打包
  //   jquery: 'jquery',
  // }
};