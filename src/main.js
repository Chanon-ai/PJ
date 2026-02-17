import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap-icons/font/bootstrap-icons.css'

import '@coreui/coreui/dist/css/coreui.min.css'
import './assets/theme.css'
import 'quill/dist/quill.snow.css'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from './assets/icons/icons.js'

const app = createApp(App)

app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.mount('#app')
