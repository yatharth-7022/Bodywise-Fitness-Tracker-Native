// app.config.js

export default {
  name: "workout-tracker-native",
  slug: "workout-tracker-native",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "dark",
  splash: {
    resizeMode: "contain",
    backgroundColor: "#0D1B2A",
  },
  assetBundlePatterns: ["**/*"],
  plugins: ["expo-font"],

  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#0D1B2A",
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
