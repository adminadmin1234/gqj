'use strict';
const egg = require('egg');
module.exports = class DetailController extends egg.Controller {
  async index(ctx) {
    // 获取标签
    const labelList = await ctx.service.label.getLabelList(ctx.request.body.lb_name,1);
    // 获取文章详情
    const articleDetail = await ctx.service.article.getArticleDetail(ctx.query.id);
    // 获取右边的两个列表
    const rightList = await ctx.service.article.getArtilceRightList(ctx.query.id);
    // seo信息
    const content = this.removeHtml(articleDetail.list[0].atc_content);
    const description = '钢琴家，' + content.substr(0, 60);
    const seo = {
      title: '钢琴家-' + articleDetail.list[0].atc_title,
      keywords: '钢琴家，' + articleDetail.list[0].atc_title,
      description,
    };
    const dataRes = { labelList, articleDetail, rightList, seo };
    await this.ctx.render('detail/detail.js', { dataRes });
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
  /**
  * 去掉HTML标签
  */
  removeHtml(input) {
    return input && input.replace(/<(?:.|\n)*?>/gm, '')
      .replace(/(&rdquo;)/g, '"')
      .replace(/&ldquo;/g, '"')
      .replace(/&mdash;/g, '-')
      .replace(/&nbsp;/g, '')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/<[\w\s"':=\/]*/, '');
  }
};