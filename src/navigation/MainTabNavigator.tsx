// src/navigation/MainTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ROUTES } from './routes';

// Screens
import Dashboard from '../screens/Dashboard';
import { AllExercises } from '../screens/Exercise/AllExercises';
import { TimerPage } from '../screens/Timer';
import ChartScreen from '../screens/Chart';

const Tab = createBottomTabNavigator();

// Empty component for the center add button
const EmptyComponent = () => null;

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#18181b', // zinc-900
          borderTopColor: '#27272a', // zinc-800
          height: 60,
        },
        tabBarActiveTintColor: '#3b82f6', // blue-500
        tabBarInactiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === ROUTES.DASHBOARD) {
            iconName = 'home';
          } else if (route.name === ROUTES.EXERCISES) {
            iconName = 'activity';
          } else if (route.name === ROUTES.TIMER) {
            iconName = 'clock';
          } else if (route.name === 'Chart') {
            iconName = 'bar-chart-2';
          } else {
            iconName = 'circle';
          }

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
              className="w-16 h-16 -mt-6 rounded-full bg-blue-600 items-center justify-center mx-2"
              onPress={() => {
                // Handle add button press - could open a modal with options
                console.log('Add button pressed');
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