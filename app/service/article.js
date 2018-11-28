'use strict';
const egg = require('egg');
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');
module.exports = class ArticeService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
    this.colllection = new Collection(ctx.db, 'article');
  }
  getArtilceList(json = {}) {
    const { title, categoryId, status, pageIndex, pageSize } = json;
    const query = new Query();
    query.where.categoryId = categoryId;
    query.where.status = status;
    query.like.title = title;
    query.pageIndex = pageIndex;
    query.pageSize = pageSize;
    console.log('service-getArtilceList');
    return this.colllection.getPager(query);
  }
  saveArticle(json) {
    console.log('saveArticle-json', json);
    if (json.id) {
      return this.colllection.update({ id: json.id }, json);
    }
    json.id = this.ctx.db.getUniqueId();
    this.colllection.add(json);
    return json.id;
  }
  deleteArticle(id) {
    return this.colllection.delete({ id });
  }
  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get('user', { user_id: 1 });
    return { user };
  }
};