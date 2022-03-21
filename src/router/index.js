import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginSignUp from '../pages/LoginSignUp/LoginSignUp.vue'
import BrokerageSignUp from '../pages/BrokerageSignUp/BrokerageSignUp.vue'
import Dashboard from '../pages/Dashboard/Dashboard.vue'
import Followers from '../pages/Followers/Followers.vue'
import Following from '../pages/Following/Following.vue'
import OtherDashboard from '../pages/OtherDashboard/OtherDashboard.vue'
import TradeZone from '../pages/TradeZone/TradeZone.vue'
import Messages from '../pages/Messages/Messages.vue'
import Confirm from '../pages/BrokerageSignUp/Confirm'
import Post from '../pages/TradeZone/IndividualPost/Post'
import AccountPreferences from '../pages/Preferences/Account'
import NotificationsPreferences from '../pages/Preferences/Notifications'
import PrivacySecurityPreferences from '../pages/Preferences/PrivacySecurity'
import DLRPreferences from '../pages/Preferences/DLR'
import ConnectedApps from '../pages/ConnectedApps/ConnectedApps.vue'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'
import Support from '../pages/Support/Support'
import SearchResults from '../pages/SearchResults/SearchResults'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/tradezone'
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
    path: '/tradezone',
    name: 'TradeZone',
    component: TradeZone
  },
  {
    path: '/dashboard/:id',
    name: 'OtherDashboard',
    component: OtherDashboard
  },
  {
    path: '/tradezone/:username/:postID',
    name: 'IndividualPost',
    component: Post
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/following',
    name: 'Following',
    component: Following
  },
  {
    path: '/followers',
    name: 'Followers',
    component: Followers
  },
  {
    path: '/messages/:id',
    name: 'Messages',
    props: true,
    component: Messages
  },
  {
    path: '/preferences/account',
    name: 'AccountPreferences',
    component: AccountPreferences
  },
  {
    path: '/preferences/notifications',
    name: 'NotificationsPreferences',
    component: NotificationsPreferences
  },
  {
    path: '/preferences/privacysecurity',
    name: 'PrivacySecurityPreferences',
    component: PrivacySecurityPreferences
  },
  {
    path: '/preferences/dlr',
    name: 'DLRPreferences',
    component: DLRPreferences
  },
  {
    path: '/connected-apps',
    name: 'ConnectedApps',
    component: ConnectedApps
  },
  {
    path: '/support',
    name: 'Support',
    component: Support
  },
  {
    path: '/brokerage-signup',
    name: 'BrokerageSignUp',
    component: BrokerageSignUp
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: Confirm
  },
  {
    path: '/forgotpassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/search/keyword=:keyword',
    name: 'SearchResults',
    component: SearchResults
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login', '/signup']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }
  next()
})

export default router
