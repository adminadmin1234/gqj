'use strict';
const egg = require('egg');
module.exports = class ToolService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }
  // 前端
  async getTlList(json = {}) {
    // 通过name进行模糊查询
    const sql = 'select * from tool order by tl_weight desc';
    const toolList = await this.app.mysql.query(sql);
    const string = JSON.stringify(toolList);
    const list = JSON.parse(string);
    return {
      list
    };
  }
  // 后台
  async getToolList(json = {}) {
    // 通过name进行模糊查询
    let sql;
    const offset = json.pageIndex * json.pageSize - json.pageSize;
    if (json.pageSize !== undefined && json.title === undefined) {
      sql = `select SQL_CALC_FOUND_ROWS * from tool t,label l,tlAndLb tll where t.tl_id=tll.tll_tl_id and l.lb_id=tll.tll_lb_id order by t.tl_publish_time desc limit ${offset} , ${json.pageSize}`;
    } else {
      sql = `select SQL_CALC_FOUND_ROWS * from tool t,label l,tlAndLb tll where t.tl_id=tll.tll_tl_id and l.lb_id=tll.tll_lb_id order by t.tl_publish_time desc like "%${json.title}%"`;
    }
    const articleList = await this.app.mysql.query(sql);
    const totalNum = await this.app.mysql.query('select FOUND_ROWS()');
    const string = JSON.stringify(articleList);
    const list = JSON.parse(string);
    let stringTotalNum = JSON.stringify(totalNum);
    stringTotalNum = stringTotalNum.replace('FOUND_ROWS()', 'total');
    const jsonTotalNum = JSON.parse(stringTotalNum);
    const total = jsonTotalNum[0].total;
    return {
      total,
      list
    };
  }
  async setToolList(data) {
    let flag = 0;
    if (data.doc_label !== null) {
      const result1 = await this.app.mysql.insert('tool',
        {
          tl_logo: data.tl_logo,
          tl_title: data.tl_title,
          tl_desc: data.tl_desc,
          tl_address: data.tl_address,
          tl_label: data.tl_label,
          tl_publish_time: data.tl_publish_time,
          tl_weight: data.tl_weight,
        });
      flag = result1.affectedRows;
      // 标签存关联表
      if (flag === 1 && data.doc_label !== null) {
        const result2 = await this.app.mysql.insert('tlAndLb', { tll_tl_id: result1.insertId, tll_lb_id: data.tl_label });
      }
    }
    return { flag };
  }
  async deleteTool(data) {
    const result = await this.app.mysql.delete('tool', { tl_id: data });
    const flag = result.affectedRows;
    let id = null;
    if (flag === 1) {
      id = data;
    }
    return { id };
  }
  async modify(json = {}) {
    // 修改数据，将会根据主键 ID 查找，并更新
    const row = {
      tl_title: json.tl_title,
      tl_logo: json.tl_logo,
      tl_desc: json.tl_desc,
      tl_address: json.tl_address,
      tl_label: json.tl_label,
      tl_publish_time: json.tl_publish_time,
      tl_weight: json.tl_weight
    };
    const options = {
      where: {
        tl_id: json.tl_id,
      }
    };
    const result = await this.app.mysql.update('tool', row, options); // 更新 tool 表中的记录
    const flag = result.affectedRows;
    return { flag };
  }
};