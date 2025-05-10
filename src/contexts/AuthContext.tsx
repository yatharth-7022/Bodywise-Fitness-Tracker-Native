// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";
import api from "../interceptor";
import { API_CONFIG, LOGIN, LOGOUT, SIGNUP } from "../api";
import { LoginData, SignupData } from "../types/auth";
import { LoadingScreen } from "../screens/LoadingScreen";

type AuthContextType = {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  user: any;
  formData: LoginData;
  setFormData: React.Dispatch<React.SetStateAction<LoginData>>;
  errors: Partial<LoginData>;
  handleInputChange: (e: { id: string; value: string }) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginData>>({});

  // Check authentication on startup
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          // Validate token
          const isValid = await validateToken();
          if (isValid) {
            setIsAuthenticated(true);
            // Fetch user profile if token is valid
            getUserProfile();
          } else {
            await AsyncStorage.removeItem("token");
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsInitialLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Validate token by making a profile request
  const validateToken = async (): Promise<boolean> => {
    try {
      const response = await api.get(API_CONFIG.endpoints.auth.getProfile);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  // Get user profile
  const getUserProfile = async () => {
    try {
      const response = await api.get(API_CONFIG.endpoints.auth.getProfile);
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Login function
  const login = async (data: LoginData): Promise<void> => {
    try {
      setIsLoading(true);
      setErrors({});
      const response = await api.post(LOGIN, data);
      await AsyncStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setUser(response.data.user);
      Alert.alert("Success", "Logged in successfully!");
    } catch (error: any) {
      // Make absolutely sure loading state is reset
      setIsLoading(false);
      
      if (error.response) {
        // Server responded with an error status
        if (error.response.status === 401) {
          setErrors({ password: "Invalid email or password" });
          Alert.alert("Login Failed", "Invalid email or password. Please try again.");
        } else if (error.response.data && error.response.data.message) {
          Alert.alert("Login Failed", error.response.data.message);
        } else {
          Alert.alert("Login Failed", "Unable to login. Please try again later.");
        }
      } else if (error.request) {
        // Request was made but no response received (network issue)
        Alert.alert("Network Error", "Unable to connect to the server. Please check your internet connection.");
      } else {
        // Something else happened while setting up the request
        Alert.alert("Error", "An unexpected error occurred. Please try again later.");
      }
      
      // Re-throw the error so the component can handle it too
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (data: SignupData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await api.post(SIGNUP, data);
      await AsyncStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      setUser(response.data.user);
      Alert.alert("Success", "Account created successfully!");
    } catch (error: any) {
      console.error("Signup error:", error);
      // Handle different types of errors
      if (error.response) {
        // Server responded with an error status
        if (error.response.status === 409) {
          // Email already exists
          Alert.alert("Signup Failed", "This email address is already registered. Please use a different email or log in.");
        } else if (error.response.data && error.response.data.message) {
          Alert.alert("Signup Failed", error.response.data.message);
        } else {
          Alert.alert("Signup Failed", "Unable to create account. Please try again later.");
        }
      } else if (error.request) {
        // Request was made but no response received (network issue)
        Alert.alert("Network Error", "Unable to connect to the server. Please check your internet connection.");
      } else {
        // Something else happened while setting up the request
        Alert.alert("Error", "An unexpected error occurred. Please try again later.");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await api.post(LOGOUT);
      await AsyncStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
      Alert.alert("Success", "Logged out successfully!");
    } catch (error: any) {
      console.error("Logout error:", error);
      // Even if the logout request fails, we should still clear local storage
      await AsyncStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
      Alert.alert("Note", "You have been logged out locally.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e: { id: string; value: string }) => {
    const { id, value } = e;
    setFormData({ ...formData, [id]: value });
    if (errors[id as keyof LoginData]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  // Show loading screen while checking authentication
  if (isInitialLoading) {
    return <LoadingScreen />;
  }

  const value = {
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    user,
    formData,
    setFormData,
    errors,
    handleInputChange,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
