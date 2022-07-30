import { reactive } from 'vue'

export default reactive({
  event: null,
  flashMessage: '',
  setFlashMessage(text) {
    this.flashMessage = text
  },
  clearFlashMessage() {
    this.flashMessage = ''
  }
})
