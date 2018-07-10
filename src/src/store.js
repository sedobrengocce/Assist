/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';
/* eslint-enable no-unused-vars */

Vue.use(Vuex);
const socket = io();

export default new Vuex.Store({
  state: {
    loggedIn: false,
    logInModal: false,
    team: null,
  },
  getters: {
    isLoggedIn(state) {
      return state.loggedIn;
    },
    isOpenLoginModal(state) {
      return state.logInModal;
    },
    teamId(state) {
      return state.team;
    },
  },
  actions: {
    login({ commit, state }, data) {
      if (state.loggedIn) {
        socket.on('logout', () => {
          commit('login', false);
        });
        socket.emit('logout');
      } else {
        socket.on('login', (res) => {
          if (res.status === 'Success') {
            commit('login', true);
          } else {
            // eslint-disable-next-line
            console.error('Cannot Login');
          }
        });
        socket.emit('login', data);
      }
    },
  },
  mutations: {
    login(state, data) {
      state.loggedIn = data;
    },
    openCloseLogin(state, open) {
      state.logInModal = open;
    },
  },
});

