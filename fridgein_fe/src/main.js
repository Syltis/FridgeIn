import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import './../node_modules/jquery/dist/jquery.min.js';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';
import VueRouter from 'vue-router';

import FoodItemList from "./components/ui/FoodItemList";
import NavigationBar from "./components/layout/NavigationBar";
import BottomBar from "./components/layout/BottomBar";
import FoodItemPage from "./pages/FoodItemPage";
import StartPage from "./pages/StartPage";
import StockItemList from "./components/ui/StockItemList";
import AddStockItemForm from "./components/ui/AddStockItemForm";

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.component('foodItemList', FoodItemList);
Vue.component('stockItemList', StockItemList);
Vue.component('addStockItemForm', AddStockItemForm);
Vue.component('navigationBar', NavigationBar);
Vue.component('bottomBar', BottomBar);

const routes = [
  {path: '/', component: StartPage},
  {path: '/foodItems', component: FoodItemPage}
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
