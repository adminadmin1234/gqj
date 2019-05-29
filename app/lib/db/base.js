'use strict';
const shortid = require('shortid');
module.exports = class DB {
  constructor(name = 'blog.json') {
    console.log('初始化数据库');
    this.name = name;
  }
  getUniqueId() {
    return shortid.generate();
  }
  get(collectionName) {
    return null;
  }
  add(collectionName, json) {
    return null;
  }
  update(collectionName, where, json) {
    return null;
  }
  delete(collectionName, field) {
    return null;
  }
  getPager(collectionName, query) {
    return null;
  }
};