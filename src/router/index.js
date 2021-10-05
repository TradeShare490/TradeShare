import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../pages/SignUp/App.vue'
import Login from '../pages/Login/App.vue'
import BrokerageSignUp from '../pages/BrokerageSignUp/App.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path:'/brokerage-signup',
    name: 'BrokerageSignUp',
    component: BrokerageSignUp
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
