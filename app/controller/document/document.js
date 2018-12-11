'use strict';
module.exports = app => {
  return class DocumentController extends app.Controller {
    async index(ctx) {
      const result = 1;
      await this.ctx.renderClient('document/document.js', result);
    }
    async list(ctx) {
      const articleList = await ctx.service.article.getArtilceListDoc(ctx.query.id, ctx.query.index, ctx.query.pagesize);
      this.ctx.body = articleList;
    }
  };
};