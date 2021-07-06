import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Pages/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Pages/Home.vue')
  },
  {
    path: '/history',
    name: 'History',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Pages/History.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
