import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4072e1a4 = () => interopDefault(import('../pages/chart.vue' /* webpackChunkName: "pages/chart" */))
const _1922fff4 = () => interopDefault(import('../pages/chart2.vue' /* webpackChunkName: "pages/chart2" */))
const _4a673700 = () => interopDefault(import('../pages/inputNumbers.vue' /* webpackChunkName: "pages/inputNumbers" */))
const _09973e2a = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _683c0488 = () => interopDefault(import('../pages/redirect.vue' /* webpackChunkName: "pages/redirect" */))
const _51644622 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _4072e1a4,
    name: "chart"
  }, {
    path: "/chart2",
    component: _1922fff4,
    name: "chart2"
  }, {
    path: "/inputNumbers",
    component: _4a673700,
    name: "inputNumbers"
  }, {
    path: "/inspire",
    component: _09973e2a,
    name: "inspire"
  }, {
    path: "/redirect",
    component: _683c0488,
    name: "redirect"
  }, {
    path: "/",
    component: _51644622,
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
