import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ALL_WEIGHTS, RECENT_WEIGHTS, WEIGHT_LOG } from "../api";
import { useState } from "react";
import api from "../interceptor";
import { Alert } from "react-native";
import { Weight } from "../types/weights";

// Define types needed for this hook

export const useWeights = () => {
  const queryClient = useQueryClient();
  const [isWeightsScreen, setIsWeightsScreen] = useState(false);
  const [isLogWeightScreen, setIsLogWeightScreen] = useState(false);

  //LOG_WEIGHT LOGIC
  const [formData, setFormData] = useState({
    value: "",
    note: "",
    date: new Date(),
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addWeight({
      ...formData,
      value: Number(formData.value),
    });
    setFormData({
      value: "",
      note: "",
      date: new Date(),
    });
  };

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const { data: allWeights, isLoading: isLoadingAll } = useQuery({
    queryKey: ["weights"],
    queryFn: async () => {
      const response = await api.get(ALL_WEIGHTS);
      return response.data;
    },
  });

  const { data: recentWeights, isLoading: isLoadingRecent } = useQuery({
    queryKey: ["recent-weights"],
    queryFn: async () => {
      const response = await api.get(RECENT_WEIGHTS);
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: addWeight, isPending: isAdding } = useMutation({
    mutationFn: async (weight: Weight) => {
      const response = await api.post(WEIGHT_LOG, weight);
      return response.data;
    },
    onSuccess: () => {
      Alert.alert("Success", "Weight added successfully");
      queryClient.invalidateQueries({ queryKey: ["weights"] });
      queryClient.invalidateQueries({ queryKey: ["recent-weights"] });
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to add weight");
      console.error("Error logging weight:", error);
    },
  });

  return {
    allWeights,
    recentWeights,
    addWeight,
    isLoadingAll,
    isLoadingRecent,
    isAdding,
    handleSubmit,
    handleInputChange,
    formData,
    setIsWeightsScreen,
    setIsLogWeightScreen,
  };
};
