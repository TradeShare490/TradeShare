import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginSignUp from '../pages/LoginSignUp/LoginSignUp.vue'
import BrokerageSignUp from '../pages/BrokerageSignUp/BrokerageSignUp.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login'
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
    path: '/news-feed',
    name: 'NewsFeed',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
  },
  {
    path: '/following',
    name: 'Following',
  },
  {
    path: '/followers',
    name: 'Followers',
  },
  {
    path: '/messages',
    name: 'Messages',
  },
  {
    path: '/preferences',
    name: 'Preferences',
  },
  {
    path: '/icons-and-images',
    name: 'IconsAndImages',
  },
  {
    path: '/support',
    name: 'Support',
  },
  {
    path:'/brokerage-signup',
    name: 'BrokerageSignUp',
    component: BrokerageSignUp
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router