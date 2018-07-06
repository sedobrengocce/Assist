/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Team from '@/components/Team';
/* eslint-enable no-unused-vars */

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/team/:tid',
      name: 'Team',
      component: Team,
    },
  ],
});
