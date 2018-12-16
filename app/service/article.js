'use strict';
const egg = require('egg');
module.exports = class ArticeService extends egg.Service {
  constructor(ctx) {
    super(ctx);
    this.ctx = ctx;
  }
  // 公共函数
  // ---------------------------------------------------
  // 数组对象去重
  uniqueObj(objArray) {
    const result = [];// 去重后返回的结果数组
    const temp = {};// 临时对象
    // 将对象数组中每一项的atc_id值作为属性，若temp不拥有此属性时则为temp添加此属性且将其值赋为true，并将这一项push到结果数组中
    for (let i = 0; i < objArray.length; i++) {
      const atc_id = objArray[i].atc_id;
      if (temp[atc_id]) { // 如果temp中已经存在此属性名，则说明遇到重复项
        continue;// 不继续执行接下来的代码，跳转至循环开头
      }
      temp[atc_id] = true;// 为temp添加此属性（atc_id）且将其值赋为true
      result.push(objArray[i]); // 将这一项复制到结果数组result中去
    }
    return result;
  }
  // 管理后台接口
  // ------------------------------------------
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
    const sql = `select * from ${TABLE_NAME} where atc_id = ${id}`;
    const articleList = await this.app.mysql.query(sql);
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
      atc_fileUrl: json.fileUrl,
      atc_type: json.type,
      atc_weight: json.weight,
      atc_read: json.read,
      atc_preview: json.preview,
      atc_download: json.download,
      atc_like: json.like,
      atc_content: json.content,
      atc_enabled: json.enabled,
      atc_publish_time: json.publish_time,
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
  // 前端页面接口
  // -------------------------------------------
  // 首页右边列表数据
  // 必须要有标签才能查出来
  async getArtilceListIndex() {
    const query = 'select * from article a,label l,atcAndLb al where a.atc_id=al.al_atc_id and l.lb_id=al.al_lb_id LIMIT 4';
    const articleList = await this.app.mysql.query(query);
    const string = JSON.stringify(articleList);
    const list = JSON.parse(string);
    const temp = this.uniqueObj(list);
    if (list.length > 0) {
      temp.forEach(item1 => {
        const labelList = [];
        list.forEach(item2 => {
          if (item1.atc_id === item2.atc_id) {
            labelList.push(item2.lb_name);
          }
          item1.labelList = labelList;
        });
      });
    }
    const total = temp.length;
    return {
      total,
      temp
    };
  }
  // 根据标签id查询文章
  async getArtilceListDoc(lbId, index = 0, maxCount = 12) {
    const offset = index * maxCount - maxCount;
    const query = 'select SQL_CALC_FOUND_ROWS * from article as a join (select * from atcAndLb as al where al.al_lb_id ='
    + lbId + ') as al where a.atc_id = al.al_atc_id order by a.atc_publish_time desc limit '
    + offset + ',' + maxCount;
    const articleList = await this.app.mysql.query(query);
    const totalNum = await this.app.mysql.query('select FOUND_ROWS()');
    const string = JSON.stringify(articleList);
    const temp = JSON.parse(string);
    let stringTotalNum = JSON.stringify(totalNum);
    stringTotalNum = stringTotalNum.replace('FOUND_ROWS()', 'total');
    const jsonTotalNum = JSON.parse(stringTotalNum);
    // const temp = this.uniqueObj(list);
    const total = jsonTotalNum[0].total;
    return {
      total,
      temp
    };
  }
  // 根据文章标题关键字查询文章
  async getArtilceListDocBySearch(keyword, index = 0, maxCount = 12) {
    // 通过name进行模糊查询
    const TABLE_NAME = 'article';
    const sql = `select * from ${TABLE_NAME} where atc_title like "%${keyword}%"`;
    const articleList = await this.app.mysql.query(sql);
    const string = JSON.stringify(articleList);
    const temp = JSON.parse(string);
    const total = temp.length;
    return {
      total,
      temp
    };
  }
  // 文章详情页右边两个列表数据
  async getArtilceRightList(atcId) {
    // 通过文章id查询出文章标签关联表的标签id
    const sql = 'select al_lb_id from atcAndLb where al_atc_id =' + atcId;
    const article = await this.app.mysql.query(sql);
    const articleStr = JSON.stringify(article);
    const articleJson = JSON.parse(articleStr);
    console.log('articleJson[0].al_lb_id', articleJson[0].al_lb_id);

    // 通过标签id查标签名
    const sql1 = 'select lb_name from label where lb_id =' + articleJson[0].al_lb_id;
    const label = await this.app.mysql.query(sql1);
    const labelStr = JSON.stringify(label);
    const labelJson = JSON.parse(labelStr);
    console.log('articleJson[0].lb_name', labelJson[0].lb_name);
    const labelData = {
      id: articleJson[0].al_lb_id,
      name: labelJson[0].lb_name
    };

    // 查询相关列表
    const query = 'select * from article as a join (select * from atcAndLb as al where al.al_lb_id ='
    + articleJson[0].al_lb_id + ') as al where a.atc_id = al.al_atc_id order by a.atc_publish_time limit 8';
    const articleList = await this.app.mysql.query(query);
    const string = JSON.stringify(articleList);
    const list = JSON.parse(string);
    const reactList = this.uniqueObj(list);

    // 查询最新列表
    const query1 = 'select * from article order by atc_publish_time limit 8';
    const articleList1 = await this.app.mysql.query(query1);
    const string1 = JSON.stringify(articleList1);
    const list1 = JSON.parse(string1);
    const newList = this.uniqueObj(list1);

    return {
      labelData,
      reactList,
      newList
    };
  }
  async addDownloadCount(atcId) {
    const TABLE_NAME = 'article';
    const sql = `update ${TABLE_NAME} set atc_download=atc_download+1 where atc_id = ${atcId}`;
    const articleList = await this.app.mysql.query(sql);
  }
  async addPriviewCount(atcId) {
    const TABLE_NAME = 'article';
    const sql = `update ${TABLE_NAME} set atc_preview=atc_preview+1 where atc_id = ${atcId}`;
    const articleList = await this.app.mysql.query(sql);
  }
  async addReadCount(atcId) {
    const TABLE_NAME = 'article';
    const sql = `update ${TABLE_NAME} set atc_read=atc_read+1 where atc_id = ${atcId}`;
    const articleList = await this.app.mysql.query(sql);
  }
};