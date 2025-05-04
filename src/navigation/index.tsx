// src/navigation/index.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "./routes";

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

const Stack = createStackNavigator();

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        // Auth screens
        <>
          <Stack.Screen name={ROUTES.HOME} component={Home} />
          <Stack.Screen name={ROUTES.PRESIGNUP} component={PreSignUp} />
          <Stack.Screen name={ROUTES.SIGNUP} component={SignUp} />
          <Stack.Screen name={ROUTES.LOGIN} component={Login} />
        </>
      ) : (
        // Main app screens
        <>
          <Stack.Screen name="MainApp" component={MainTabNavigator} />
          <Stack.Screen name={ROUTES.LOG_WEIGHT} component={LogWeight} />
          <Stack.Screen name={ROUTES.WEIGHTS} component={AllWeights} />
          <Stack.Screen name={ROUTES.ROUTINE} component={Routine} />
          <Stack.Screen
            name={ROUTES.ROUTINE_SESSION}
            component={RoutineSession}
          />
          <Stack.Screen name={ROUTES.SETTINGS} component={Settings} />
          <Stack.Screen
            name={ROUTES.UPLOAD_PROFILE_PICTURE}
            component={UploadProfile}
          />
          <Stack.Screen name={ROUTES.TIMER} component={TimerPage} />
        </>
      )}
    </Stack.Navigator>
  );
}
