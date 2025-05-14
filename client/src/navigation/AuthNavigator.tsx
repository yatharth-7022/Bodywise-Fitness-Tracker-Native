import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "./routes";
import { AuthStackParamList } from "../types/navigation";

// Screens
import { PreSignUp } from "../screens/Auth/PreSignUp";
import SignUp from "../screens/Auth/SignUp";
import Login from "../screens/Auth/Login";

const Stack = createStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PreSignUp" component={PreSignUp} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
