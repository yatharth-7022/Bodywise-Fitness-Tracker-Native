// config.js
import { Platform } from "react-native";
import Constants from "expo-constants";

const USE_PRODUCTION_API = false;
const USE_AWS_API = true; // Set to true to test with AWS deployment
const USE_AWS_FOR_APK = true; // Always use AWS for APK builds

const getApiUrl = () => {
  const PRODUCTION_API_URL = "https://bodywise-fitness-api.onrender.com";
  const AWS_IP = "http://3.109.58.243:5000";
  const LOCAL_IP = "192.168.29.194";

  // For APK builds, always use AWS (when not in development mode)
  if (!__DEV__) {
    console.log("APK Build - Using AWS API URL:", AWS_IP);

    return AWS_IP;
  }

  if (USE_PRODUCTION_API) {
    console.log("Using production API URL:", PRODUCTION_API_URL);
    return PRODUCTION_API_URL;
  }

  if (USE_AWS_API || USE_AWS_FOR_APK) {
    console.log("Using AWS API URL:", AWS_IP);
    return AWS_IP;
  }

  // Development mode - use local IP
  let devUrl;
  if (Platform.OS === "android") {
    if (!Platform.constants.Brand) {
      devUrl = "http://10.0.2.2:5000";
    } else {
      // Physical Android device needs your computer's network IP
      devUrl = `http://${LOCAL_IP}:5000`;
    }
  } else if (Platform.OS === "ios") {
    // iOS simulator can use localhost
    devUrl = "http://127.0.0.1:5000";
  } else {
    devUrl = `http://${LOCAL_IP}:5000`;
  }

  console.log("Using development API URL:", devUrl);
  return devUrl;
};

export default {
  API_URL:
    process.env.API_URL || Constants.expoConfig?.extra?.apiUrl || getApiUrl(),
  API_TIMEOUT:
    process.env.API_TIMEOUT ||
    Constants.expoConfig?.extra?.apiTimeout ||
    "60000",
};
