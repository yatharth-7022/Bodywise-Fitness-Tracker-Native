import axios, { InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { API_CONFIG } from "./api";
import Config from "../config";
import { isFreeTierHosting, getServerErrorMessage } from "./utils/serverStatus";

const api = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

interface QueueItem {
  resolve: (token: string | null) => void;
  reject: (error: any) => void;
}

let isRefreshing = false;
let failedQueue: QueueItem[] = [];
let networkErrorShown = false;

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    return config;
  }
});

api.interceptors.response.use(
  (response) => response,
  async (originalError) => {
    const originalRequest = originalError.config;
    
    if (!originalError.response) {
      console.error("Network error detected:", originalError.message);
      
      if (originalError.message.includes("Network Error") || 
          originalError.message.includes("ECONNREFUSED") ||
          originalError.message.includes("connect ETIMEDOUT") ||
          originalError.message.includes("timeout")) {
        
        if (Config.API_URL.includes('https')) {
          console.error("Production API connection failed:", originalError.message);
          
          if (!networkErrorShown) {
            networkErrorShown = true;
            
            const errorMessage = getServerErrorMessage(originalError);
            
            Alert.alert(
              "Connection Error",
              errorMessage,
              [
                {
                  text: "OK",
                  onPress: () => {
                    setTimeout(() => {
                      networkErrorShown = false;
                    }, 5000);
                  }
                }
              ]
            );
          }
        } else {
          console.error("Development API connection failed:", originalError.message);
        }
      }
      
      return Promise.reject(originalError);
    }

    const url = originalRequest.url || '';
    const isAuthEndpoint = 
      url.includes(API_CONFIG.endpoints.auth.login) || 
      url.includes(API_CONFIG.endpoints.auth.signup) || 
      url.includes(API_CONFIG.endpoints.auth.refresh);
    
    if (originalError.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return api(originalRequest);
            }
            return Promise.reject(originalError);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await api.post(API_CONFIG.endpoints.auth.refresh);
        const { token: newToken } = response.data;

        await AsyncStorage.setItem("token", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        await AsyncStorage.removeItem("token");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(originalError);
  }
);

export default api;
