import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import './../node_modules/jquery/dist/jquery.min.js';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';

import FoodItemList from "./components/FoodItemList";
import NavigationBar from "./components/NavigationBar";
import BottomBar from "./components/BottomBar";

Vue.config.productionTip = false;

Vue.component('foodItemList', FoodItemList);
Vue.component('navigationBar', NavigationBar);
Vue.component('bottomBar', BottomBar);

new Vue({
  render: h => h(App),
}).$mount('#app');
