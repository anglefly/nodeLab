import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    // name: 'mainLayout', 当路由有子路由的时候不要定义name 否则报警告
    component: () => import('../views/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
      },
      {
        path: '/article/list',
        name: 'articleList',
        component: () => import('../views/Articles/List.vue'),
      },
      {
        path: '/article/edit/:id',
        name: 'articleEdit',
        component: () => import('../views/Articles/Edit.vue'),
        props: true,
      },
      {
        path: '/article/edit',
        name: 'articleAdd',
        component: () => import('../views/Articles/Edit.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
