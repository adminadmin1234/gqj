'use strict';

import {
  SET_CXT,
  SET_ARTICLE_LIST,
  SET_ARTICLE_DETAIL,
  SET_SAVE_ARTICLE,
  DELETE_ARTICLE
} from './mutation-type';

const mutations = {
  [SET_CXT](state, data) {
    state.cxt = data;
  },
  [SET_ARTICLE_LIST](state, { list, total }) {
    state.articleTotal = total;
    state.articleList = list;
  },
  [SET_ARTICLE_DETAIL](state, data) {
    state.article = data;
  },
  [SET_SAVE_ARTICLE](state, data) {
    state.articleTotal += 1;
    state.articleList = [data].concat(state.articleList);
  },
  [DELETE_ARTICLE](state, { id }) {
    state.articleTotal -= 1;
    state.articleList = state.articleList.filter(item => {
      return item.id !== id;
    });
  }
};
export default mutations;
