// config.js
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Get the API URL based on the platform and environment
const getApiUrl = () => {
  // Production API URL - replace after deployment with your actual Render URL
  const PRODUCTION_API_URL = 'https://bodywise-fitness-api.onrender.com';
  
  // Get your computer's local IP address
  // You need to replace this with your actual local IP address
  const LOCAL_IP = '192.168.29.194';
  
  if (__DEV__) {
    // In development
    if (Platform.OS === 'android') {
      // Android emulator
      if (Platform.constants.Release === null) {
        return 'http://10.0.2.2:5000'; // Special IP for Android emulator to reach host
      }
      
      // USB connected device
      // This works with Expo Go when device is connected via USB
      return `http://${LOCAL_IP}:5000`;
    } else if (Platform.OS === 'ios') {
      // iOS simulator
      return 'http://127.0.0.1:5000';
    }
  }
  
  // Production fallback
  return PRODUCTION_API_URL;
};

export default {
  API_URL: process.env.API_URL || getApiUrl(),
  API_TIMEOUT: process.env.API_TIMEOUT || '30000',
};