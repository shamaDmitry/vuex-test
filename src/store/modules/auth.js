import axios from 'axios'
import router from '@/router'

const state = {
  token: localStorage.getItem('token') || '',
  user: {
    name: '',
    email: '',
    password: ''
  },
  status: localStorage.getItem('token') ? 'success' : false
}

const mutations = {
  authRequest(state, payload) {
    state.status = payload;
  },

  authSuccess(state, payload) {
    state.status = 'success';
    state.token = payload.token;
    state.user = payload.user;
  },

  authError(state) {
    state.status = 'error';
  },

  logOut(state) {
    state.status = '';
    state.token = '';

    localStorage.removeItem('token');
    router.push('/login');
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
        // axios.defaults.headers.common['Authorization'] = token;

        commit('authSuccess', { token, user });
      }
    } catch(error) {
      if(error.response) {
        const { message } = error.response.data;

        this._vm.$toast.error(message);
      }

      localStorage.removeItem('token');
    }
  },

  async login({ commit }, data) {
    try {
      commit('authRequest', 'loading');

      const resp = await axios({ url: '/api/login', data, method: 'POST' });

      if(resp.status === 200) {
        this._vm.$toast.success(resp.data.message);

        const { token, user } = resp.data;

        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = token;

        commit('authSuccess', { token, user });
      }
    } catch(error) {
      if(error.response) {
        const { message } = error.response.data;

        this._vm.$toast.error(message, {
          timeout: 1500
        });
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