'use strict';

// node.js 文件操作对象
const fs = require('fs');
// 解压文件
const compressing = require('compressing');
// node.js 路径操作对象
const path = require('path');
// egg.js Controller
const Controller = require('egg').Controller;
// 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道。
const sendToWormhole = require('stream-wormhole');

class UploadController extends Controller {
  async index() {
    console.log('UploadController');
    const ctx = this.ctx;
    // egg-multipart 已经帮我们处理文件二进制对象
    // node.js 和 php 的上传唯一的不同就是 ，php 是转移一个 临时文件
    // node.js 和 其他语言（java c#） 一样操作文件流
    const stream = await ctx.getFileStream();
    // 新建一个文件名
    const filename = stream.filename;
    const fileNameArr = filename.split('.');
    let childrenUrl = '/publicData/uploads/';
    let resUrl = '/public/uploads/';
    if (fileNameArr[fileNameArr.length - 1] === 'zip' || fileNameArr[fileNameArr.length - 1] === 'rar') {
      childrenUrl = '/publicData/uploads/';
      resUrl = '/public/uploads/';
    } else {
      childrenUrl = '/publicData/images/';
      resUrl = '/public/images/';
    }
    // 文件生成绝对路径
    // 当然这里这样是不行的，因为你还要判断一下是否存在文件路径
    const target = path.join(this.config.baseDir, childrenUrl, filename);
    // 生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
    // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
    // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      throw err;
    }
    // 将压缩包解压
    // if (fileNameArr[fileNameArr.length - 1] === 'zip' || fileNameArr[fileNameArr.length - 1] === 'rar') {
    //   // 将zip文件压缩
    //   await fs.createReadStream(this.config.baseDir + childrenUrl + filename).pipe(unzip.Extract({ path: this.config.baseDir + childrenUrl }));
    // }
    // ali牛逼
    if (fileNameArr[fileNameArr.length - 1] === 'zip') {
      compressing.zip.uncompress(this.config.baseDir + childrenUrl + filename, this.config.baseDir + childrenUrl).then(() => {
        console.log('uncompress done');
      }).catch(console.error);
    }
    // 文件响应
    ctx.body = {
      url: resUrl + filename,
    };
  }
}

module.exports = UploadController;
