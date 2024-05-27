import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("./views/Home") },
  // Rute lain yang Anda definisikan...
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("./views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
