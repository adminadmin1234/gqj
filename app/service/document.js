'use strict';
const egg = require('egg');
module.exports = class DocumentService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }
  // 前端
  async getDocList(json = {}) {
    // 通过name进行模糊查询
    const sql = 'select * from document';
    const documentList = await this.app.mysql.query(sql);
    const string = JSON.stringify(documentList);
    const list = JSON.parse(string);
    return {
      list
    };
  }
  // 后台
  async getDocumentList(json = {}) {
    // 通过name进行模糊查询
    let sql;
    console.log('getDocumentList-json', json);
    const offset = json.pageIndex * json.pageSize - json.pageSize;
    if (json.pageSize !== undefined && json.title === undefined) {
      sql = `select SQL_CALC_FOUND_ROWS * from document d,label l,docAndLb dl where d.doc_id=dl.dl_doc_id and l.lb_id=dl.dl_lb_id order by d.doc_publish_time desc limit ${offset} , ${json.pageSize}`;
    } else {
      sql = `select SQL_CALC_FOUND_ROWS * from document d,label l,docAndLb dl where d.doc_id=dl.dl_doc_id and l.lb_id=dl.dl_lb_id order by d.doc_publish_time desc like "%${json.title}%"`;
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
  async setDocumentList(data) {
    let flag = 0;
    if (data.doc_label !== null) {
      const result1 = await this.app.mysql.insert('document',
        {
          doc_logo: data.doc_logo,
          doc_title: data.doc_title,
          doc_desc: data.doc_desc,
          doc_address: data.doc_address,
          doc_github: data.doc_github,
          doc_label: data.doc_label,
          doc_publish_time: data.doc_publish_time,
          doc_weight: data.doc_weight,
        });
      flag = result1.affectedRows;
      // 标签存关联表
      if (flag === 1 && data.doc_label !== null) {
        const result2 = await this.app.mysql.insert('docAndLb', { dl_doc_id: result1.insertId, dl_lb_id: data.doc_label });
      }
    }
    return { flag };
  }
  async deleteDocument(data) {
    const result = await this.app.mysql.delete('document', { doc_id: data });
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
      doc_title: json.doc_title,
      doc_logo: json.doc_logo,
      doc_desc: json.doc_desc,
      doc_address: json.doc_address,
      doc_github: json.doc_github,
      doc_label: json.doc_label,
      doc_publish_time: json.doc_publish_time,
      doc_weight: json.doc_weight
    };
    const options = {
      where: {
        doc_id: json.doc_id,
      }
    };
    const result = await this.app.mysql.update('document', row, options); // 更新 article 表中的记录
    const flag = result.affectedRows;
    return { flag };
  }
};