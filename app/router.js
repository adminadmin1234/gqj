'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.index.index.index);
  router.get('/home(/.+)?', controller.index.index.index);
  // router.get('/home', controller.index.index.index);
  // router.get('/client', controller.index.index.client);
  router.get('/list', controller.index.index.list);
  router.get('/category', controller.category.category.index);
  router.get('/document', controller.document.document.index);
  router.get('/document/api/article/list', controller.document.document.list);
  router.get('/document/api/article/search', controller.document.document.search);
  // router.get('/document/api/article/list/:id', controller.document.document.list);
  router.get('/detail', controller.detail.detail.index);
  router.get('/detail/api/article/detail', controller.detail.detail.detail);
  router.get('/detail/api/article/detail/:id', controller.detail.detail.detail);
  router.get('/detail/api/article/list', controller.detail.detail.list);
  router.get('/index/api/article/list', controller.index.index.list);

  // 管理后台
  // ----------------------------------
  router.get('/login', controller.admin.admin.login);
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
  router.get('/admin/api/label/del/:id', controller.admin.admin.labeldel);

  router.get('/admin(/.+)?', controller.admin.admin.home);
  router.post('/upload', controller.admin.upload.index);
};