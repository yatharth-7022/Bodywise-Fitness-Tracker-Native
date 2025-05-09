import { useQuery } from "@tanstack/react-query";
import api from "../interceptor";
import { DEFAULT_ROUTINE, ROUTINE_BY_ID } from "../api";
import { useState } from "react";
import { DefaultRoutine, Routine } from "../types/dashboard";

// Define types needed for this hook

export const useDashboard = () => {
  // Using useState to track active route instead of useLocation/useParams from react-router
  const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(
    null
  );

  const { data: defaultRoutines } = useQuery<DefaultRoutine[]>({
    queryKey: ["default-routines"],
    queryFn: async () => {
      const response = await api.get(
        `${DEFAULT_ROUTINE}?includeExercises=false`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });

  const { data: routineById, isLoading: isRoutineLoading } = useQuery<Routine>({
    queryKey: ["routine-by-id", selectedRoutineId],
    queryFn: async () => {
      const response = await api.get(
        `${ROUTINE_BY_ID}${selectedRoutineId}?includeExercises=true`
      );
      return response.data;
    },
    enabled: !!selectedRoutineId,
    refetchOnWindowFocus: false,
  });

  return {
    defaultRoutines,
    routineById,
    isRoutineLoading,
    setSelectedRoutineId,
  };
};
