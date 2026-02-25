import { createRouter, createWebHistory } from 'vue-router'

import Research from '../views/ResearchPage.vue'
import Report from '../views/Report.vue'
import Dashboard from '../views/Dashboard.vue'
import Profile from '../views/Profile.vue'
import Notification from '../views/Notification.vue'
import AppLayout from '../components/Sidebar.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [ 
      {
        path: '',
        redirect: 'dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'research/:id?',
        name: 'Research',
        component: Research,
        props: true
      },
      {
        path: 'report',
        name: 'Report',
        component: Report
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'notification',
        name: 'Notification',
        component: Notification
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: () => import('@/views/Notification.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
