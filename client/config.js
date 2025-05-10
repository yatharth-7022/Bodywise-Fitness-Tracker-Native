// config.js
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// TOGGLE THIS to override development mode and use production API
// Set to true to force using production API even during development
const USE_PRODUCTION_API = false;

// Get the API URL based on the platform and environment
const getApiUrl = () => {
  // Your deployed API URL
  const PRODUCTION_API_URL = 'https://bodywise-fitness-api.onrender.com';
  
  // For local development with USB-connected device
  // Run `hostname -I | awk '{print $1}'` to get your actual IP
  const LOCAL_IP = '192.168.29.194'; // Replace this with your actual IP address
  
  // If USE_PRODUCTION_API is true, always use production API regardless of environment
  if (USE_PRODUCTION_API) {
    return PRODUCTION_API_URL;
  }
  
  if (__DEV__) {
    // In development
    if (Platform.OS === 'android') {
      // Android emulator
      if (Platform.constants.Release === null) {
        return 'http://10.0.2.2:5000'; // Special IP for Android emulator to reach host
      }
      
      // USB connected device
      return `http://${LOCAL_IP}:5000`;
    } else if (Platform.OS === 'ios') {
      // iOS simulator
      return 'http://127.0.0.1:5000';
    }
  }
  
  // Production mode - use the deployed API
  return PRODUCTION_API_URL;
};

export default {
  API_URL: process.env.API_URL || getApiUrl(),
  API_TIMEOUT: process.env.API_TIMEOUT || '30000',
};