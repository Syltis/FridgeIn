import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import App from './App.vue';
import './../node_modules/jquery/dist/jquery.min.js';
import router from './router/index';
import store from './store';
import AuthPlugin from './services/auth/auth';
import VueGoogleCharts from 'vue-google-charts';
import './registerServiceWorker'

import globals from './components/globals';

// Allow Vue DevTools
Vue.config.devtools = true;
// Allow Vue Performance Devtool
Vue.config.performance = true;

Vue.config.performance = process.env.NODE_ENV !== 'production';

Vue.config.productionTip = false;

globals.forEach(component => {
  Vue.component(component.name, component);
})

const opts = { }
Vue.use(Vuetify)
Vue.use(VueGoogleCharts)
Vue.use(AuthPlugin);

new Vue({
  render: h => h(App),
  store,
  router: router,
  vuetify: new Vuetify(opts)
}).$mount('#app');
