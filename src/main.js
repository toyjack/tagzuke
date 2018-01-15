// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import App from './App'


import router from './router'
import store from './store'

import '../node_modules/vuetify/dist/vuetify.min.css'

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
