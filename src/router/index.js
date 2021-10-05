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
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path:'/BrokerageSignUp',
    name: 'BrokerageSignUp',
    component: BrokerageSignUp
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
