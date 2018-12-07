'use strict';
module.exports = app => {
  return class DetailController extends app.Controller {
    async index(ctx) {
      console.log('Detail');
      const result = 1;
      console.log('Category-index-result', result);
      await this.ctx.renderClient('detail/detail.js', { ctx, result });
    }
    // 获取文章详情
    async detail(ctx) {
      const articleDetail = await ctx.service.article.getArticleDetail(ctx.query.id);// params
      console.log('ctx.query.id获取文章详情', articleDetail);
      this.ctx.body = articleDetail;
    }
  };
};