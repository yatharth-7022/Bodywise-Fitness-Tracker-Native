// src/navigation/MainTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "./routes";
import { MainTabParamList } from "../types/navigation";
import Dashboard from "../components/Dashboard/Dashboard";
import { TimerPage } from "../screens/Timer/TimerPage";
// import { Dumbbell } from "lucide-react-native";
// Screens
import {
  AlignJustify,
  BarChart,
  Clock,
  Dumbbell,
  Home,
} from "lucide-react-native";
import { AllExercises } from "../components/Exercise/AllExercises";
import { ToastExample } from "../components/ToastExample";

// Use empty components as placeholders for screens we haven't created yet
const EmptyComponent = () => null;

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0D1B2A", // Dark navy background
          borderTopColor: "#1E3A5F", // Border color
          // height: 50,
          alignItems: "center", // Center icons vertically
          justifyContent: "center", // Ensure complete centering
        },
        tabBarActiveTintColor: "#1d4ed8", // Blue primary color
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === ROUTES.DASHBOARD) {
            return <Home size={size} color={color} />;
          } else if (route.name === ROUTES.EXERCISES) {
            return <Dumbbell size={size} color={color} />;
          } else if (route.name === ROUTES.TIMER) {
            return <Clock size={size} color={color} />;
          } else if (route.name === ROUTES.CHART) {
            return <BarChart size={size} color={color} />;
          }

          // @ts-ignore - Feather icon names
          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Timer" component={TimerPage} />
      <Tab.Screen
        name="AddButton"
        component={EmptyComponent}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...(props as TouchableOpacityProps)}
              style={{
                width: 64,
                height: 64,
                marginTop: -24,
                borderRadius: 32,
                backgroundColor: "#1d4ed8", // Blue primary color
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 8,
              }}
              onPress={() => {
                // Navigate to weight logging screen
                navigation.navigate("WeightStack", {
                  screen: "LogWeight",
                });
              }}
            >
              <Feather name="plus" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Exercises" component={AllExercises} />
      <Tab.Screen name="Chart" component={ToastExample} />
    </Tab.Navigator>
  );
}
