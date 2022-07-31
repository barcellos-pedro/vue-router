import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'

import EventList from '../views/EventList.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'

import EventLayout from '../views/event/Layout.vue'
import EventDetails from '../views/event/Details.vue'
import EventRegister from '../views/event/Register.vue'
import EventEdit from '../views/event/Edit.vue'

import EventService from '@/services/EventService.js'
import globalStore from '@/store'

// Lazy loading
const CreateEvent = () =>
  import(/* webpackChunkName: "event-create" */ '../views/CreateEvent.vue')

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
    /**
     * Per-Route Guard
     *
     * We put the API call here
     * removing the responsibility from the Layout component
     */
    beforeEnter: async to => {
      try {
        const { data } = await EventService.getEvent(to.params.id)
        globalStore.event = data
      } catch (error) {
        if (error.response || error.response.status == 404) {
          return {
            name: '404Resource',
            params: { resource: 'event' }
          }
        } else {
          return { name: 'NetworkError' }
        }
      }
    },
    children: [
      {
        /**
         * first component to load if path = /events/:id
         * same path as the parent
         */
        path: '',
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
        component: EventEdit,
        /**
         * Route meta field
         *
         * If the parent had a meta field
         * all children would inherit the meta automatically
         */
        meta: { requireAuth: true }
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
  // we use programmatically
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
  /**
   * Always move the page to the top on navigation
   * and if the user goes back (<) scroll to the last position
   */
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { top: 0 }
  }
})

/**
 * Global Navigation Guards
 *
 * There are 3:
 *
 * beforeEach (before each navigation and before in-component guards)
 * beforeResolve (before each navigation, but after in-component guards)
 * afterEach (after navigation is complete)
 */

router.beforeEach((to, from) => {
  NProgress.start()

  // Example of authorization
  const notAuthorized = true
  // if current route has this metaproperty and the user is not authorized
  if (to.meta.requireAuth && notAuthorized) {
    globalStore.setFlashMessage(
      'Sorry, you are not authorized to view this page'
    )
    setTimeout(() => globalStore.clearFlashMessage(), 3000)

    /**
     * if there was a previous page (from.href), then cancel the navigation
     * if the user try to access directly from url, redirects
     */
    return from.href ? false : { name: 'EventList' }
  }
})

router.afterEach(() => NProgress.done())

export default router
