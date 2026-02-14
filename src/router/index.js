import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Research from '../views/ResearchPage.vue'
import Report from '../views/Report.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
