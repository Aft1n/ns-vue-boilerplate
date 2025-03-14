import { NativeScriptConfig } from "@nativescript/core";

export default {
  id: "org.nativescript.vue",
  appResourcesPath: "./App_Resources",
  android: {
    v8Flags: "--expose_gc",
    markingMode: "none",
    codeCache: true,
    suppressCallJSMethodExceptions: false,
  },
  ios: {
    discardUncaughtJsExceptions: false,
  },
  appPath: "app",
} as NativeScriptConfig;
