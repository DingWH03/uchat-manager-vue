import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../HomeView.vue'
import OnlineUsers from '../OnlineUsers.vue'
import AllUsers from '../AllUsers.vue'
import Login from '@/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'home',
      component: HomeView
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/online-users',
      name: 'online-users',
      component: OnlineUsers
    },
    {
      path: '/all-users',
      name: 'all-users',
      component: AllUsers
    }
  ]
})

export default router