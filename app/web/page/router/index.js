import Vue from 'vue';

import VueRouter from 'vue-router';
import index from '../index/index.vue';
import document from '../document/document.vue';

Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: '/',
    routes: [
      {
        path: '/',
        component: index
      },
      {
        path: '/document',
        component: document,
        name: 'Document'
      }
    ]
  });
}