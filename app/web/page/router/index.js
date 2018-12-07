import Vue from 'vue';

import VueRouter from 'vue-router';
import index from '../index/index.vue';


Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: '/index/',
    routes: [
      {
        path: '/',
        component: index
      },
    ]
  });
}