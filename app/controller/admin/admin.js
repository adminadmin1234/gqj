'use strict';
const egg = require('egg');
module.exports = class AdminController extends egg.Controller {
  async login(ctx) {
    await ctx.renderClient('admin/login/login.js', {});
  }
  async home(ctx) {
    const url = ctx.url.replace(/\/admin/, '');
    console.log('ctx1111111111111111111', ctx.csrf);
    await ctx.render('admin/home/home.js', { ctx, url });
  }
  async list(ctx) {
    // 数据库
    const user = await ctx.service.article.find({ user_id: 1 });
    console.log('user', user);
    // ctx.body = user;
    this.ctx.body = ctx.service.article.getArtilceList(ctx.request.body);
  }
  async add(ctx) {
    // ctx.body = this.service.article.saveArticle(ctx.request.body);
    console.log('ctx', ctx.csrf);
    ctx.body = ctx.csrf;
    console.log('ctx.body11111111111111111111111', ctx.body);
  }
  async del(ctx) {
    const { id } = ctx.params;
    ctx.body = this.service.article.deleteArticle(id);
  }
  async detail(ctx) {
    const id = ctx.query.id;
    ctx.body = {};
  }
};