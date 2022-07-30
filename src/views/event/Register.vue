<template>
  <p>Register for the event here!</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  props: {
    event: {
      type: Object
    }
  },
  inject: ['globalStore'], // reactive object provided in main.js
  methods: {
    register() {
      this.globalStore.setFlashMessage(`Registered for ${this.event.title}!`)

      // resets flashMessage
      setTimeout(() => this.globalStore.clearFlashMessage(), 3000)

      this.$router.push({
        name: 'EventDetails'
      })

      // In this case we dont need the {id} param
      // since this component route already requires an {id}
      // this.$router.push({
      //   name: 'EventDetails',
      //   params: { id: this.event.id }
      // })

      // we can navigate with replace using the same args
      // replace wont create an history entry
      // this.$router.replace(...)

      // in other cases we can navigate like browsers buttons
      // this.$router.go(1) // forward >
      // this.$router.go(-1) // backward <
    }
  }
}
</script>
