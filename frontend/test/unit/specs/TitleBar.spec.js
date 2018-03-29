/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';
import { mount } from 'avoriaz';
import TitleBar from '@/components/TitleBar';
/* eslint-enable no-unused-vars */

Vue.use(Vuex);

describe('TitleBar.vue', () => {
  const fakeState = {
    loggedIn: false,
  };
  const mutations = {
    logInOut: sinon.stub(),
    openCloseLogin: sinon.stub(),
  };
  let store = null;
  let wrapper = null;
  beforeEach(() => {
    store = new Vuex.Store({
      getters: {
        isLoggedIn() {
          return fakeState.loggedIn;
        },
      },
      mutations,
    });
  });
  it('should render correct contents and log In', () => {
    wrapper = mount(TitleBar, { store });
    const title = wrapper.find('.Title');
    expect(title[0].text()).to.equal('Assist 2');
    const button = wrapper.find('.TitleButton');
    expect(button[0].text()).to.equal('Log In');
    // eslint-disable-next-line
    expect(mutations.openCloseLogin).not.to.be.calledOnce;
    wrapper.find('.SignInButton')[0].trigger('click');
    // eslint-disable-next-line
    expect(mutations.openCloseLogin).to.be.calledOnce;
  });
  it('should render correct contents and log Out', () => {
    fakeState.loggedIn = true;
    wrapper = mount(TitleBar, { store });
    const button = wrapper.find('.TitleButton');
    expect(button[0].text()).to.equal('Log Out');
    // eslint-disable-next-line
    expect(mutations.logInOut).not.to.be.calledOnce;
    wrapper.find('.SignInButton')[0].trigger('click');
    // eslint-disable-next-line
    expect(mutations.logInOut).to.be.calledOnce;
  });
});
