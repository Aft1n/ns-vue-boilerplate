const webpack = require("@nativescript/webpack");
const VueRouterPlugin = require("unplugin-vue-router/webpack");
const AutoImport = require("unplugin-auto-import/webpack").default;

module.exports = (env) => {
  webpack.init(env);

  webpack.mergeWebpack({
    plugins: [
      VueRouterPlugin({
        dts: "./types/typed-router.d.ts",
        routesFolder: "./app/pages",
        importMode: "sync",
        extensions: [".vue"],
      }),
      AutoImport({
        include: [
          /\.vue$/,
          /\.vue\?vue/,
          /\.[tj]s$/,
          /\.jsx$/,
          /\.tsx$/,
          /\.js$/,
          /\.ts$/,
        ],
        imports: [
          {
            "router-vue-native": ["useRouter", "useRoute"],
            "nativescript-vue": [
              "ref",
              "computed",
              "onMounted",
              "onUnmounted",
              "onShow",
              "watch",
              "watchEffect",
              "registerElement",
              "createApp",
              ["default", "NativeScriptVue"],
            ],
            "@nativescript/core": [
              "Frame",
              "Page",
              "GridLayout",
              "StackLayout",
              "AbsoluteLayout",
              "FlexboxLayout",
              "WrapLayout",
              "ScrollView",
              "Label",
              "TextField",
              "Button",
              "Image",
              "Switch",
              "Slider",
              "Progress",
              "ActivityIndicator",
              "TabView",
              "TabViewItem",
              "$navigateTo",
              // "$navigateBack",
              "$getRootFrame",
              "$getActivePage",
              "Color",
              "CssProperty",
              "Style",
              "StyleScope",
            ],
            "@better-fetch/fetch": ["betterFetch"],
          },
        ],
        dirs: [
          "./app/composables/**",
          "./app/utils/**",
          "./app/store/**",
          "./app/components/**",
          "./app/types/**",
        ],
        dts: "./types/auto-imports.d.ts",
        vueTemplate: true,
        injectAtEnd: true,
      }),
    ],
  });

  return webpack.resolveConfig();
};
