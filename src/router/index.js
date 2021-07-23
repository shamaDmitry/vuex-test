import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Pages/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/history',
    name: 'History',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Pages/History.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dynamic-history',
    name: 'DynamicHistory',
    component: () => import('../views/Pages/DynamicHistory.vue'),
    meta: {
      requiresAuth: true
    }
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
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
