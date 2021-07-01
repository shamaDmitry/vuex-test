const state = {
  counter: 22
}

const mutations = {
  increase(state, payload) {
    state.counter += payload
  },

  decrease(state, payload) {
    state.counter -= payload
  },
}

const actions = {
  increaseAction({ commit }) {
    fetch('https://www.random.org/integers/?num=1&min=1&max=666&col=1&base=10&format=plain&rnd=new')
      .then(res => res.json())
      .then(res => {
        commit('increase', res);
      })
  },

  decreaseAction({ commit }) {
    fetch('https://www.random.org/integers/?num=1&min=1&max=666&col=1&base=10&format=plain&rnd=new')
      .then(res => res.json())
      .then(res => {
        commit('decrease', res);
      })
  },
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
