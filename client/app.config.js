// app.config.js

export default {
  name: "workout-tracker-native",
  slug: "workout-tracker-native",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  splash: {
    //    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#111111",
  },
  assetBundlePatterns: ["**/*"],
  plugins: ["expo-font"],

  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#111111",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    // These will be populated at runtime from .env
    apiUrl: null,
    apiTimeout: null,
  },
};
