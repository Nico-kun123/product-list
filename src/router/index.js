import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Products",
        showNavbar: true,
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
      meta: {
        title: "Products",
        showNavbar: true,
      },
    },
    {
      path: "/product-details/:id",
      name: "product-details/:id",
      component: () => import("../views/ProductDetailsView.vue"),
      props: true,
      meta: {
        title: "Product Details",
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
