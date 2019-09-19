import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import './../node_modules/jquery/dist/jquery.min.js';
import router from './router/index';
import store from './store';
import AuthPlugin from './auth/auth.js';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'

import NavigationBar from "./components/layout/NavigationBar";
import BottomBar from "./components/layout/BottomBar";
import './registerServiceWorker'

Vue.config.devtools = true;

library.add(faUserSecret);
library.add(faFontAwesome);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(AuthPlugin);

Vue.component('navigationBar', NavigationBar);
Vue.component('bottomBar', BottomBar);

new Vue({
  render: h => h(App),
  store,
  router: router
}).$mount('#app');
