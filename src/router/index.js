import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Users from '@/components/users.vue'
import Rights from '@/components/rights.vue'
import Roles from '@/components/roles.vue'
import Goods from '@/components/goods.vue'
import GoodsAdd from '@/components/goodsadd.vue'
import Params from '@/components/params.vue'
import Categories from '@/components/categories.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/goodsadd',
          name: 'goodsadd',
          component: GoodsAdd
        },
        {
          path: '/users',
          name: 'users',
          component: Users
        },
        {
          path: '/rights',
          name: 'rights',
          component: Rights
        },
        {
          path: '/roles',
          name: 'roles',
          component: Roles
        },
        {
          path: '/goods',
          name: 'goods',
          component: Goods
        },
        {
          path: '/params',
          name: 'params',
          component: Params
        },
        {
          path: '/categories',
          name: 'categories',
          component: Categories
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push({
        name: 'login'
      })
      Message.warning('请先登陆')
      return
    }
  }
  next()
})
export default router
