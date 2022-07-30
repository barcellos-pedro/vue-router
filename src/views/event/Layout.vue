<template>
  <div v-if="globalStore.event">
    <h1>{{ globalStore.event.title }}</h1>
    <div id="nav">
      <!-- In these router-links we dont need the {id} param 
      since this component route (layout) already requires an {id} -->
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <!-- Load all chidren routes sending the prop event -->
    <router-view :event="globalStore.event" />
  </div>
</template>

<script>
export default {
  inject: ['globalStore']
}
</script>
