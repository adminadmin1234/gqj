'use strict';
// Document：https://www.yuque.com/easy-team/easywebpack 和 https://www.yuque.com/easy-team/egg-vue 
module.exports = {
  plugins: {
    imagemini: false,
    extract: true,
    cssExtract: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 打包公共模块
        commons: {
          chunks: 'initial', // initial表示提取入口文件的公共部分
          name: 'commons' // 提取出来的文件命名
        }
      }
    }
  }
};