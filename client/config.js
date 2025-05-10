// config.js
import { Platform } from 'react-native';
import Constants from 'expo-constants';

const USE_PRODUCTION_API = false;

const getApiUrl = () => {
  const PRODUCTION_API_URL = 'https://bodywise-fitness-api.onrender.com';
  
  const LOCAL_IP = '192.168.29.194';
  
  if (USE_PRODUCTION_API) {
    console.log("Using production API URL:", PRODUCTION_API_URL);
    return PRODUCTION_API_URL;
  }
  
  if (__DEV__) {
    let devUrl;
    
    if (Platform.OS === 'android') {
      if (!Platform.constants.Brand) {
        devUrl = 'http://10.0.2.2:5000';
      } else {
        // Physical Android device needs your computer's network IP
        devUrl = `http://${LOCAL_IP}:5000`;
      }
    } else if (Platform.OS === 'ios') {
      // iOS simulator can use localhost
      devUrl = 'http://127.0.0.1:5000';
    } else {
      devUrl = `http://${LOCAL_IP}:5000`;
    }
    
    console.log("Using development API URL:", devUrl);
    return devUrl;
  }
  
  // Fallback to production for any other case
  console.log("Fallback to production API URL:", PRODUCTION_API_URL);
  return PRODUCTION_API_URL;
};

export default {
  API_URL: process.env.API_URL || getApiUrl(),
  API_TIMEOUT: process.env.API_TIMEOUT || '60000', 
};