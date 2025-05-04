import { ROUTINE_BY_ID } from "@/api";
import { Routine } from "@/types/dashboard";
import { ExerciseSet } from "@/types/routine";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../intercerptor";

export const useRoutine = () => {
  const { id } = useParams();

  const { data: routineById, isLoading: isRoutineLoading } = useQuery<Routine>({
    queryKey: ["routine-by-id", id],
    queryFn: async () => {
      const response = await api.get(
        `${ROUTINE_BY_ID}${id}?includezExercises=true`
      );
      return response.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return { routineById, isRoutineLoading };
};
