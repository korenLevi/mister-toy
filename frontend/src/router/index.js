import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import toyApp from '../views/toy-app.vue'
import dashboard from '../views/dashboard.vue'
import toyEdit from '../views/toy-edit.vue'
import toyDetails from '../views/toy-details.vue'
import about from '../views/about.vue'
import login from '../views/login.vue'
Vue.use(VueRouter)

const routes = [{
  
  path: '/',
  name: 'login',
  component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    // component: about
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/about.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: dashboard
  },
  {
    path: '/toy',
    name: 'toy-app',
    component: toyApp,
    //   children: [
    //   {
    //     path: 'edit/:toyId?',
    //     component: toyEdit,
    //   },
    //  ],
  },
  {
    path: '/toy/edit/:toyId?',
    component: toyEdit
  },
  {
    path: '/toy/details/:toyId?',
    component: toyDetails
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router