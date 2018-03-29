/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';
import { mount } from 'avoriaz';
import Login from '@/components/Login';
/* eslint-enable no-unused-vars */

Vue.use(Vuex);

describe('Login.vue', () => {
  const fakeState = {
    isOpenLoginModal: false,
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
        isOpenLoginModal() {
          return fakeState.isOpenLoginModal;
        },
      },
      mutations,
    });
    mutations.openCloseLogin.reset();
    mutations.logInOut.reset();
  });
  it('should not be visible if not opened', () => {
    wrapper = mount(Login, { store });
    const backdrop = wrapper.find('.Backdrop')[0];
    const modal = wrapper.find('.Modal')[0];
    expect(modal.hasStyle('top', '-100vh')).to.equal(true);
    expect(backdrop.hasStyle('z-index', '0')).to.equal(true);
  });
  it('should render correct contents', () => {
    fakeState.isOpenLoginModal = true;
    wrapper = mount(Login, { store });
    const title = wrapper.find('h2');
    const label = wrapper.find('label');
    const button = wrapper.find('.Button');
    const backdrop = wrapper.find('.Backdrop')[0];
    const modal = wrapper.find('.Modal')[0];
    expect(wrapper.find('.fa-times').length).to.equal(1);
    expect(title[0].text()).to.equal('Log in');
    expect(label[0].text()).to.equal('User Name');
    expect(label[1].text()).to.equal('BB Code');
    expect(button[0].text()).to.equal('Log In');
    expect(button[1].text()).to.equal('Cancel');
    expect(backdrop.hasStyle('visibility', 'visible')).to.equal(true);
    expect(modal.hasStyle('top', '80px')).to.equal(true);
  });
  it('should close on backdrop Click', () => {
    fakeState.isOpenLoginModal = true;
    wrapper = mount(Login, { store });
    // eslint-disable-next-line
    expect(mutations.openCloseLogin).not.to.be.calledOnce;
    wrapper.find('.Backdrop')[0].trigger('click');
    // eslint-disable-next-line
    expect(mutations.openCloseLogin).to.be.calledOnce;
  });
  it('should close X Click', () => {
    fakeState.isOpenLoginModal = true;
    wrapper = mount(Login, { store });
    // eslint-disable-next-line
    expect(mutations.openCloseLogin).not.to.be.calledOnce;
    wrapper.find('.ModalHeader > div')[0].trigger('click');
    // eslint-disable-next-line
    expect(mutations.openCloseLogin).to.be.calledOnce;
  });
  it('should close cancel Click', () => {
    fakeState.isOpenLoginModal = true;
    wrapper = mount(Login, { store });
    // eslint-disable-next-line
    expect(mutations.openCloseLogin).not.to.be.calledOnce;
    wrapper.find('.Button')[1].trigger('click');
    // eslint-disable-next-line
    expect(mutations.openCloseLogin).to.be.calledOnce;
  });
  it('should call login function on login Click', () => {
    fakeState.isOpenLoginModal = true;
    wrapper = mount(Login, { store });
    // eslint-disable-next-line
    expect(mutations.logInOut).not.to.be.calledOnce;
    wrapper.find('.Button')[0].trigger('click');
    // eslint-disable-next-line
    expect(mutations.logInOut).to.be.calledOnce;
  });
});
