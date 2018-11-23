'use strict';
module.exports = app => {
  return class CategoryController extends app.Controller {
    async index(ctx) {
      const result = this.service.article.getArtilceList();
      console.log('Category-index-result', result);
      await this.ctx.render('category/category.js', result);
    }
  };
};