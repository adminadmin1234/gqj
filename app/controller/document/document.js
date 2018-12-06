'use strict';
module.exports = app => {
  return class DocumentController extends app.Controller {
    async index(ctx) {
      console.log('document');
      const result = 1;
      console.log('Category-index-result', result);
      await this.ctx.renderClient('document/document.js', result);
    }
  };
};