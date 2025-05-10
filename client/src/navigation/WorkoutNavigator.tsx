import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "./routes";
import { WorkoutStackParamList } from "../types/navigation";

import Routine from "../components/Routine/Routine";
import RoutineSession from "../components/Routine/RoutineSession";

const Stack = createStackNavigator<WorkoutStackParamList>();

export function WorkoutNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Routine" component={Routine} />
      <Stack.Screen name="RoutineSession" component={RoutineSession} />
    </Stack.Navigator>
  );
}
