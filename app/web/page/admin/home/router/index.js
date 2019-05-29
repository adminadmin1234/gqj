import Vue from 'vue';

import VueRouter from 'vue-router';
import Dashboard from '../view/dashboard/index.vue';
import ArticleList from '../view/list.vue';
import LableList from '../view/label.vue';
import DocumentList from '../view/document.vue';
import ToolList from '../view/tool.vue';

Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: '/admin/',
    routes: [
      {
        path: '/',
        component: Dashboard
      },
      {
        path: '/article/list',
        component: ArticleList
      },
      {
        path: '/article/add',
        component: () => import('../view/write/index.vue')
      },
      {
        path: '/article/detail/:id',
        component: () => import('../view/detail.vue')
      },
      {
        path: '/document/list',
        component: DocumentList
      },
      {
        path: '/tool/list',
        component: ToolList
      },
      {
        path: '/label/list',
        component: LableList
      },
      {
        path: '*', component: () => import('../view/notfound.vue')
      }
    ]
  });
}