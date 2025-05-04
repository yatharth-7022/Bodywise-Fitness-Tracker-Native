import { LOGIN, LOGOUT, SIGNUP } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DASHBOARD, UPLOAD_PROFILE_PICTURE } from "@/routes/routes";
import { LoginData, SignupData } from "@/types/auth";
import api from "../../intercerptor";
import { LOGIN as LOGIN_ROUTE } from "@/routes/routes";
import { API_CONFIG } from "@/api";
import { useState } from "react";

export const useAuth = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginData>>({});

  const signUpMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignupData) => {
      const response = await api.post(SIGNUP, data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Account created successfully!");
      navigate(UPLOAD_PROFILE_PICTURE);
    },
    onError: (error: Error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginData) => {
      const response = await api.post(LOGIN, data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Logged in successfully!");
      navigate(DASHBOARD);
    },
    onError: (error: Error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      const response = await api.post(LOGOUT);
      return response.data;
    },
    onSuccess: () => {
      localStorage.removeItem("token");
      toast.success("Logged out successfully!");
      navigate(LOGIN_ROUTE);
    },
    onError: (error: Error) => {
      toast.error(error.message);
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
    enabled: !!localStorage.getItem("token"),
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    if (errors[id as keyof LoginData]) {
      setErrors({ ...errors, [id]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    errors,
    formData,
  };
};
