'use strict';
const egg = require('egg');
module.exports = class DocumentchController extends egg.Controller {
  async index(ctx) {
    // 获取文档标签
    const labelList = await ctx.service.label.getLabelListForend(2);
    // 获取文档列表
    const docList = await ctx.service.document.getDocList();
    if (typeof labelList.list !== 'undefined' && labelList.list.length > 0 && typeof docList.list !== 'undefined' && docList.list.length > 0) {
      labelList.list.forEach(labelItem => {
        const arr = [];
        docList.list.forEach(docItem => {
          if (labelItem.lb_id.toString() === docItem.doc_label) {
            arr.push(docItem);
          }
        });
        labelItem.docList = arr;
      });
    }
    // seo信息
    const content = 1;
    const description = 2;
    const seo = {
      title: 1,
      keywords: 2,
      description,
    };
    const dataRes = { labelList, docList, seo };
    await this.ctx.render('documentch/documentch.js', { dataRes });
  }
};