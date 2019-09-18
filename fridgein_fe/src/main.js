import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import './../node_modules/jquery/dist/jquery.min.js';
import VueRouter from 'vue-router';
import store from './store';
import AuthPlugin from './auth/auth.js';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'

import NavigationBar from "./components/layout/NavigationBar";
import BottomBar from "./components/layout/BottomBar";
import FoodPage from "./pages/FoodPage";
import ContactPage from "./pages/ContactPage";
import RecipePage from "./pages/RecipePage";
import StartPage from "./pages/StartPage";
import CallBack from './components/CallBack';
import './registerServiceWorker'

Vue.config.devtools = true;

library.add(faUserSecret);
library.add(faFontAwesome);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(AuthPlugin);
Vue.use(VueRouter);

Vue.component('navigationBar', NavigationBar);
Vue.component('bottomBar', BottomBar);

const routes = [
  {path: '/', component: StartPage},
  {path: '/food', component: FoodPage},
  {path: '/contact', component: ContactPage},
  {path: '/recipes', component: RecipePage},
  {path: '/callback', component: CallBack}
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
