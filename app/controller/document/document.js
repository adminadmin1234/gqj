'use strict';
module.exports = app => {
  return class DocumentController extends app.Controller {
    async index(ctx) {
      let lbId = ctx.query.id || null;
      const paginationIndex = ctx.query.index || null;
      const keyword = [];
      let articleList = [];
      // 获取文档标签
      const labelList = await ctx.service.label.getLabelList(null, 1);
      if (labelList !== null && labelList.list !== undefined && labelList.list.length > 0) {
        // 获取插件列表
        if (lbId === null && paginationIndex === null) {
          articleList = await ctx.service.article.getArtilceListDoc(labelList.list[0].lb_id, 1, 12);
          lbId = labelList.list[0].lb_id;
        } else {
          articleList = await ctx.service.article.getArtilceListDoc(lbId, 1, 12);
        }
      }
      if (articleList !== null && articleList.temp !== undefined && articleList.temp.length > 0) {
        articleList.temp.forEach(labelItem => {
          keyword.push(labelItem.atc_title);
        });
      }
      // seo信息
      let keywords = keyword.join(',');
      keywords = keywords.substr(0, 80);
      const description = '前端中文文档，前端中文工具，大前端知识体系，全栈工程师能力，前端中文api，前端中文开发文档汇总，前端中文编程，钢琴家';
      const seo = {
        title: '前端中文文档API集合，大前端知识体系-钢琴家',
        keywords,
        description,
      };
      const dataRes = { labelList, articleList, seo, lbId };
      console.log('dataRes1', dataRes);
      await this.ctx.render('document/document.js', { dataRes });
    }
    async list(ctx) {
      const articleList = await ctx.service.article.getArtilceListDoc(ctx.query.id, ctx.query.index, ctx.query.pagesize);
      this.ctx.body = articleList;
    }
    async search(ctx) {
      const articleList = await ctx.service.article.getArtilceListDocBySearch(ctx.query.keyword);
      this.ctx.body = articleList;
    }
  };
};