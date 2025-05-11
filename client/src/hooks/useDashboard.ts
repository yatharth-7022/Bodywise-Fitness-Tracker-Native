import { useQuery } from "@tanstack/react-query";
import api from "../interceptor";
import { DEFAULT_ROUTINE, ROUTINE_BY_ID } from "../api";
import { useState } from "react";
import { DefaultRoutine, Routine } from "../types/dashboard";
import { useRoute, RouteProp } from "@react-navigation/native";

type RouteParams = {
  id?: string;
};

export const useDashboard = () => {
  const [selectedRoutineId, setSelectedRoutineId] = useState<string | null>(null);
  
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const id = route.params?.id;
  
  const routineId = id || selectedRoutineId;

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
    queryKey: ["routine-by-id", routineId],
    queryFn: async () => {
      const response = await api.get(
        `${ROUTINE_BY_ID}${routineId}?includeExercises=true`
      );
      return response.data;
    },
    enabled: !!routineId,
    refetchOnWindowFocus: false,
  });

  return {
    defaultRoutines,
    routineById,
    isRoutineLoading,
    setSelectedRoutineId,
  };
};
