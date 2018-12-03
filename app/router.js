'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.index.index.index);
  router.get('/home', controller.index.index.index);
  router.get('/client', controller.index.index.client);
  router.get('/list', controller.index.index.list);
  router.get('/category', controller.category.category.index);
  router.get('/login', controller.admin.admin.login);
  router.post('/admin/api/article/list', controller.admin.admin.list);
  router.post('/admin/api/article/add', controller.admin.admin.add);
  router.get('/admin/api/article/del/:id', controller.admin.admin.del);
  router.get('/admin/api/article/:id', controller.admin.admin.detail);
  // 标签
  router.post('/admin/api/label/list', controller.admin.admin.labellist);
  router.post('/admin/api/label/add', controller.admin.admin.labeladd);
  router.get('/admin/api/label/del/:id', controller.admin.admin.labeldel);

  router.get('/admin(/.+)?', controller.admin.admin.home);
  router.get('/admin/api/article/getctx', controller.admin.admin.getctx);
  router.post('/upload', controller.admin.upload.index);
};