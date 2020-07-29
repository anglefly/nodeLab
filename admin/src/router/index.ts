import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import ResourceCrud from '../views/ResourceCrud.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { name: 'home', path: '/home', component: Home },
      { name: 'courses-crud', path: '/:resource/list', component: ResourceCrud, props: true },
      // { name: 'coursesEdit', path: '/courses/edit/:id', component: CoursesEdit, props: true },
      // { name: 'coursesCreate', path: '/courses/create', component: CoursesEdit, },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
