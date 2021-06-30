import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import ForgotPassword from "../views/ForgotPassword";
import Write from "../views/Write";
import StoryPreview from "../views/StoryPreview";
import ViewStory from "../views/ViewStory";
import Read from "../views/Read";
import PageNotFound from "../components/PageNotFound";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { 
      title: 'Home',
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { 
      title: 'Register',
      guest: true 
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { 
      title: 'Login',
      guest: true 
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { 
      title: 'Forgot Password',
      guest: true 
    },
  },
  {
    path: "/write",
    name: "Write",
    component: Write,
    meta: { 
      title: 'Write',
      requiresAuth: true 
    },
  },
  {
    path: "/story-preview",
    name: "StoryPreview",
    component: StoryPreview,
    meta: { 
      title: 'Story Preview',
      requiresAuth: true 
    },
  },
  {
    path: "/read",
    name: "Read",
    component: Read,
    meta: { 
      title: 'Read',
      requiresAuth: true 
    },
  },
  {
    path: "/view-story/:storyid",
    name: "ViewStory",
    component: ViewStory,
    meta: { 
      title: 'Story View',
      requiresAuth: true 
    },
  },
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, _, next) => {
  document.title = `${to.meta.title} | ReadWrite`;
  next();
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
