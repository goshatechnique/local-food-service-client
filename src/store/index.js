import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import product from './modules/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    product,
  },
});
