import Vue from 'vue';
import VueRouter from 'vue-router';
// import { createRouter, createWebHistory } from 'vue-router'
import LoginSignUp from '../pages/LoginSignUp/LoginSignUp.vue'
import BrokerageSignUp from '../pages/BrokerageSignUp/BrokerageSignUp.vue'

Vue.use(VueRouter);

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

const router = new VueRouter({
  // history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
