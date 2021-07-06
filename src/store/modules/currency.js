import { API_URL } from '@/api/consts'

const state = {
  currencyCodes: ['USD', 'EUR'],
  todayPrice: null,
  currencyCodeName: 'USD'
}

const mutations = {
  setTodayPrice(state, payload) {
    payload.map(item => {
      state.todayPrice = item.rate,
      state.currencyCodeName = item.cc
    });
  },
  setCurrencyCode(state, code) {
    state.currencyCodeName = code
  }
}

const actions = {
  async getTodayPrice({ commit }, code) {
    let date = new Date().toISOString().replaceAll('-', '').slice(0, 8);
    let url = `${API_URL}/exchange?valcode=${code}&date=${date}&json`;
    const res = await fetch(url);
    const data = await res.json();

    commit('setTodayPrice', data);
  }
}

const getters = {
  todayPrice(state) {
    return state.todayPrice * 100;
  },
  currencyCodeName(state) {
    return state.currencyCodeName;
  }
}


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
