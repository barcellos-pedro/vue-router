import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
// instead of using Pinia
// here we are using an reactive object for simple case
import globalStore from './store'

createApp(App)
  .use(router)
  // make available for all components to use (inject)
  .provide('globalStore', globalStore)
  .mount('#app')
