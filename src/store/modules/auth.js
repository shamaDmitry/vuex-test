import axios from 'axios'

const state = {
  token: localStorage.getItem('token') || '',
  user: {
    name: 'test',
    email: 'test@test.com',
    password: 'test'
  },
  status: ''
}

const mutations = {
  authRequest(state) {
    state.status = 'loading';
  },

  authSuccess(state, token, user) {
    state.status = 'success';
    state.token = token;
    state.user = user;
  },

  authError(state) {
    state.status = 'error';
  },

  logOut(state) {
    state.status = '';
    state.token = '';
  },

  setName(state, name) {
    state.user.name = name
  },

  setEmail(state, email) {
    state.user.email = email
  },

  setPassword(state, password) {
    state.user.password = password
  },

  clearFields(state) {
    state.user.name = '';
    state.user.email = '';
    state.user.password = '';
  }
}

const actions = {
  async register({ commit }, user) {
    try {
      commit('authRequest');

      const resp = await axios({ url: '/api/register', data: user, method: 'POST' });
      console.log(resp);

      if(resp.status === 201) {
        this._vm.$toast.success(resp.data.message);

        const token = resp.data.token;
        const user = resp.data.user;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = token;
        commit('authSuccess', token, user);

        commit('clearFields');
      }
    } catch(error) {
      console.error(error);

      if(error.response) {
        const { message } = error.response.data;

        this._vm.$toast.error(message);
      }

      localStorage.removeItem('token');
    }
  },

  async login({ commit }, user) {
    try {
      commit('authRequest');

      const resp = await axios({ url: '/api/login', data: user, method: 'POST' });
      console.log(resp);

      if(resp.status === 201) {
        this._vm.$toast.success(resp.data.message);

        const token = resp.data.token;
        const user = resp.data.user;

        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = token;
        commit('authSuccess', token, user);

        commit('clearFields');
      }
    } catch(e) {
      console.error(error);

      if(error.response) {
        const { message } = error.response.data;

        this._vm.$toast.error(message);
      }

      localStorage.removeItem('token');
    }
  }
}

const getters = {
  isLoggedIn(state) {
    return !!state.token;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}