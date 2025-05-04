// src/hooks/useAuth.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { LOGIN, LOGOUT, SIGNUP } from "../api";
import { ROUTES } from "../navigation/routes";
import api from "../interceptor";
import { API_CONFIG } from "../api";
import { LoginData, SignupData } from "../types/auth";

// Define types inline for now

export const useAuth = () => {
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginData>>({});

  // Check authentication status on hook mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const signUpMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignupData) => {
      const response = await api.post(SIGNUP, data);
      return response.data;
    },
    onSuccess: async (data) => {
      await AsyncStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate(ROUTES.UPLOAD_PROFILE_PICTURE as never);
    },
    onError: (error: Error) => {
      Alert.alert("Error", error.message);
      console.error(error);
    },
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginData) => {
      const response = await api.post(LOGIN, data);
      return response.data;
    },
    onSuccess: async (data) => {
      await AsyncStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      Alert.alert("Success", "Logged in successfully!");
      navigation.navigate(ROUTES.DASHBOARD as never);
    },
    onError: (error: Error) => {
      Alert.alert("Error", error.message);
      console.error(error);
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await api.post(LOGOUT);
      return response.data;
    },
    onSuccess: async () => {
      await AsyncStorage.removeItem("token");
      setIsAuthenticated(false);
      Alert.alert("Success", "Logged out successfully!");
      navigation.navigate(ROUTES.LOGIN as never);
    },
    onError: (error: Error) => {
      Alert.alert("Error", error.message);
      console.error(error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const { data: profileData, refetch: refetchProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get(API_CONFIG.endpoints.auth.getProfile);
      return response.data;
    },
    enabled: isAuthenticated === true,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  const handleInputChange = (
    e: { target: { id: string; value: string } } | { id: string; value: string }
  ) => {
    // Handle both React Native and React Web style events
    const id = "target" in e ? e.target.id : e.id;
    const value = "target" in e ? e.target.value : e.value;

    setFormData({ ...formData, [id]: value });
    if (errors[id as keyof LoginData]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    // Prevent default only in web context
    if (e) e.preventDefault();

    setErrors({});
    loginMutation.mutate(formData, {
      onError: (error: Error) => {
        try {
          const errorData = JSON.parse(error.message);
          if (Array.isArray(errorData.errors)) {
            const fieldErrors: Partial<LoginData> = {};
            errorData.errors.forEach((err: { param: string; msg: string }) => {
              fieldErrors[err.param as keyof LoginData] = err.msg;
            });
            setErrors(fieldErrors);
          }
        } catch {
          setErrors({ email: error.message });
        }
      },
    });
  };

  const handleSignupSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    // Prevent default only in web context
    if (e) e.preventDefault();

    const signupData = {
      email: formData.email,
      password: formData.password,
    };

    signUpMutation.mutate(signupData as SignupData);
  };

  return {
    signUpMutation,
    isLoading: signUpMutation.isPending,
    loginMutation,
    isLoginLoading: loginMutation.isPending,
    logoutMutation,
    isLogoutLoading: logoutMutation.isPending,
    handleLogout,
    profileData,
    refetchProfile,
    handleInputChange,
    handleSubmit,
    handleSignupSubmit,
    errors,
    formData,
    isAuthenticated,
    setFormData,
  };
};
