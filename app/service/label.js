'use strict';
const egg = require('egg');
module.exports = class LabelService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }
  // 前端
  async getLabelListForend(type) {
    // 通过name进行模糊查询
    const TABLE_NAME = 'label';
    const QUERY_STR = 'lb_id, lb_name, lb_type, lb_weight';
    const sql = `select ${QUERY_STR} from ${TABLE_NAME} where lb_type = ${type}`;
    const labelList = await this.app.mysql.query(sql);
    const string = JSON.stringify(labelList);
    const list = JSON.parse(string);
    const total = list.length;
    return {
      total,
      list
    };
  }
  // 后台 0 1 2 3
  async getLabelList(name, type = 0) {
    // 通过name进行模糊查询
    const TABLE_NAME = 'label';
    const QUERY_STR = 'lb_id, lb_name, lb_type, lb_weight';
    let sql;
    if (type === 0) {
      if (name === null || typeof name === 'undefined') {
        sql = `select ${QUERY_STR} from ${TABLE_NAME}`;
      } else {
        sql = `select ${QUERY_STR} from ${TABLE_NAME} where lb_name like "%${name}%"`;
      }
    } else {
      if (name === null || typeof name === 'undefined') {
        sql = `select ${QUERY_STR} from ${TABLE_NAME} where lb_type = ${type}`;
      } else {
        sql = `select ${QUERY_STR} from ${TABLE_NAME} where lb_type = ${type} and lb_name like "%${name}%"`;
      }
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
    const result = await this.app.mysql.insert('label', { lb_name: data.lb_name, lb_weight: data.lb_weight, lb_type: data.lb_type });
    const flag = result.affectedRows;
    return { flag };
  }
  async modifyLabel(data) {
    // 修改数据，将会根据主键 ID 查找，并更新
    const row = {
      lb_id: data.lb_id,
      lb_name: data.lb_name,
      lb_type: data.lb_type,
      lb_weight: data.lb_weight,
    };
    const options = {
      where: {
        lb_id: data.lb_id,
      }
    };
    const result = await this.app.mysql.update('label', row, options); // 更新 label 表中的记录
    const flag = result.affectedRows;
    return { flag };
  }
  async deleteLabel(data) {
    const result = await this.app.mysql.delete('label', { lb_id: data });
    const flag = result.affectedRows;
    let id = null;
    if (flag === 1) {
      id = data;
    }
    return { id };
  }
};