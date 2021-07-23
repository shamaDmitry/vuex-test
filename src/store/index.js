import Vue from 'vue'
import Vuex from 'vuex'
import { API_URL } from '@/api/consts'

// import counter from "./modules/counter"
import currency from "./modules/currency"
import auth from "./modules/auth"

Vue.use(Vuex)

const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    // counter,
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