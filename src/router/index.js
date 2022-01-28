import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginSignUp from '../pages/LoginSignUp/LoginSignUp.vue'
import BrokerageSignUp from '../pages/BrokerageSignUp/BrokerageSignUp.vue'
import Dashboard from "../pages/Dashboard/Dashboard.vue"
import Followers from "../pages/Followers/Followers.vue"
import Following from "../pages/Following/Following.vue"
import OtherDashboard from "../pages/OtherDashboard/OtherDashboard.vue"
import TradeZone from "../pages/TradeZone/TradeZone.vue"
import Messages from "../pages/Messages/Messages.vue"
import Confirm from "../pages/BrokerageSignUp/Confirm";
import Post from "../pages/TradeZone/IndividualPost/Post"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/tradezone",
  },
  {
    path: "/signup",
    name: "SignUp",
    component: LoginSignUp,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginSignUp,
  },
  {
    path: "/tradezone",
    name: "TradeZone",
    component: TradeZone,
  },
  {
    path: "/:username/:id",
    name: "Post",
    component: Post,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: '/following',
    name: 'Following',
    component: Following,
  },
  {
    path: '/followers',
    name: 'Followers',
    component: Followers,
  },
  {
    path: "/messages",
    name: "Messages",
    component: Messages,
  },
  {
    path: "/preferences",
    name: "Preferences",
  },
  {
    path: "/connected-apps",
    name: "ConnectedApps",
  },
  {
    path: "/support",
    name: "Support",
  },
  {
    path: "/brokerage-signup",
    name: "BrokerageSignUp",
    component: BrokerageSignUp,
  },
  {
    path: "/confirm",
    name: "Confirm",
    component: Confirm,
  },
  {
    path: "/other-dashboard",
    name: "OtherDashboard",
    component: OtherDashboard
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    else {
      return { x: 0, y: 0};
    }
  }
});
router.beforeEach((to, from, next) => {
  const publicPages = ['/','/login','/signup']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn){
    return next('/login')
  }
  next()
})

export default router;
