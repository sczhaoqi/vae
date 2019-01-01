import Vue from 'vue'
import Vuex from 'vuex'

import * as types from './stores/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: ''
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      sessionStorage.token = data;
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      sessionStorage.removeItem('token');
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    }
  },
  actions: {

  }
})
