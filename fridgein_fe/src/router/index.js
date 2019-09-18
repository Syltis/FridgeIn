import Vue from 'vue';
import Router from 'vue-router';
import auth from '../auth/authService';

import FoodPage from '../pages/FoodPage';
import ContactPage from "../pages/ContactPage";
import RecipePage from "../pages/RecipePage";
import StartPage from "../pages/StartPage";
import CallBack from '../components/CallBack';

Vue.use(Router);

const routes = [
    { path: '/', component: StartPage },
    { path: '/food', component: FoodPage },
    { path: '/contact', component: ContactPage },
    { path: '/recipes', component: RecipePage },
    { path: '/callback', component: CallBack }
  ];

  const router = new Router({
    mode: 'history',
    routes: routes
  });

  // A non-authenticated user can only access the home(/) and callback-page.
  router.beforeEach((to, from, next) => {
    if (to.path === "/" || to.path === "/callback" || auth.isAuthenticated()) {
      return next();
    }


    auth.login({ target: to.path });
  });

  export default router;