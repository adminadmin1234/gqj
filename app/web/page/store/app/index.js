'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default function createStore(initState) {
  console.log('createStore', initState);
  const state = {
    // labelTotal: 0,
    // labelList: [],
    // articleTotal: 0,
    // articleList: [],
    // article: {},
    // ...initState
  };
  console.log('createStorestate', state);
  console.log('报错前');
  return new Vuex.Store({
    // state,
    // actions,
    // getters,
    // mutations
  });
}