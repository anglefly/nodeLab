import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import CoursesList from '../views/courses/CoursesList.vue'
import CoursesEdit from '../views/courses/CoursesEdit.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { name: 'home', path: '/home', component: Home },
      { name: 'coursesList', path: '/coursesList', component: CoursesList },
      { name: 'coursesEdit', path: '/courses/edit/:id', component: CoursesEdit, props: true },
      { name: 'coursesCreate', path: '/courses/create', component: CoursesEdit, },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
