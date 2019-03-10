import Vue from 'vue'
import App from './App.vue'
import './../node_modules/jquery/dist/jquery.min.js';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';
import FoodItemList from "./components/FoodItemList";

Vue.config.productionTip = false;
Vue.component('foodItemList', FoodItemList);

new Vue({
  render: h => h(App),
}).$mount('#app');
