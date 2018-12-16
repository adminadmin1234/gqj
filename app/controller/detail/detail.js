'use strict';
module.exports = app => {
  return class DetailController extends app.Controller {
    async index(ctx) {
      const result = 1;
      await this.ctx.renderClient('detail/detail.js', { ctx, result });
    }
    // 获取文章详情
    async detail(ctx) {
      const articleDetail = await ctx.service.article.getArticleDetail(ctx.query.id);// params
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
};