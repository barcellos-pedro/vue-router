import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'

// instead of using Pinia
// here we are using an reactive object for simple case
const globalStore = reactive({
  flashMessage: '',
  setFlashMessage(text) {
    this.flashMessage = text
  },
  clearFlashMessage() {
    this.flashMessage = ''
  }
})

createApp(App)
  .use(router)
  .provide('globalStore', globalStore) // make available for all components to use (inject)
  .mount('#app')
