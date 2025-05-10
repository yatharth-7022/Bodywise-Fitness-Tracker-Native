// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { resolve } = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add additional resolver extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, "mjs", "cjs"];

// Ensure use of the React Native Reanimated plugin
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "react-native-reanimated": resolve(
    __dirname,
    "node_modules/react-native-reanimated"
  ),
};

module.exports = config;
