// src/navigation/MainTabNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ROUTES } from "./routes";
import Dashboard from "../components/Dashboard/Dashboard";
import { TimerPage } from "../screens/Timer/TimerPage";

// Screens

// Use empty components as placeholders for screens we haven't created yet
const EmptyComponent = () => null;
const AllExercises = EmptyComponent;
const ChartScreen = EmptyComponent;

const Tab = createBottomTabNavigator();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#18181b", // zinc-900
          borderTopColor: "#27272a", // zinc-800
          height: 60,
        },
        tabBarActiveTintColor: "#3b82f6", // blue-500
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = "circle";

          if (route.name === ROUTES.DASHBOARD) {
            iconName = "home";
          } else if (route.name === ROUTES.EXERCISES) {
            iconName = "activity";
          } else if (route.name === ROUTES.TIMER) {
            iconName = "clock";
          } else if (route.name === "Chart") {
            iconName = "bar-chart-2";
          }

          // @ts-ignore - Feather icon names
          return <Feather name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={ROUTES.DASHBOARD} component={Dashboard} />
      <Tab.Screen name={ROUTES.TIMER} component={TimerPage} />
      <Tab.Screen
        name="AddButton"
        component={EmptyComponent}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                width: 64,
                height: 64,
                marginTop: -24,
                borderRadius: 32,
                backgroundColor: "#2563eb",
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 8,
              }}
              onPress={() => {
                // Handle add button press - could open a modal with options
                console.log("Add button pressed");
              }}
            >
              <Feather name="plus" size={24} color="white" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name={ROUTES.EXERCISES} component={AllExercises} />
      <Tab.Screen name="Chart" component={ChartScreen} />
    </Tab.Navigator>
  );
}
