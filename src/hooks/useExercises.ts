import { ALL_EXERCISES } from "@/api";
import { useQuery } from "@tanstack/react-query";
import api from "../../intercerptor";
import { useLocation } from "react-router-dom";
import { EXERCISES } from "@/routes/routes";
import { useState } from "react";
import { ExerciseCard } from "@/types/exercises";

export const useExercises = () => {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseCard | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const handleExerciseClick = (exercise: ExerciseCard) => {
    setSelectedExercise(exercise);
    setShowModal(true);
  };

  const location = useLocation();
  const { data: allExercises, isLoading: isLoadingAllExercises } = useQuery<
    ExerciseCard[]
  >({
    queryKey: ["allExercises"],
    queryFn: async () => {
      const response = await api.get(ALL_EXERCISES);
      return response?.data;
    },
    enabled: location.pathname === EXERCISES,
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
  };
};
