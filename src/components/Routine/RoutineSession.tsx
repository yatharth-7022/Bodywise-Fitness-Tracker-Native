// components/Routine/RoutineSession.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDashboard } from "../../hooks/useDashboard";
import SessionHeader from "./SessionHeader";
import SessionExerciseCard from "./SessionExerciseCard";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Exercise, ExerciseSet } from "../../types/routine";

// Define navigation types
type RoutineStackParamList = {
  DASHBOARD: undefined;
};

type NavigationProp = NativeStackNavigationProp<RoutineStackParamList>;
type RouteParams = {
  id: string;
  title: string;
};

// Helper function to convert dashboard Exercise type to routine Exercise type
const mapDashboardToRoutineExercise = (
  dashboardExercise: any,
  index: number
): Exercise => {
  return {
    exercise: {
      name: dashboardExercise.exercise.name,
      bodyPart: dashboardExercise.exercise.bodyPart,
      imageUrl: dashboardExercise.exercise.imageUrl,
    },
    exerciseSets: Array(dashboardExercise.sets || 3)
      .fill(0)
      .map(() => ({
        routineExerciseId: 0,
        userId: 0,
        weight: 0,
        reps: dashboardExercise.reps || 8,
        isCompleted: false,
      })),
  };
};

const RoutineSession = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const { id } = route.params as RouteParams;

  const { routineById, isRoutineLoading, setSelectedRoutineId } =
    useDashboard();

  const [exercises, setExercises] = useState<Exercise[]>([]);

  // Initialize the routine when component mounts
  useEffect(() => {
    if (id) {
      setSelectedRoutineId(id);
    }
  }, [id, setSelectedRoutineId]);

  // Update exercises when routineById changes
  useEffect(() => {
    if (routineById?.exercises) {
      // Map dashboard exercises to the routine Exercise type
      const mappedExercises = routineById.exercises.map((ex, index) =>
        mapDashboardToRoutineExercise(ex, index)
      );
      setExercises(mappedExercises);
    }
  }, [routineById]);

  const handleSetChange = (
    exerciseIdx: number,
    setIdx: number,
    field: "kg" | "reps" | "isCompleted",
    value: number | boolean
  ) => {
    setExercises((prev) =>
      prev.map((ex, exIdx) =>
        exIdx === exerciseIdx
          ? {
              ...ex,
              exerciseSets: ex.exerciseSets?.map((set, sIdx) =>
                sIdx === setIdx
                  ? { ...set, [field === "kg" ? "weight" : field]: value }
                  : set
              ),
            }
          : ex
      )
    );
  };

  const handleAddSet = (exerciseIdx: number) => {
    setExercises((prev) =>
      prev.map((ex, exIdx) =>
        exIdx === exerciseIdx
          ? {
              ...ex,
              exerciseSets: [
                ...(ex.exerciseSets || []),
                {
                  weight: 0,
                  reps: 0,
                  isCompleted: false,
                  routineExerciseId: 0,
                  userId: 0,
                },
              ],
            }
          : ex
      )
    );
  };

  const handleSubmit = () => {
    const payload = exercises.map((ex) => ({
      exerciseName: ex.exercise.name,
      sets: ex.exerciseSets,
    }));
    console.log("Submit payload:", payload);
    // ...submit logic...
  };

  if (isRoutineLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-950">
        <ActivityIndicator size="large" color="#d6fc03" />
        <Text className="text-white mt-4">Loading workout...</Text>
      </View>
    );
  }

  if (!routineById) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-950">
        <Text className="text-xl font-semibold text-white mb-2">
          Routine not found
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="py-2">
          <Text className="text-lime-400">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <SessionHeader routineName={routineById.name} />

      <ScrollView className="flex-1 px-2 py-4">
        <View className="space-y-6">
          {exercises.map((exercise, exerciseIdx) => (
            <SessionExerciseCard
              key={exerciseIdx}
              exercise={exercise}
              exerciseIdx={exerciseIdx}
              onSetChange={handleSetChange}
              onAddSet={handleAddSet}
            />
          ))}
        </View>
      </ScrollView>

      <View className="p-4 border-t border-zinc-800">
        <TouchableOpacity
          className="bg-lime-500 py-4 rounded-xl items-center"
          onPress={handleSubmit}
        >
          <Text className="text-black font-bold">Submit Session</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RoutineSession;
