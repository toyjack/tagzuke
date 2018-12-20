import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Settings from '@/pages/Settings'
import About from '@/pages/About'
import Display from '@/pages/Display'
import Conform from '@/pages/Conform'
import Export from '@/pages/Export'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '打開檔案',
      component: Home
    },
    {
      path: '/settings',
      name: '設定',
      component: Settings
    },
    {
      path:'/about',
      name:'關於',
      component: About
    },
    {
      path:'/display',
      name:'顯示',
      component: Display
    },
    {
      path:'/conform',
      name:'確認',
      component: Conform
    },
    {
      path:'/export',
      name:'輸出',
      component: Export
    }
  ]
})
