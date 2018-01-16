import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Settings from '@/pages/Settings'
import About from '@/pages/About'
import Display from '@/pages/Display'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path:'/about',
      name:'About',
      component: About
    },
    {
      path:'/display',
      name:'Dispaly',
      component: Display
    }
  ]
})