import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "./routes";
import { WeightStackParamList } from "../types/navigation";

import { LogWeight } from "../screens/Log-Weight/LogWeight";
import { AllWeights } from "../components/Log-Weights/AllWeights";

const Stack = createStackNavigator<WeightStackParamList>();

export function WeightNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LogWeight" component={LogWeight} />
      <Stack.Screen name="Weights" component={AllWeights} />
    </Stack.Navigator>
  );
}
