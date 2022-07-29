import { createRouter, createWebHistory } from 'vue-router'

import EventList from '../views/EventList.vue'
import CreateEvent from '../views/CreateEvent.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'

import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    // Sends to the component the page prop equals to query param or default to 1
    props: route => ({ page: +route.query.page || 1 })
  },
  {
    path: '/event/create',
    name: 'EventCreate',
    component: CreateEvent
  },
  {
    path: '/about-us',
    name: 'About',
    component: About
    // alias: '/about'
  },
  /**
   * We can redirect the route in 2 ways
   * with alias (example above)
   * or
   * redirect, better for SEO (example below)
   */
  {
    path: '/about',
    redirect: { name: 'About' }
  },
  {
    path: '/event/:id',
    // passing an function to grab the route props like: params or query
    // redirect: to => {
    //   return { name: 'EventDetails', params: { id: to.params.id } }
    // },

    /**
     * In this case and for the children
     * we dont need the param {id}
     * because its the same param name
     * It will be passed through automatically
     */
    redirect: { name: 'EventDetails' },
    /** redirecting children routes */
    children: [
      { path: 'register', redirect: () => ({ name: 'EventRegister' }) },
      { path: 'edit', redirect: { name: 'EventEdit' } }
    ]
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true, // pass {id} as component props
    component: EventLayout,
    children: [
      {
        path: '', // same path as the parent
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit
      }
    ]
  },
  // Any page that doesn't exist
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  // Resource that doesn't exist. e.g: /events/jalksdj
  // we use programmatically
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  // Network error, like API call
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
