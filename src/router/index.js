import Vue from 'vue'
import Router from 'vue-router'
import UserOrders from '@/components/orders/UserOrders'
import AdminOrders from '@/components/orders/AdminOrders'
import Login from '@/components/auth/Login'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'UserOrders',
      component: UserOrders
    },
    {
      path: '/admin',
      name: 'AdminOrders',
      component: AdminOrders,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  // check to see if route requires auth
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      // user signed in, proceed to route
      next()
    } else {
      // no user signed it, redirect to login
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
