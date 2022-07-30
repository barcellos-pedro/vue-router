<template>
  <div class="networkError">
    <h1>Uh-Oh!</h1>
    <h3>
      It looks like you're experiencing some network issues, please take a
      breath and
    </h3>
    <button @click="goBack">try again</button>
  </div>
</template>

<script>
export default {
  methods: {
    /** Go backward in history */
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
