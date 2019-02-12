'use strict';
// 后台接口大全
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
    const labelList = await ctx.service.label.getLabelList(ctx.request.body.lb_name, ctx.request.body.lb_type);
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
    ctx.body = this.service.label.deleteLabel(id);
  }
  // 添加文档
  async documentadd(ctx) {
    const flag = await ctx.service.document.setDocumentList(ctx.request.body);
    this.ctx.body = flag;
  }
  // 获取文档列表
  async documentlist(ctx) {
    const labelList = await ctx.service.document.getDocumentList(ctx.request.body);
    this.ctx.body = labelList;
  }
  // 删除文档
  async documentdel(ctx) {
    const { id } = ctx.params;
    ctx.body = await this.service.document.deleteDocument(id);
  }
  // 修改文档
  async documentmodify(ctx) {
    const flag = await ctx.service.document.modify(ctx.request.body);
    this.ctx.body = flag;
  }
  // 获取工具列表
  async toollist(ctx) {
    const toolList = await ctx.service.tool.getToolList(ctx.request.body);
    this.ctx.body = toolList;
  }
  // 添加工具
  async tooladd(ctx) {
    const flag = await ctx.service.tool.setToolList(ctx.request.body);
    this.ctx.body = flag;
  }
  // 删除工具
  async tooldel(ctx) {
    const { id } = ctx.params;
    ctx.body = await this.service.tool.deleteTool(id);
  }
  // 修改工具
  async toolmodify(ctx) {
    const flag = await ctx.service.tool.modify(ctx.request.body);
    this.ctx.body = flag;
  }
};