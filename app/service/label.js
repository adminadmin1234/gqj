'use strict';
const egg = require('egg');
module.exports = class LabelService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }
  async getLabelList(name) {
    // 通过name进行模糊查询
    const TABLE_NAME = 'label';
    const QUERY_STR = 'lb_id, lb_name, lb_type';
    let sql;
    if (name === null || name === undefined) {
      sql = `select ${QUERY_STR} from ${TABLE_NAME}`;
    } else {
      sql = `select ${QUERY_STR} from ${TABLE_NAME} where lb_name like "%${name}%"`;
    }
    const labelList = await this.app.mysql.query(sql);
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
    const result = await this.app.mysql.delete('label', { lb_id: data });
    const flag = result.affectedRows;
    let id = null;
    if (flag === 1) {
      id = data;
    }
    return { id };
  }
};