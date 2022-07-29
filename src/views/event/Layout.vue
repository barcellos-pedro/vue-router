<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <!-- In these router-links we dont need the {id} param 
      since this component route (layout) already requires an {id} -->
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <!-- Load all chidren routes sending the prop event -->
    <router-view :event="event" />
  </div>
</template>

<script>
import EventService from '@/services/EventService.js'

export default {
  props: ['id'],
  data: () => ({
    event: null
  }),
  methods: {
    handleError(error) {
      if (error.response || error.response.status == 404) {
        this.$router.push({
          name: '404Resource',
          params: { resource: 'event' }
        })
      } else {
        this.$router.push({ name: 'NetworkError' })
      }
    }
  },
  async created() {
    try {
      const { data } = await EventService.getEvent(this.id)
      this.event = data
    } catch (error) {
      console.log(error)
      this.handleError(error)
    }
  }
}
</script>
