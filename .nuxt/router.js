import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b3378bfc = () => interopDefault(import('../pages/chart.vue' /* webpackChunkName: "pages/chart" */))
const _263aafa0 = () => interopDefault(import('../pages/chart2.vue' /* webpackChunkName: "pages/chart2" */))
const _512114a8 = () => interopDefault(import('../pages/inputNumbers.vue' /* webpackChunkName: "pages/inputNumbers" */))
const _c114f804 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _1801f0f6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/FutureHouseholdAccountBook/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/chart",
    component: _b3378bfc,
    name: "chart"
  }, {
    path: "/chart2",
    component: _263aafa0,
    name: "chart2"
  }, {
    path: "/inputNumbers",
    component: _512114a8,
    name: "inputNumbers"
  }, {
    path: "/inspire",
    component: _c114f804,
    name: "inspire"
  }, {
    path: "/",
    component: _1801f0f6,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
