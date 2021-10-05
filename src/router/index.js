import { createRouter, createWebHistory } from 'vue-router'
import LoginSignUp from '../pages/LoginSignUp/LoginSignUp.vue'
import BrokerageSignUp from '../pages/BrokerageSignUp/App.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LoginSignUp
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: LoginSignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginSignUp
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
