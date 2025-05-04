// config.js
import { Platform } from 'react-native';

// Get the IP address based on the platform and environment
const getApiUrl = () => {
  if (__DEV__) {
    // In development
    if (Platform.OS === 'android') {
      // When running in Android emulator
      if (Platform.constants.Release === null) {
        return 'http://10.0.2.2:5000'; // Special IP for Android emulator to reach host
      }
      // When running on physical Android device
      return 'http://192.168.1.15:5000'; // Your laptop's IP address
    } else if (Platform.OS === 'ios') {
      // iOS simulator can use localhost
      return 'http://127.0.0.1:5000';
    }
  }
  // Production fallback
  return 'http://192.168.1.15:5000'; // Your actual API URL in production
};

export default {
  API_URL: process.env.API_URL || getApiUrl(),
  API_TIMEOUT: process.env.API_TIMEOUT || '30000',
};