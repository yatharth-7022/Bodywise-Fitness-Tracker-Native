import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ROUTES } from "./routes";
import { ProfileStackParamList } from "../types/navigation";

import { Settings } from "../screens/Settings/Settings";
import UploadProfile from "../components/Upload-Profile/UploadProfile";

const Stack = createStackNavigator<ProfileStackParamList>();

export function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="UploadProfilePicture" component={UploadProfile} />
    </Stack.Navigator>
  );
}
