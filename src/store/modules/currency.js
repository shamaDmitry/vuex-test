import { API_URL } from '@/api/consts'
import moment from 'moment'
import formatDate from '@/utils/helpers'

const state = {
  currencyCodes: ['USD', 'EUR'],
  todayPrice: null,
  prevDayPrice: null,
  currencyCodeName: 'USD',
}

const mutations = {
  setTodayPrice(state, priceObj) {
    console.log('priceObj', priceObj);

    priceObj.map(item => {
      state.todayPrice = item.rate,
      state.currencyCodeName = item.cc
    });
  },

  setPrevDayPrice(state, price) {
    price.map(item => {
      state.prevDayPrice = item.rate
    });
  },

  setCurrencyCode(state, code) {
    state.currencyCodeName = code
  },
}

const actions = {
  getPrice({ commit, getters }, code) {
    let todayDate = formatDate(new Date().toISOString());
    let currentUrl = `${API_URL}/exchange?valcode=${code}&date=${todayDate}&json`;

    fetch(currentUrl)
      .then(res => res.json())
      .then(res => {
        commit('setTodayPrice', res);
      });

    let prevUrl = `${API_URL}/exchange?valcode=${code}&date=${getters.prevDay}&json`;

    fetch(prevUrl)
      .then(res => res.json())
      .then(res => {
        commit('setPrevDayPrice', res);
      });
  }
}

const getters = {
  todayPrice(state) {
    return state.todayPrice;
  },

  currencyCodeName(state) {
    return state.currencyCodeName;
  },

  prevDay() {
    return formatDate(moment().subtract(1, 'days').format())
  },

  prevDayPrice(state) {
    return state.prevDayPrice
  }
}


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
