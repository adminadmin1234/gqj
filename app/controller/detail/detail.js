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
  };
};