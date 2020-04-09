import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { name: 'home', path: '/home', component: Home }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
