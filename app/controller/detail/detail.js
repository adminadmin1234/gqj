'use strict';
module.exports = app => {
  return class DetailController extends app.Controller {
    async index(ctx) {
      console.log('Detail');
      const result = 1;
      console.log('Category-index-result', result);
      await this.ctx.render('detail/detail.js', result);
    }
    // 获取文章详情
    async detail(ctx) {
      console.log('ctx.query.id获取文章详情', ctx.query.id);
      const articleDetail = await ctx.service.article.getArticleDetail(ctx.query.id);
      this.ctx.body = articleDetail;
    }
  };
};