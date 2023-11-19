import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store/store";
import { IS_USER_AUTHENTICATED_GETTER } from "@/store/constants";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/about-me",
    name: "About Me",
    component: () => import("../views/AboutMe.vue"),
  },
  {
    path: "/week-planner",
    name: "Week Planner",
    component: () => import("../views/WeekPlanner.vue"),
    meta: { auth: true },
  },
  {
    path: "/break-notifier",
    name: "Break Notifier",
    component: () => import("../views/BreakNotifier.vue"),
    meta: { auth: true },
  },
  {
    path: "/rough-pad",
    name: "Rough Pad",
    component: () => import("../views/RoughPad.vue"),
    meta: { auth: true },
  },
  {
    path: "/exercise-scheduler",
    name: "Exercise Scheduler",
    component: () => import("../views/ExerciseScheduler.vue"),
    meta: { auth: true },
  },
  {
    path: "/relax",
    name: "Relax",
    component: () => import("../views/Relax.vue"),
    meta: { auth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode: 'hash'
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]) {
    next("/login");
  } else {
    next();
  }
});

export default router;
