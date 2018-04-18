import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Settings from '@/pages/Settings'
import About from '@/pages/About'
import Display from '@/pages/Display'
import Conform from '@/pages/Conform'
import Test from '@/pages/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ファイルを開く',
      component: Home
    },
    {
      path: '/settings',
      name: '設定',
      component: Settings
    },
    {
      path:'/about',
      name:'アバウト',
      component: About
    },
    {
      path:'/display',
      name:'表示',
      component: Display
    },
    {
      path:'/conform',
      name:'確認',
      component: Conform
    },
    {
      path:'/test',
      name:'',
      component:Test
    }
  ]
})
