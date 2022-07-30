<template>
  <h1>Create your event</h1>
  <div v-if="message" role="alert" aria-relevant="all">
    <p>{{ message }}</p>
  </div>
  <form @submit.prevent="sendForm">
    <fieldset>
      <legend>Details</legend>
      <div>
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          v-model="event.title"
        />
      </div>

      <div>
        <label for="description">Description</label>
        <input
          type="text"
          id="description"
          placeholder="Description"
          v-model="event.description"
        />
      </div>

      <div>
        <label for="category">Category</label>
        <input
          type="text"
          id="category"
          placeholder="Category"
          v-model="event.category"
        />
      </div>

      <div>
        <label for="organizer">Organizer</label>
        <input
          type="text"
          id="organizer"
          placeholder="Organizer"
          v-model="event.organizer"
        />
      </div>
    </fieldset>

    <fieldset>
      <legend>Date & Time</legend>
      <div>
        <label for="location">Location</label>
        <input
          type="text"
          id="location"
          placeholder="Location"
          v-model="event.location"
        />
      </div>

      <div>
        <label for="date">Date</label>
        <input type="text" id="date" placeholder="Date" v-model="event.date" />
      </div>

      <div>
        <label for="time">Time</label>
        <input type="text" id="time" placeholder="Time" v-model="event.time" />
      </div>
    </fieldset>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { v4 as uuid } from 'uuid'
import EventService from '../services/EventService'

export default {
  /**
   * Called when route is navigated away from
   *
   * Has access to this (component instance)
   *
   * With no return value navigation continues
   * in this case we dont need the params (routeTo, routeForm, next)
   */
  beforeRouteLeave() {
    if (this.unsavedChanges) {
      const answer = window.confirm(
        'There are unsaved changes. Do you want to leave?'
      )
      // stays on the page
      if (!answer) {
        return false
      }
    }
  },
  data: () => ({
    event: {
      category: '',
      title: '',
      description: '',
      location: '',
      date: '',
      time: '',
      organizer: ''
    },
    message: '',
    unsavedChanges: false
  }),
  watch: {
    // Deep Watcher to watch event object
    event: {
      handler() {
        this.unsavedChanges = true
      },
      deep: true
    }
  },
  methods: {
    scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    /** checks if every field value is truthy */
    isFormValid() {
      return Object.values(this.event).every(field => !!field)
    },
    resetForm() {
      this.event.category = ''
      this.event.title = ''
      this.event.description = ''
      this.event.location = ''
      this.event.date = ''
      this.event.time = ''
      this.event.organizer = ''
    },
    sendForm() {
      if (!this.isFormValid()) {
        this.scrollTop()
        this.message = 'Please, fill all fields'
        return
      }

      const newEvent = {
        id: uuid(),
        ...this.event
      }

      EventService.createEvent(newEvent)
        .then(() => {
          this.resetForm()
          this.scrollTop()
          this.message = 'Event created!'

          setTimeout(() => {
            this.$router.push({
              name: 'EventList'
            })
          }, 2000)
        })
        .catch(() => {
          this.scrollTop()
          this.message = 'Error. Try again.'
        })
    }
  }
}
</script>

<style>
fieldset {
  border: 0;
}

legend {
  font-size: 24px;
}

fieldset div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2em 0;
}

label {
  margin-bottom: 0.5em;
}

input {
  border: none;
  border-bottom: 1px solid #000;
  outline: none;
  font-size: 18px;
}
</style>
