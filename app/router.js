'use strict';
// 总路由
module.exports = app => {
  const { router, controller } = app;
  // -----------------前台界面-----------------
  router.get('/', controller.index.index.index);
  router.get('/home(/.+)?', controller.index.index.index);
  router.get('/list', controller.index.index.list);
  router.get('/document', controller.document.document.index);
  router.get('/documentch', controller.documentch.documentch.index);
  router.get('/tool', controller.tool.tool.index);
  router.get('/document/api/article/list', controller.document.document.list);
  router.get('/document/api/article/search', controller.document.document.search);
  router.get('/detail', controller.detail.detail.index);
  router.get('/detail/api/article/detail', controller.detail.detail.detail);
  router.get('/detail/api/article/list', controller.detail.detail.list);
  router.get('/index/api/article/list', controller.index.index.list);
  router.get('/detail/api/article/countDownload', controller.detail.detail.countDownload);
  router.get('/detail/api/article/countPreview', controller.detail.detail.countPreview);
  router.get('/detail/api/article/countRead', controller.detail.detail.countRead);

  // -----------------后台界面-----------------
  router.get('/login', controller.admin.admin.login);
  // 常用工具
  router.post('/admin/api/tool/list', controller.admin.admin.toollist);
  router.post('/admin/api/tool/add', controller.admin.admin.tooladd);
  router.get('/admin/api/tool/del/:id', controller.admin.admin.tooldel);
  router.post('/admin/api/tool/modify', controller.admin.admin.toolmodify);
  // 中文文档
  router.post('/admin/api/document/add', controller.admin.admin.documentadd);
  router.post('/admin/api/document/list', controller.admin.admin.documentlist);
  router.get('/admin/api/document/del/:id', controller.admin.admin.documentdel);
  router.post('/admin/api/document/modify', controller.admin.admin.documentmodify);
  // 文章
  router.post('/admin/api/article/list', controller.admin.admin.list);
  router.post('/admin/api/article/add', controller.admin.admin.add);
  router.post('/admin/api/article/updateEnabled', controller.admin.admin.updateEnabled);
  router.post('/admin/api/article/modify', controller.admin.admin.modify);
  router.get('/admin/api/article/del/:id', controller.admin.admin.del);
  router.get('/admin/api/article/:id', controller.admin.admin.detail);
  // 标签
  router.post('/admin/api/label/list', controller.admin.admin.labellist);
  router.post('/admin/api/label/add', controller.admin.admin.labeladd);
  router.post('/admin/api/label/modify', controller.admin.admin.labelmodify);
  router.get('/admin/api/label/del/:id', controller.admin.admin.labeldel);

  router.get('/admin(/.+)?', controller.admin.admin.home);
  router.post('/upload', controller.admin.upload.index);
};