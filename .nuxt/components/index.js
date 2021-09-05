import { wrapFunctional } from './utils'

export const Number = import('../../components/Number.vue' /* webpackChunkName: "components/number" */).then(c => wrapFunctional(c.default || c))
export const NuxtLogo = import('../../components/NuxtLogo.vue' /* webpackChunkName: "components/nuxt-logo" */).then(c => wrapFunctional(c.default || c))
export const OtherNumber = import('../../components/OtherNumber.vue' /* webpackChunkName: "components/other-number" */).then(c => wrapFunctional(c.default || c))
export const PeriodSelect = import('../../components/PeriodSelect.vue' /* webpackChunkName: "components/period-select" */).then(c => wrapFunctional(c.default || c))
export const Times = import('../../components/Times.js' /* webpackChunkName: "components/times" */).then(c => wrapFunctional(c.default || c))
export const TotalMoney = import('../../components/TotalMoney.vue' /* webpackChunkName: "components/total-money" */).then(c => wrapFunctional(c.default || c))
export const Tutorial = import('../../components/Tutorial.vue' /* webpackChunkName: "components/tutorial" */).then(c => wrapFunctional(c.default || c))
export const VuetifyLogo = import('../../components/VuetifyLogo.vue' /* webpackChunkName: "components/vuetify-logo" */).then(c => wrapFunctional(c.default || c))
export const DaysjsJa = import('../../components/daysjs-ja.js' /* webpackChunkName: "components/daysjs-ja" */).then(c => wrapFunctional(c.default || c))
export const TimelyMoney = import('../../components/timelyMoney.vue' /* webpackChunkName: "components/timely-money" */).then(c => wrapFunctional(c.default || c))
