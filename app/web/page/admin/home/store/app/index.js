'use strict';
import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

export default function createStore(initState) {
  const state = {
    addDialog: false,
    toolTotal: 0,
    toolList: [],
    documentTotal: 0,
    documentList: [],
    labelTotal: 0,
    labelList: [],
    articleTotal: 0,
    articleList: [],
    article: {},
    ...initState
  };
  return new Vuex.Store({
    state,
    actions,
    getters,
    mutations
  });
}