import { createRouter, createWebHistory } from 'vue-router'

import EventList from '../views/EventList.vue'
import EventDetails from '../views/EventDetails.vue'
import CreateEvent from '../views/CreateEvent.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: +route.query.page || 1 })
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    props: true,
    component: EventDetails
  },
  {
    path: '/event/create',
    name: 'EventCreate',
    component: CreateEvent
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
