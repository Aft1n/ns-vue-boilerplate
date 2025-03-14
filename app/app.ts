import { ApplicationSettings, CoreTypes } from "@nativescript/core";
import App from "./App.vue";
import { router } from "./router";

import { createApp, registerElement } from "nativescript-vue";

import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import localStorage from "@nativescript-use/nativescript-localstorage";
import { TouchManager } from "@nativescript/core";

const pinia = createPinia();
pinia.use(
  createPersistedState({
    storage: localStorage,
  })
);

TouchManager.enableGlobalTapAnimations = true;
TouchManager.animations = {
  down: {
    scale: { x: 0.95, y: 0.95 },
    duration: 200,
    curve: CoreTypes.AnimationCurve.easeInOut,
  },
  up: {
    scale: { x: 1, y: 1 },
    duration: 200,
    curve: CoreTypes.AnimationCurve.easeInOut,
  },
};

createApp(App).use(router).use(pinia).start();
