/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';
import { mount } from 'avoriaz';
import Home from '@/components/Home';
/* eslint-enable no-unused-vars */

Vue.use(Vuex);

describe('Home.vue', () => {
  let store = null;
  it('should render correct contents', () => {
    store = new Vuex.Store({
      getters: {
        isLoggedIn() {
          return false;
        },
        teamId() {
          return null;
        },
      },
    });
    const wrapper = mount(Home, { store });
    const cardsTitle = wrapper.find('.CardTitle');
    expect(cardsTitle[0].text()).to.equal('Welcome to Assist!');
    expect(cardsTitle[1].text()).to.equal("What's this?");
    expect(cardsTitle[2].text()).to.equal("What's BuzzerBeater");
  });
});
