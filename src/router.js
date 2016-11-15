import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: 'app' },
  { path: '/me', component: 'my-stats-entry' },
  { path: '/opponents', component: 'opponent-entry' },
  { path: '/competition', component: 'competition' },
  { path: '/calculators', component: 'calculators' }
];

const router = new VueRouter({
  routes
});

export default router;