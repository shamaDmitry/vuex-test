const state = {
  currencyName: 'USD'
}

const mutations = {
  setCurrentAmount(state, newMoneyValue) {
    state.currentAmount = newMoneyValue
  }
}

const actions = {
  getCurrents({ commit }) {
    let date = new Date().toISOString().replaceAll('-', '').slice(0, 8);

    fetch(`${API_URL}/exchange?valcode=USD&date=${date}&json`)
      .then(res => res.json())
      .then(res => {
        console.log('res', res);
      })
  }
}

const getters = {
  squared(state) {
    return Math.pow(state.counter, 2)
  }
}


export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
