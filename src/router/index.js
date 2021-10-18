import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginSignUp from '../pages/LoginSignUp/LoginSignUp.vue'
import BrokerageSignUp from '../pages/BrokerageSignUp/BrokerageSignUp.vue'
import Dashboard from "../pages/Dashboard/Dashboard.vue"
import Followers from "../pages/Followers/Followers.vue"
import Following from "../pages/Following/Following.vue"
import NewsFeed from "../pages/NewsFeed/NewsFeed.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login",
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
    path: "/news-feed",
    name: "NewsFeed",
    component: NewsFeed,
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
  },
  {
    path: "/preferences",
    name: "Preferences",
  },
  {
    path: "/icons-and-images",
    name: "IconsAndImages",
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
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
