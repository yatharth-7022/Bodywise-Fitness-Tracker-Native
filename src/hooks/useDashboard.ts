import { useQuery } from "@tanstack/react-query";
import api from "../../intercerptor";
import { DEFAULT_ROUTINE, ROUTINE_BY_ID } from "@/api";
import { DASHBOARD } from "@/routes/routes";
import { useLocation, useParams } from "react-router-dom";
import { DefaultRoutine, Routine } from "@/types/dashboard";

export const useDashboard = () => {
  const location = useLocation();
  const { id } = useParams();

  const { data: defaultRoutines } = useQuery<DefaultRoutine[]>({
    queryKey: ["default-routines"],
    queryFn: async () => {
      const response = await api.get(
        `${DEFAULT_ROUTINE}?includeExercises=false`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24,
    enabled: location.pathname === DASHBOARD,
    refetchOnWindowFocus: false,
  });

  const { data: routineById, isLoading: isRoutineLoading } = useQuery<Routine>({
    queryKey: ["routine-by-id", id],
    queryFn: async () => {
      const response = await api.get(
        `${ROUTINE_BY_ID}${id}?includeExercises=true`
      );
      return response.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
  });

  return { defaultRoutines, routineById, isRoutineLoading };
};
