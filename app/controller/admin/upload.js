'use strict';

// node.js 文件操作对象
const fs = require('fs');
// 解压文件
const unzip = require('unzip');
// node.js 路径操作对象
const path = require('path');
// egg.js Controller
const Controller = require('egg').Controller;
// 故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
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
    // 文件生成绝对路径
    // 当然这里这样是不行的，因为你还要判断一下是否存在文件路径
    const target = path.join(this.config.baseDir, 'publicData/uploads', filename);
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
    if (fileNameArr[fileNameArr.length - 1] === 'zip' || fileNameArr[fileNameArr.length - 1] === 'rar') {
      // 将zip文件压缩
      await fs.createReadStream(this.config.baseDir + '/publicData/uploads/' + filename).pipe(unzip.Extract({ path: this.config.baseDir + '/publicData/uploads/' }));
    }
    // 文件响应
    ctx.body = {
      url: '/public/uploads/' + filename,
    };
  }
}

module.exports = UploadController;
