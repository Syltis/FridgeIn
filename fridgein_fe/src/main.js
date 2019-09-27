import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import './../node_modules/jquery/dist/jquery.min.js';
import router from './router/index';
import store from './store';
import AuthPlugin from './services/auth/auth';
import VueGoogleCharts from 'vue-google-charts';

import NavigationBar from "./components/layout/NavigationBar";
import BottomBar from "./components/layout/BottomBar";
import './registerServiceWorker'

Vue.config.devtools = true;

Vue.config.productionTip = false;

Vue.use(VueGoogleCharts)
Vue.use(AuthPlugin);

Vue.component('navigationBar', NavigationBar);
Vue.component('bottomBar', BottomBar);

new Vue({
  render: h => h(App),
  store,
  router: router
}).$mount('#app');
