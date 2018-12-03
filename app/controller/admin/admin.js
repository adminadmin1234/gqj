'use strict';
const egg = require('egg');
module.exports = class AdminController extends egg.Controller {
  async login(ctx) {
    await ctx.renderClient('admin/login/login.js', {});
  }
  async home(ctx) {
    const url = ctx.url.replace(/\/admin/, '');
    console.log('homehomehomehomehomehomehome');
    await ctx.render('admin/home/home.js', { ctx, url });
  }
  async getctx(ctx) {
    console.log('ctct234234234', ctx.csrf);
    this.ctx.body = ctx.csrf;
  }
  async list(ctx) {
    // 数据库
    const user = await ctx.service.article.find({ user_id: 1 });
    console.log('user', user);
    // ctx.body = user;
    this.ctx.body = ctx.service.article.getArtilceList(ctx.request.body);
  }
  async add(ctx) {
    this.ctx.body = ctx.csrf;
  }
  async del(ctx) {
    const { id } = ctx.params;
    ctx.body = this.service.article.deleteArticle(id);
  }
  async detail(ctx) {
    const id = ctx.query.id;
    ctx.body = {};
  }
  async labellist(ctx) {
    // 数据库
    const labelList = await ctx.service.label.getLabelList();
    console.log('labelList23124', labelList);
    this.ctx.body = labelList;
  }
  async labeladd(ctx) {
    // 数据库
    const flag = await ctx.service.label.setLabelList(ctx.request.body);
    this.ctx.body = flag;
  }
  async labeldel(ctx) {
    const { id } = ctx.params;
    console.log('labeldel', ctx);
    ctx.body = this.service.label.deleteArticle(id);
  }
};