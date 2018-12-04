'use strict';
const egg = require('egg');
module.exports = class ArticeService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }
  async getArtilceList(json = {}) {
    // 通过name进行模糊查询
    const TABLE_NAME = 'article';
    let sql;
    if (json.title === null || json.title === undefined) {
      sql = `select * from ${TABLE_NAME}`;
    } else {
      sql = `select * from ${TABLE_NAME} where atc_title like "%${json.title}%"`;
    }
    const articleList = await this.app.mysql.query(sql);
    const string = JSON.stringify(articleList);
    const list = JSON.parse(string);
    const total = list.length;
    return {
      total,
      list
    };
  }
  async saveArticle(json = {}) {
    console.log('json', json);
    const result1 = await this.app.mysql.insert('article',
      {
        atc_title: json.title,
        atc_fileUrl: json.fileUrl,
        atc_type: json.type,
        atc_weight: json.weight,
        atc_read: json.read,
        atc_preview: json.preview,
        atc_download: json.download,
        atc_like: json.like,
        atc_enabled: json.enabled,
        atc_content: json.content,
        atc_publish_time: json.publish_time,
      });
    console.log('result1', result1.insertId);
    const flag = result1.affectedRows;
    // 标签存关联表
    if (flag === 1 && json.label !== undefined && json.label.length > 0) {
      const row = [];
      let curobj = { al_atc_id: null, al_lb_id: null };
      json.label.forEach(item => {
        curobj = {
          al_atc_id: result1.insertId,
          al_lb_id: item,
        };
        row.push(curobj);
      });
      console.log('row', row);
      const result2 = await this.app.mysql.insert('atcAndLb', row);
      console.log('result2', result2.insertId);
    }
    return { flag };
  }
  async updateEnabledArticle(json = {}) {
    // 修改数据，将会根据主键 ID 查找，并更新
    console.log('json', json);
    const row = {
      atc_enabled: json.atc_enabled,
    };
    const options = {
      where: {
        atc_id: json.atc_id,
      }
    };
    const result = await this.app.mysql.update('article', row, options); // 更新 article 表中的记录
    const flag = result.affectedRows;
    return { flag };
  }
  async getArticleDetail(id = {}) {
    // 通过name进行模糊查询
    const TABLE_NAME = 'article';
    console.log('id', id);
    const sql = `select * from ${TABLE_NAME} where atc_id = ${id}`;
    const articleList = await this.app.mysql.query(sql);
    console.log('articleList', articleList);
    const string = JSON.stringify(articleList);
    const list = JSON.parse(string);
    return {
      list
    };
  }
  async modify(json = {}) {
    // 修改数据，将会根据主键 ID 查找，并更新
    console.log('json', json);
    const row = {
      atc_title: json.title,
    };
    const options = {
      where: {
        atc_id: json.id,
      }
    };
    const result = await this.app.mysql.update('article', row, options); // 更新 article 表中的记录
    const flag = result.affectedRows;
    return { flag };
  }
};