import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ALL_WEIGHTS, RECENT_WEIGHTS, WEIGHT_LOG } from "@/api";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { LOG_WEIGHT, WEIGHTS } from "@/routes/routes";
import { useState } from "react";
import api from "../../intercerptor";
import { Weight } from "@/types/weights";

export const useWeights = () => {
  const queryClient = useQueryClient();
  const location = useLocation();

  //LOG_WEIGHT LOGIC
  const [formData, setFormData] = useState({
    value: "",
    note: "",
    date: new Date(),
  });

  const handleSubmit = (e: React.FormEvent) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { data: allWeights, isLoading: isLoadingAll } = useQuery({
    queryKey: ["weights"],
    queryFn: async () => {
      const response = await api.get(ALL_WEIGHTS);
      return response.data;
    },
    enabled: location.pathname === WEIGHTS,
  });

  const { data: recentWeights, isLoading: isLoadingRecent } = useQuery({
    queryKey: ["recent-weights"],
    queryFn: async () => {
      const response = await api.get(RECENT_WEIGHTS);
      return response.data;
    },
    enabled: location.pathname === LOG_WEIGHT,
    refetchOnWindowFocus: false,
  });

  const { mutate: addWeight, isPending: isAdding } = useMutation({
    mutationFn: async (weight: Weight) => {
      const response = await api.post(WEIGHT_LOG, weight);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Weight added successfully");
      queryClient.invalidateQueries({ queryKey: ["weights"] });
      queryClient.invalidateQueries({ queryKey: ["recent-weights"] });
    },
    onError: (error) => {
      toast.error("Failed to add weight");
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
  };
};
