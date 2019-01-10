'use strict';
const egg = require('egg');
module.exports = class DocumentService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }
  async getDocumentList(name) {
    // 通过name进行模糊查询
    const TABLE_NAME = 'document';
    const QUERY_STR = 'doc_id, doc_title, doc_logo, doc_weight, doc_publish_time, doc_label, doc_github, doc_address, doc_desc';
    let sql;
    if (name === null || name === undefined) {
      sql = `select ${QUERY_STR} from ${TABLE_NAME}`;
    } else {
      sql = `select ${QUERY_STR} from ${TABLE_NAME} where doc_title like "%${name}%"`;
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
  async setDocumentList(data) {
    console.log('DocumentService-data', data);
    const result = await this.app.mysql.insert('document', {
      doc_logo: data.doc_logo,
      doc_title: data.doc_title,
      doc_desc: data.doc_desc,
      doc_address: data.doc_address,
      doc_github: data.doc_github,
      doc_label: data.doc_label,
      doc_publish_time: data.doc_publish_time,
      doc_weight: data.doc_weight,
    });
    const flag = result.affectedRows;
    return { flag };
  }
};