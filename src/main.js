import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm'
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

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
