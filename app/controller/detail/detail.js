'use strict';
const egg = require('egg');
module.exports = class DetailController extends egg.Controller {
  async index(ctx) {
    const result = 1111111;
    console.log('result', result);
    await this.ctx.render('detail/detail.js', result);
  }
  // 获取文章详情
  async detail(ctx) {
    const articleDetail = await ctx.service.article.getArticleDetail(ctx.query.id);// params
    console.log('result', articleDetail);
    this.ctx.body = articleDetail;
  }
  // 获取右边的两个列表
  async list(ctx) {
    const articleDetail = await ctx.service.article.getArtilceRightList(ctx.query.id);// params
    this.ctx.body = articleDetail;
  }
  // 下载数加1
  async countDownload(ctx) {
    const articleDetail = await ctx.service.article.addDownloadCount(ctx.query.atcid);// params
    this.ctx.body = articleDetail;
  }
  // 预览数加1
  async countPreview(ctx) {
    const articleDetail = await ctx.service.article.addPriviewCount(ctx.query.atcid);// params
    this.ctx.body = articleDetail;
  }
  // 阅读数加1
  async countRead(ctx) {
    const articleDetail = await ctx.service.article.addReadCount(ctx.query.atcid);// params
    this.ctx.body = articleDetail;
  }
};