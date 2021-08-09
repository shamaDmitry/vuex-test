import Vue from 'vue'
import Vuex from 'vuex'

import currency from "./modules/currency"
import auth from "./modules/auth"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    currency,
    auth
  },

  state: {

  },
  mutations: {

  },

  actions: {

  },

  getters: {

  },
})

export default store