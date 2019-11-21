import Vue from 'vue';
import Router from 'vue-router';
import auth from '../services/auth/authService';

Vue.use(Router);

function lazyLoad(view)  {
  return () => import(`@/pages/${view}.vue`);
}

const routes = [
  {
    path: '/',
    name: "StartPage",
    component: lazyLoad("StartPage")
  },
  { 
    path: "/food", 
    name: "FoodPage",
    component: lazyLoad("FoodPage") 
  },
  { 
    path: '/contact', 
    name: "ContactPage",
    component: lazyLoad("ContactPage") 
  },
  { 
    path: '/recipes', 
    name: "RecipePage",
    component: lazyLoad("RecipePage") 
  },
  { 
    path: '/profile',
    name: "ProfilePage", 
    component: lazyLoad("ProfilePage") 
  },
  { 
    path: '/dashboard',
    name: "DashBoardPage", 
    component: lazyLoad("DashboardPage") 
  },
  { 
    path: '/callback', 
    name: "Callback",
    component: lazyLoad("CallBack") 
  }
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