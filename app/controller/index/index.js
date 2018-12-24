'usestrict';
const egg = require('egg');
module.exports = class IndexController extends egg.Controller {
  async index(ctx) {
    await this.ctx.render('index/index.js', {});
  }
  async list(ctx) {
    const articleList = await ctx.service.article.getArtilceListIndex();
    this.ctx.body = articleList;
  }

  async detail() {
    const id = this.ctx.query.id;
  }
};