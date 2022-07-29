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
  methods: {
    register() {
      // Call API
      // If registered then redirect to event details
      this.$router.push({
        name: 'EventDetails'
        // In this case we dont need the {id} param
        // since this component route already requires an {id}
        // params: { id: this.event.id }
      })

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
