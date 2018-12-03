'use strict';
const egg = require('egg');
const Collection = require('../lib/db/collection');
const Query = require('../lib/db/query');
module.exports = class LabelService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
    this.colllection = new Collection(ctx.db, 'article');
  }
  async getLabelList(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const labelList = await this.app.mysql.select('label');
    const string = JSON.stringify(labelList);
    const list = JSON.parse(string);
    const total = list.length;
    return {
      total,
      list
    };
  }
  async setLabelList(data) {
    const result = await this.app.mysql.insert('label', { lb_name: data.lb_name });
    const flag = result.affectedRows;
    return { flag };
  }
  async deleteArticle(data) {
    console.log('deleteArticle', data);
    const result = await this.app.mysql.delete('label', { lb_id: data });
    const flag = result.affectedRows;
    console.log('deleteArticle', flag);
    let id = null;
    if (flag === 1) {
      id = data;
    }
    return { id };
  }
};