import axios from 'axios';
import router from '@/router';
import { API } from '@/api/consts';

const user = JSON.parse(localStorage.getItem('user'));
const emptyUser = {
  name: '',
  email: '',
  password: '',
};

const state = {
  token: localStorage.getItem('token') || '',
  user: user || emptyUser,
  status: localStorage.getItem('token') ? 'success' : false,
};

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
    localStorage.removeItem('user');
    router.push('/login');
  },

  setName(state, name) {
    state.user.name = name.trim();
  },

  setEmail(state, email) {
    state.user.email = email.trim();
  },

  setPassword(state, password) {
    state.user.password = password.trim();
  },

  clearFields(state) {
    state.user.name = '';
    state.user.email = '';
    state.user.password = '';
  },

  setUser(state, userData) {
    state.user = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  },
};

const actions = {
  async register({ commit }, user) {
    try {
      commit('authRequest');

      const resp = await axios({
        url: `${API}/api/register`,
        data: user,
        method: 'POST',
      });

      if (resp.status === 201) {
        this._vm.$toast.success(resp.data.message);

        const token = resp.data.token;
        const user = resp.data.user;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        commit('authSuccess', { token, user });
      }
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;

        this._vm.$toast.error(message);
      }

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  async login({ commit }, data) {
    try {
      commit('authRequest', 'loading');

      const resp = await axios({
        url: `${API}/user/login`,
        data,
        method: 'POST',
      });

      if (resp.status === 200) {
        this._vm.$toast.success(resp.data.message);
        const { token, user } = resp.data;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
        commit('authSuccess', { token, user });
      } else {
        console.log(resp.status);
      }
    } catch (error) {
      if (error.response) {
        const { message } = error.response.data;

        const errorStr =
          typeof message === 'object'
            ? message.map(item => item.msg).join()
            : message;

        this._vm.$toast.error(errorStr, {
          timeout: 1500,
        });
      }

      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  logout({ commit }) {
    commit('logOut');
    commit('setUser', {
      name: '',
      email: '',
      password: '',
    });
  },
};

const getters = {
  isLoggedIn(state) {
    return !!state.token;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
