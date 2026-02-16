import { createRouter, createWebHistory } from 'vue-router'

import Research from '../views/ResearchPage.vue'
import Report from '../views/Report.vue'
import Dashboard from '../views/Dashboard.vue'

const routes = [
  {
    path: '/',
    redirect: '/Dashboard'
  },
  {
    path: '/research',
    name: 'Research',
    component: Research
  },
  {
    path: '/report',
    name: 'Report',
    component: Report
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
