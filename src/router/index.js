import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "root",
      redirect: "/product-list",
    },
    {
      path: "/product-list",
      name: "home",
      component: HomeView,
      meta: {
        title: "Products",
        showNavbar: true,
      },
    },
    {
      path: "/product-list/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: {
        title: "Products",
        showNavbar: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: () => import("../views/NotFoundView.vue"),
      meta: {
        title: "NOT FOUND",
        showNavbar: false,
      },
    },
  ],
});

export default router;
