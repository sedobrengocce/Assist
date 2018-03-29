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
  mutations: {
    logInOut(state, data) {
      if (state.loggedIn) {
        socket.on('logout', () => {
          state.loggedIn = false;
          state.team = null;
        });
        socket.emit('logout');
      } else {
        socket.on('login', (res) => {
          if (res.status === 'Success') {
            state.loggedIn = true;
            state.team = res.team;
          } else {
            // eslint-disable-next-line
            console.error.bind(console, 'cannot login');
          }
        });
        socket.emit('login', data);
      }
    },
    openCloseLogin(state, open) {
      state.logInModal = open;
    },
  },
});

