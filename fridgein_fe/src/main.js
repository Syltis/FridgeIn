import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import './../node_modules/jquery/dist/jquery.min.js';
import VueRouter from 'vue-router';
import store from './store';

import NavigationBar from "./components/layout/NavigationBar";
import BottomBar from "./components/layout/BottomBar";
import FoodPage from "./pages/FoodPage";
import ContactPage from "./pages/ContactPage";
import RecipePage from "./pages/RecipePage";
import StartPage from "./pages/StartPage";
import './registerServiceWorker'

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.component('navigationBar', NavigationBar);
Vue.component('bottomBar', BottomBar);

const routes = [
  {path: '/', component: StartPage},
  {path: '/food', component: FoodPage},
  {path: '/contact', component: ContactPage},
  {path: '/recipes', component: RecipePage}
];

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app');
