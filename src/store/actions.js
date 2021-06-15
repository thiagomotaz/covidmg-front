import axios from 'axios';

export default {
  login({ commit }, userData) {
    console.log(userData);
    return new Promise((resolve, reject) => {
      commit('auth_request');
      axios.post('/login', { email: userData.login, password: userData.password })
        .then((response) => {
          const { user, access_token: token } = response.data;

          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
          commit('auth_success', { token, user });
          resolve(response);
        })
        .catch((err) => {
          commit('auth_error');
          localStorage.removeItem('token');
          reject(err);
        });
    });
  },

  logout({ commit }) {
    return new Promise((resolve) => {
      commit('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common.Authorization;
      resolve();
    });
  },

  refreshToken({ commit }) {
    axios.get('/refresh')
      .then((response) => {
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        commit('auth_success', { token });
      })
      .catch((error) => {
        console.log('refresh token error');
        commit('logout');
        localStorage.removeItem('token');
        console.log(error);
      });
  },
};
