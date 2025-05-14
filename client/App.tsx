// App.tsx
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootNavigator from "./src/navigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "./tamagui.config";
import { useColorScheme } from "react-native";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { useFonts } from "expo-font";
import { LoadingScreen } from "./src/screens/LoadingScreen";

// Import for web support
import "./tamagui-web.css";

// Create a client
const queryClient = new QueryClient();

// Custom toast config
const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#0D1B2A", backgroundColor: "#152233" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: "bold", color: "#FFF" }}
      text2Style={{ fontSize: 14, color: "#DDD" }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#FF4444", backgroundColor: "#152233" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: "bold", color: "#FFF" }}
      text2Style={{ fontSize: 14, color: "#DDD" }}
    />
  ),
};

export default function App() {
  // Force dark mode
  const colorScheme = "dark";

  const [fontsLoaded] = useFonts({
    GilroyMedium: require("./assets/fonts/Gilroy-Medium.ttf"),
    GilroyRegular: require("./assets/fonts/Gilroy-Regular.ttf"),
    GilroySemiBold: require("./assets/fonts/Gilroy-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <AuthProvider>
              <NavigationContainer>
                <StatusBar style="light" />
                <RootNavigator />
              </NavigationContainer>
            </AuthProvider>
          </SafeAreaProvider>
          <Toast config={toastConfig} />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
