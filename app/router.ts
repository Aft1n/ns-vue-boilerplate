import { createRouter } from "router-vue-native";
import { routes, handleHotUpdate } from "vue-router/auto-routes";

export const router = createRouter({
  history: undefined,
  routes,
});
