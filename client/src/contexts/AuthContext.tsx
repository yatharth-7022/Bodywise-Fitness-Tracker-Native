// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";
import api from "../interceptor";
import { API_CONFIG, LOGIN, LOGOUT, SIGNUP } from "../api";
import { LoginData, SignupData } from "../types/auth";
import { LoadingScreen } from "../screens/LoadingScreen";
import { AlertDialog, Button, YStack, XStack } from "tamagui";
import Toast from "react-native-toast-message";

type AuthContextType = {
  isAuthenticated: boolean | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  user: any;
  formData: LoginData;
  toastState: boolean;
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
  const [toastState, setToastState] = useState(false);

  const [errors, setErrors] = useState<Partial<LoginData>>({});

  // Alert dialog states
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorTitle, setErrorTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  // Show error with animated dialog
  const showError = (title: string, message: string) => {
    setErrorTitle(title);
    setErrorMessage(message);
    setShowErrorAlert(true);
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

      if (response.status === 200) {
        // Show success toast
        setTimeout(() => {
          Toast.show({
            type: "success",
            text1: "Success!",
            text2: "Logged in successfully!",
            visibilityTime: 2000,
            topOffset: 50,
          });
        }, 300);
      } else {
      }
    } catch (error: any) {
      setTimeout(() => {
        Toast.show({
          type: "error",
          text1: "Error!",
          text2: "Unable to login. Please try again later.",
          visibilityTime: 2000,
          topOffset: 50,
        });
      }, 300);
      // Make absolutely sure loading state is reset
      setIsLoading(false);

      // Try to show a toast even on error
      setTimeout(() => {
        Toast.show({
          type: "error",
          text1: "Error!",
          text2: "Login failed. Please try again.",
          visibilityTime: 2000,
          topOffset: 50,
        });
      }, 300);

      if (error.response) {
        // Server responded with an error status
        if (error.response.status === 401) {
          setErrors({ password: "Invalid email or password" });
          showError(
            "Login Failed",
            "Invalid email or password. Please try again."
          );
        } else if (error.response.data && error.response.data.message) {
          showError("Login Failed", error.response.data.message);
        } else {
          showError("Login Failed", "Unable to login. Please try again later.");
        }
      } else if (error.request) {
        // Request was made but no response received (network issue)
        showError(
          "Network Error",
          "Unable to connect to the server. Please check your internet connection."
        );
      } else {
        // Something else happened while setting up the request
        showError(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
      }

      // Re-throw the error so the component can handle it too
      throw error;
    } finally {
      setShowSuccessAlert(false);
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

      // Show success alert dialog
      setSuccessMessage("Account created successfully!");
      setShowSuccessAlert(true);
    } catch (error: any) {
      console.error("Signup error:", error);
      // Handle different types of errors
      if (error.response) {
        // Server responded with an error status
        if (error.response.status === 409) {
          // Email already exists
          showError(
            "Signup Failed",
            "This email address is already registered. Please use a different email or log in."
          );
        } else if (error.response.data && error.response.data.message) {
          showError("Signup Failed", error.response.data.message);
        } else {
          showError(
            "Signup Failed",
            "Unable to create account. Please try again later."
          );
        }
      } else if (error.request) {
        // Request was made but no response received (network issue)
        showError(
          "Network Error",
          "Unable to connect to the server. Please check your internet connection."
        );
      } else {
        // Something else happened while setting up the request
        showError(
          "Error",
          "An unexpected error occurred. Please try again later."
        );
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
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Logged out successfully!",
        visibilityTime: 2000,
        topOffset: 50,
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      await AsyncStorage.removeItem("token");
      setIsAuthenticated(false);
      setUser(null);
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
    toastState,
    setFormData,
    errors,
    handleInputChange,
  };

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

      {/* Error Alert Dialog with Animation
      <AlertDialog open={showErrorAlert} onOpenChange={setShowErrorAlert}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <AlertDialog.Content
            bordered
            elevate
            key="content"
            animation={[
              "quick",
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            x={0}
            scale={1}
            opacity={1}
            y={0}
          >
            <YStack gap="$4">
              <AlertDialog.Title>{errorTitle}</AlertDialog.Title>
              <AlertDialog.Description>{errorMessage}</AlertDialog.Description>
              <XStack gap="$3" justifyContent="flex-end">
                <AlertDialog.Action asChild>
                  <Button
                    theme="accent"
                    onPress={() => setShowErrorAlert(false)}
                  >
                    OK
                  </Button>
                </AlertDialog.Action>
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog> */}
    </>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
