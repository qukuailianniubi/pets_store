import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/index'
import Market from '@/pages/Market'
import Home from '@/pages/Home'
import MyPet from '@/pages/mypet'
import Trade from '@/pages/Trade'
import Login from '@/pages/Login'
import Admin from '@/Admin'
import Account from '@/pages/Account'
import MarketDistribution from '@/pages/MarketDistribution'
import Issues from '@/pages/Issues';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/user',
      component: Index,
      children: [
        {
          path: '/',
          component: Home
        },
        {
          path: 'market',
          component: Market
        },
        {
          path: 'mypat',
          component: MyPet
        },
        {
          path: 'trade',
          component: Trade,
        }
      ]
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: '/',
          component: Account,
          // meta: { keepAlive: true }
        },
        {
          path: 'market',
          component: MarketDistribution
        },
        {
          path: 'issues',
          component: Issues
        }
      ]
    }

  ]
})
