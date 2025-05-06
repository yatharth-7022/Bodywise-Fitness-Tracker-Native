// src/navigation/index.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "./routes";
import { RootStackParamList } from "../types/navigation";

// Screens
import { Home } from "../screens/Home/Home";
import { PreSignUp } from "../screens/Auth/PreSignUp";
import SignUp from "../screens/Auth/SignUp";
import Login from "../screens/Auth/Login";
import { LogWeight } from "../screens/Log-Weight/LogWeight";
import { Settings } from "../screens/Settings/Settings";

import { MainTabNavigator } from "./MainTabNavigator";

import RoutineSession from "../components/Routine/RoutineSession";
import { AllWeights } from "../components/Log-Weights/AllWeights";
import Routine from "../components/Routine/Routine";
import { TimerPage } from "../screens/Timer/TimerPage";
import UploadProfile from "../components/Upload-Profile/UploadProfile";

// Import navigators
import { AuthNavigator } from "./AuthNavigator";
import { WorkoutNavigator } from "./WorkoutNavigator";
import { ProfileNavigator } from "./ProfileNavigator";
import { WeightNavigator } from "./WeightNavigator";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        // Auth Navigator - use literal "Auth" instead of ROUTES.AUTH
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        // Main App Navigators - use literal strings that match TypeScript types
        <>
          <Stack.Screen name="MainTabs" component={MainTabNavigator} />
          <Stack.Screen name="WorkoutStack" component={WorkoutNavigator} />
          <Stack.Screen name="ProfileStack" component={ProfileNavigator} />
          <Stack.Screen name="WeightStack" component={WeightNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
}
