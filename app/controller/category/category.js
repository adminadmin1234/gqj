'use strict';
module.exports = app => {
  return class CategoryController extends app.Controller {
    async index(ctx) {
      console.log('CategoryController');
      const result = 1;// this.service.article.getArtilceList();
      console.log('Category-index-result', result);
      await this.ctx.renderClient('category/category.js', result);
    }
  };
};