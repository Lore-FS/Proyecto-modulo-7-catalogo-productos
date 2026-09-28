import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router/index.js'

import vuetify from './plugins/vuetify.js'
import '@mdi/font/css/materialdesignicons.css'

createApp(App).use(store).use(router).use(vuetify).mount('#app')