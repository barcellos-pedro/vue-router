<template>
  <h1>Events for Good</h1>
  <div class="query">
    <h2>{{ totalEvents }} events found</h2>
    <div v-if="totalEvents > limit">
      <label for="limit">Per page</label>
      <select v-model="limit" id="limit">
        <option value="2" :selected="limit == 2">2</option>
        <option value="5" :selected="limit == 5">5</option>
        <option value="7" :selected="limit == 7">7</option>
      </select>
    </div>
  </div>

  <div v-if="!events && !error">
    <h2>Loading events...</h2>
  </div>

  <div v-if="error">
    <h2>There was an error. Try again</h2>
  </div>

  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>

  <!-- Pagination Links -->
  <div class="pagination">
    <router-link
      v-if="page != 1"
      id="page-prev"
      rel="prev"
      :to="{ name: 'EventList', query: { page: page - 1 } }"
      >&#60; Previous</router-link
    >

    <router-link
      v-if="page != 1"
      rel="prev"
      :to="{ name: 'EventList', query: { page: page - 1 } }"
      >{{ page - 1 }}</router-link
    >

    <router-link
      id="current-page"
      :to="{
        name: 'EventList',
        query: {
          page: page
        }
      }"
      >{{ page }}</router-link
    >

    <router-link
      v-if="hasNextPage"
      rel="next"
      :to="{ name: 'EventList', query: { page: page + 1 } }"
      >{{ page + 1 }}</router-link
    >

    <router-link
      v-if="hasNextPage"
      id="page-next"
      rel="next"
      :to="{ name: 'EventList', query: { page: page + 1 } }"
      >Next &#62;</router-link
    >
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import NProgress from 'nprogress'
// import { watchEffect } from 'vue'

export default {
  name: 'EventList',
  props: ['page'],
  components: {
    EventCard
  },
  data: () => ({
    events: null,
    totalEvents: 0,
    limit: 2,
    error: ''
  }),
  /**
   * [Before In-Component Route Guard]
   * Runs only once the component is loaded, but not when reused (route change)
   * In this case to achieve pagination we use #watchEffect
   */
  // created() {
  //   // Workaround for created()
  //   // Runs every time page or limit changes
  //   watchEffect(async () => {
  //     try {
  //       this.events = null
  //       const response = await EventService.getEvents(this.limit, this.page)
  //       this.events = response.data
  //       this.totalEvents = response.headers['x-total-count']
  //     } catch (err) {
  //       this.error = err
  //       this.$router.push({ name: 'NetworkError' })
  //     }
  //   })
  // },
  /** API call to In-Component Route Guard
   *
   *  There are 3: beforeRouteEnter, beforeRouteUpdate and beforeRouteLeave
   *
   * Called before component is created and
   * when entered from a different route
   */
  async beforeRouteEnter(routeTo, routeFrom, next) {
    try {
      NProgress.start()
      const page = +routeTo.query.page || 1
      const response = await EventService.getEvents(2, page)
      // next to access component instance
      next(component => {
        component.events = response.data
        component.totalEvents = response.headers['x-total-count']
      })
    } catch (err) {
      // if there's an network issue, we redirect the user
      // so we don't enter the page and don't even create the component
      next({ name: 'NetworkError' })
    } finally {
      NProgress.done()
    }
  },
  /**
   * Called when route changes, but the component still the same
   *
   * In this hook we have access to this (component instance)
   * We use this hook to ensure pagination still works
   */
  async beforeRouteUpdate(routeTo) {
    try {
      NProgress.start()
      const page = +routeTo.query.page || 1
      const response = await EventService.getEvents(2, page)
      this.events = response.data
      this.totalEvents = response.headers['x-total-count']
    } catch (err) {
      return { name: 'NetworkError' }
    } finally {
      NProgress.done()
    }
  },
  computed: {
    hasNextPage() {
      const totalPages = Math.ceil(this.totalEvents / this.limit)
      return this.page < totalPages
    }
  }
}
</script>

<style scoped>
.query {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5em;
  margin: 2em 0;
}
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 2em;
}

.pagination a {
  text-decoration: none;
  color: #2c3e50;
  padding: 0.5em 1em;
  border-radius: 4px;
  border: 1px solid #42b983;
}

.pagination a:hover {
  background-color: #42b983;
  color: white;
}

#current-page {
  background-color: #42b983;
  color: white;
}

label {
  margin-right: 1em;
}

select {
  padding: 0.5em 1em;
  border-radius: 4px;
}
</style>
