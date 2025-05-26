import Constants from "expo-constants";
import { Platform } from "react-native";
import Config from "../config";

const getApiBaseUrl = () => {
  const configUrl = Config.API_URL;

  return configUrl.endsWith("/") ? configUrl.slice(0, -1) : configUrl;
};

const API_CONFIG = {
  baseUrl: getApiBaseUrl(),
  timeout:
    Number(Constants.expoConfig?.extra?.apiTimeout) ||
    Number(Config.API_TIMEOUT),
  endpoints: {
    auth: {
      login: "/api/auth/login",
      signup: "/api/auth/signup",
      user: "/api/auth/user",
      refresh: "/api/auth/refresh",
      logout: "/api/auth/logout",
      uploadProfilePic: "/api/auth/upload-profile-picture",
      getProfile: "/api/auth/profile",
    },
    weight: {
      log: "/api/weight",
      recent: "/api/weight/recent-weights",
      all: "/api/weight",
    },
    routines: {
      default: "/api/routines/routines/default",
      byId: "/api/routines/routines/",
    },
    exercises: {
      all: "/api/exercises/exercises",
    },
  },
} as const;

// For debugging - remove in production
console.log("API Base URL:", API_CONFIG.baseUrl);

const buildUrl = (endpoint: string) => {
  const base = API_CONFIG.baseUrl;
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
};

export const LOGIN = buildUrl(API_CONFIG.endpoints.auth.login);
export const SIGNUP = buildUrl(API_CONFIG.endpoints.auth.signup);
export const LOGOUT = buildUrl(API_CONFIG.endpoints.auth.logout);
export const USER_INFO = buildUrl(API_CONFIG.endpoints.auth.user);
export const GET_PROFILE_PICTURE = buildUrl(
  API_CONFIG.endpoints.auth.getProfile
);
export const UPLOAD_PROFILE_PICTURE = buildUrl(
  API_CONFIG.endpoints.auth.uploadProfilePic
);
export const WEIGHT_LOG = buildUrl(API_CONFIG.endpoints.weight.log);
export const RECENT_WEIGHTS = buildUrl(API_CONFIG.endpoints.weight.recent);
export const ALL_WEIGHTS = buildUrl(API_CONFIG.endpoints.weight.all);
export const DEFAULT_ROUTINE = buildUrl(API_CONFIG.endpoints.routines.default);
export const ROUTINE_BY_ID = buildUrl(API_CONFIG.endpoints.routines.byId);
export const ALL_EXERCISES = buildUrl(API_CONFIG.endpoints.exercises.all);

export { API_CONFIG };
