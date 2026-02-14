import { createRouter, createWebHistory } from 'vue-router'

import Research from '../views/ResearchPage.vue'
import Report from '../views/Report.vue'

const routes = [
 {
    path: '/',
    redirect: '/research'
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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
