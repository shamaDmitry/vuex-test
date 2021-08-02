import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Pages/Home.vue'),
  },
  {
    path: '/history',
    name: 'History',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Pages/History.vue'),
  },
  {
    path: '/dynamic-history',
    name: 'DynamicHistory',
    component: () => import('../views/Pages/DynamicHistory.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Pages/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Pages/Register.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Pages/AccountSettings.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if(authRequired && !loggedIn) {
    return next('/login');
  }

  if(!authRequired && loggedIn) {
    return next('/');
  }

  next();
});

export default router