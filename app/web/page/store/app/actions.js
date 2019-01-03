// 'use strict';

// import * as Type from './mutation-type';
// import Vue from 'vue';
// import Vuex from 'vuex';
// import request from 'framework/network/request';

// Vue.use(Vuex);

// const actions = {
//   // 前台获取某个文章详情
//   GET_ARTICLE_DETAIL: (store, { id }) => {
//     // 鉴权 TODO
//     const { commit, dispatch, state } = store;
//     return request.get(`/detail/api/article/detail/${id}`, store)
//       .then(response => {
//         store.commit(Type.GET_ARTICLE_DETAIL, response.data);
//       });
//   },
//   // 标签
//   SET_LABEL_LIST: (store, json) => {
//     return request.post('/admin/api/label/list', json, store).then(response => {
//       store.commit(Type.SET_LABEL_LIST, response.data);
//     });
//   },
//   SET_LABEL_SAVE: (store, json) => {
//     return request.post('/admin/api/label/add', json, store).then(response => {
//       store.commit(Type.SET_LABEL_SAVE, response.data);
//     });
//   },
//   LABEL_DELETE: (store, { id }) => {
//     // 鉴权 TODO
//     const { commit, dispatch, state } = store;
//     return request.get(`/admin/api/label/del/${id}`, store)
//       .then(response => {
//         commit(Type.LABEL_DELETE, { id });
//       });
//   },
//   // 文章
//   SET_ARTICLE_LIST: (store, json) => {
//     return request.post('/admin/api/article/list', json, store).then(response => {
//       store.commit(Type.SET_ARTICLE_LIST, response.data);
//     });
//   },
//   SET_ARTICLE_DETAIL: (store, { id }) => {
//     const { commit, dispatch, state } = store;
//     return request.get(`/admin/api/article/${id}`, store)
//       .then(response => {
//         commit(Type.SET_ARTICLE_DETAIL, response.data);
//       });
//   },
//   SET_SAVE_ARTICLE: (store, json) => {
//     const { commit, dispatch, state } = store;
//     console.log('SET_SAVE_ARTICLE-json', json);
//     return request.post('/admin/api/article/add', json, store).then(response => {
//       commit(Type.SET_SAVE_ARTICLE, json);
//     });
//   },
//   DELETE_ARTICLE: (store, { id }) => {
//     // 鉴权 TODO
//     const { commit, dispatch, state } = store;
//     return request.get(`/admin/api/article/del/${id}`, store)
//       .then(response => {
//         commit(Type.DELETE_ARTICLE, { id });
//       });
//   },
// };

// export default actions;