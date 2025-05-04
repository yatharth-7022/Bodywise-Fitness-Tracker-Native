import { ALL_EXERCISES } from "../api";
import { useQuery } from "@tanstack/react-query";
import api from "../interceptor";
import { useState } from "react";
import { ROUTES } from "../navigation/routes";
import { ExerciseCard } from "../types/exercises";

// Define types needed for this hook

export const useExercises = () => {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseCard | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isExercisesScreen, setIsExercisesScreen] = useState(false);

  const handleExerciseClick = (exercise: ExerciseCard) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const { data: allExercises, isLoading: isLoadingAllExercises } = useQuery<
    ExerciseCard[]
  >({
    queryKey: ["allExercises"],
    queryFn: async () => {
      const response = await api.get(ALL_EXERCISES);
      return response?.data;
    },
    enabled: isExercisesScreen,
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  return {
    allExercises,
    isLoadingAllExercises,
    selectedExercise,
    handleExerciseClick,
    showModal,
    activeFilter,
    setSelectedExercise,
    setShowModal,
    setActiveFilter,
    setIsExercisesScreen,
  };
};
