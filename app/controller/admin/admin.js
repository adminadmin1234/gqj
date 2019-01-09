'use strict';
const egg = require('egg');
module.exports = class AdminController extends egg.Controller {
  async login(ctx) {
    await ctx.renderClient('admin/login/login.js', {});
  }
  async home(ctx) {
    const url = ctx.url.replace(/\/admin/, '');
    await ctx.render('admin/home/home.js', { url });
  }
  // 获取文章列表
  async list(ctx) {
    console.log('ctx获取文章列表request', ctx.request.body);
    const articleList = await ctx.service.article.getArtilceList(ctx.request.body);
    this.ctx.body = articleList;
  }
  // 添加文章
  async add(ctx) {
    this.ctx.body = await ctx.service.article.saveArticle(ctx.request.body);
  }
  // 文章上下线
  async updateEnabled(ctx) {
    this.ctx.body = await ctx.service.article.updateEnabledArticle(ctx.request.body);
  }
  async del(ctx) {
    const { id } = ctx.params;
    ctx.body = this.service.article.deleteArticle(id);
  }
  // 获取文章详情
  async detail(ctx) {
    const articleDetail = await ctx.service.article.getArticleDetail(ctx.params.id);
    this.ctx.body = articleDetail;
  }
  // 修改文章
  async modify(ctx) {
    const flag = await ctx.service.article.modify(ctx.request.body);
    this.ctx.body = flag;
  }
  // 获取标签列表
  async labellist(ctx) {
    const labelList = await ctx.service.label.getLabelList(ctx.request.body.lb_name);
    this.ctx.body = labelList;
  }
  // 添加标签
  async labeladd(ctx) {
    const flag = await ctx.service.label.setLabelList(ctx.request.body);
    this.ctx.body = flag;
  }
  // 修改标签
  async labelmodify(ctx) {
    const flag = await ctx.service.label.modifyLabel(ctx.request.body);
    this.ctx.body = flag;
  }
  // 删除标签
  async labeldel(ctx) {
    const { id } = ctx.params;
    ctx.body = this.service.label.deleteArticle(id);
  }
};