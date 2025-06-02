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
    package: "com.bodywise.fitnessapp",
    versionCode: 1,
    permissions: [
      "INTERNET",
      "ACCESS_NETWORK_STATE",
      "CAMERA",
      "READ_EXTERNAL_STORAGE",
      "WRITE_EXTERNAL_STORAGE",
    ],
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    // These will be populated at runtime from .env
    apiUrl: "http://3.109.58.243:5000", // Force AWS URL for APK builds
    apiTimeout: "60000",
    eas: {
      projectId: "44078a40-e4a5-43d6-a6d9-2261d41b88a8",
    },
  },
};
