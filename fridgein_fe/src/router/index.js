import Vue from 'vue';
import VueRouter from 'vue-router';

import FoodPage from '../pages/FoodPage';
import ContactPage from "../pages/ContactPage";
import RecipePage from "../pages/RecipePage";
import StartPage from "../pages/StartPage";
import CallBack from '../components/CallBack';

Vue.use(VueRouter);

const routes = [
    {path: '/', component: StartPage},
    {path: '/food', component: FoodPage},
    {path: '/contact', component: ContactPage},
    {path: '/recipes', component: RecipePage},
    {path: '/callback', component: CallBack}
  ];
  
  export default new VueRouter({
    mode: 'history',
    routes: routes
  });