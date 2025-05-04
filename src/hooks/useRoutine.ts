import { ROUTINE_BY_ID } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import api from "../interceptor";
import { Routine } from "../types/dashboard";

// Define types needed for this hook

export const useRoutine = () => {
  const [routineId, setRoutineId] = useState<string | null>(null);

  const { data: routineById, isLoading: isRoutineLoading } = useQuery<Routine>({
    queryKey: ["routine-by-id", routineId],
    queryFn: async () => {
      const response = await api.get(
        `${ROUTINE_BY_ID}${routineId}?includezExercises=true`
      );
      return response.data;
    },
    enabled: !!routineId,
    refetchOnWindowFocus: false,
  });

  return { routineById, isRoutineLoading, setRoutineId };
};
