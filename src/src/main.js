import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

// Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#assist',
  router,
  store,
  components: { App },
  template: '<App/>',
});

Vue.config.devtools = true;
