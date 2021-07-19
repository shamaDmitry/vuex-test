import { API_URL } from '@/api/consts'
import moment from 'moment'
import formatDate from '@/utils/helpers'

const state = {
  currencyCodes: [],
  todayPrice: null,
  prevDayPrice: null,
  currencyCodeName: 'USD',
  currencyText: '',
  historyData: [],
  currencies: [
    {
      code: '',
      color: '',
      background: 'rgba(54,73,93,.5)'
    },
  ],
  chartDataRaw: null
}

const mutations = {
  setTodayPrice(state, priceObj) {
    priceObj.map(item => {
      state.todayPrice = item.rate,
        state.currencyCodeName = item.cc,
        state.currencyText = item.txt
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

  setCurrencyCodeNames(state, codes) {
    state.currencyCodes = codes
  },

  setHistoryData(state, dates) {
    state.historyData = dates
  },

  setCurrencyText(state, text) {
    state.currencyText = text
  },

  setCurrencies(state, payload) {
    state.currencies.push(payload);
  },

  removeCurrencies(state, index) {
    state.currencies.splice(index, 1);
  },

  setDymamicChartData(state, chartDataObj) {
    state.chartDataRaw = chartDataObj
  }
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
  },

  getCurrencyList({ commit }) {
    let url = `${API_URL}/exchange?json`;

    fetch(url)
      .then(res => res.json())
      .then(res => {
        let codes = res.filter(item => item.cc !== 'USD').map(item => item.cc).sort();

        commit('setCurrencyCodeNames', codes);
      });
  },

  async getHistoryData({ commit }, code) {
    let promises = [];
    let rawData = [];
    let currencyText;

    for(let i = 1; i <= 7; i++) {
      let date = formatDate(moment().subtract(i, 'days').format());

      promises.push(
        fetch(`${API_URL}/exchange?valcode=${code}&date=${date}&json`)
      );
    }

    await Promise.all(promises)
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(res => {
        res.map((oneRes) => {
          rawData.push(oneRes[0]);
          currencyText = oneRes[0].txt
        });
      })
      .catch(error => console.log("Error" + error));

    commit('setHistoryData', rawData);
    commit('setCurrencyText', currencyText);
  },
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
  },

  chartLabels(state) {
    return state.historyData.map(data => data.exchangedate)
  },

  chartValues(state) {
    let label = '';
    let data = state.historyData.map(item => {
      return (
        label = item.txt,
        item.rate
      )
    });

    return {
      label,
      data,
      borderColor: '#de4437',
      borderWidth: 4
    }
  },
}


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
