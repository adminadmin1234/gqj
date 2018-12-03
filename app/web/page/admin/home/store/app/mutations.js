'use strict';
// 对服务端返回的结果做处理
import {
  SET_CXT,
  SET_LABEL_LIST,
  SET_LABEL_SAVE,
  LABEL_DELETE,
  SET_ARTICLE_LIST,
  SET_ARTICLE_DETAIL,
  SET_SAVE_ARTICLE,
  DELETE_ARTICLE
} from './mutation-type';

const mutations = {
  [SET_CXT](state, data) {
    state.cxt = data;
  },
  // 标签
  [SET_LABEL_LIST](state, { list, total }) {
    state.labelTotal = total;
    state.labelList = list;
  },
  [SET_LABEL_SAVE](state, data) {
    if (data.flag === 1) {
      state.dialogVisible = false;
    } else {
      state.dialogVisible = true;
    }
  },
  [LABEL_DELETE](state, { id }) {
    if (id !== null) {
      console.log('LABEL_DELETE');
      state.labelTotal -= 1;
      state.labelList = state.labelList.filter(item => {
        return item.lb_id !== id;
      });
    }
  },
  // 文章
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
