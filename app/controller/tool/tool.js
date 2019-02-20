'use strict';
const egg = require('egg');
module.exports = class ToolController extends egg.Controller {
  async index(ctx) {
    const keyword = [];
    // 获取文档标签
    const labelList = await ctx.service.label.getLabelListForend(4);
    // 获取文档列表
    const toolList = await ctx.service.tool.getTlList();
    if (typeof labelList.list !== 'undefined' && labelList.list.length > 0 && typeof toolList.list !== 'undefined' && toolList.list.length > 0) {
      labelList.list.forEach(labelItem => {
        const arr = [];
        toolList.list.forEach(docItem => {
          if (labelItem.lb_id.toString() === docItem.tl_label) {
            arr.push(docItem);
            keyword.push(docItem.tl_title);
          }
        });
        labelItem.toolList = arr;
      });
    }
    // seo信息
    let keywords = keyword.join(',');
    keywords = keywords.substr(0, 80);
    const description = 'IT在线工具，IT常用工具，IT网站收藏，IT工作工具，程序员工具箱，钢琴家';
    const seo = {
      title: '大前端、设计师、产品经理、运营人员在线工具、常用工具网站收藏-钢琴家',
      keywords,
      description,
    };
    const dataRes = { labelList, toolList, seo };
    await this.ctx.render('tool/tool.js', { dataRes });
  }
};