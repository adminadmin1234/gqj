'usestrict';
const egg = require('egg');
module.exports = class IndexController extends egg.Controller {
  async index(ctx) {
    console.log('ctx.request.body', ctx.request.body);
    const articleList = await ctx.service.article.getArtilceList(ctx.request.body.title);
    console.log('articleList', articleList);
    // this.ctx.body = articleList;
    await this.ctx.render('index/index.js', articleList);
  }
  async client() {
    const result = this.service.article.getArtilceList();
    await this.ctx.renderClient('index/index.js', result);
  }

  async list(ctx) {
    const articleList = await ctx.service.article.getArtilceListIndex();
    this.ctx.body = articleList;
  }

  async detail() {
    const id = this.ctx.query.id;
  }
};