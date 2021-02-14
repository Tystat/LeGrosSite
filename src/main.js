import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import router from './router'

// number of api request in the queue
// each time we make an request to the riot API we increase it and
// all request are delayed by 50ms*APIRequests because we can only
// make a maximum of 20 requests per seconds
export const globalAPIQueu = new Vue({
  data: {
    APIRequests: 0
  }
})

// Store the summoner name and region to be used by all the others
// components
export const summonerCredentials = new Vue({
  data: {
    summonerName: undefined,
    summonerRegion: undefined
  }
})

Vue.config.productionTip = false;

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
