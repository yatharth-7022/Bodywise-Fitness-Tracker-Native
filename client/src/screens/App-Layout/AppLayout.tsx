// AppLayout.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import { AllExercises } from "../../components/Exercise/AllExercises";
import { TimerPage } from "../Timer/TimerPage";
import Dashboard from "../../components/Dashboard/Dashboard";
import { ROUTES } from "../../navigation/routes";

const Tab = createBottomTabNavigator();

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  const getIcon = (routeName: string, isFocused: boolean) => {
    let iconName = "home";
    let color = isFocused ? "#3B82F6" : "white";

    if (routeName === ROUTES.DASHBOARD) iconName = "home";
    else if (routeName === ROUTES.EXERCISES) iconName = "activity";
    else if (routeName === ROUTES.TIMER) iconName = "clock";
    else if (routeName === "Chart") iconName = "bar-chart-2";

    return <Icon name={iconName} size={24} color={color} />;
  };

  return (
    <View className="flex-row bg-zinc-900 border-t border-zinc-800 h-14">
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Center add button
        if (route.name === "AddButton") {
          return (
            <TouchableOpacity
              key={route.key}
              className="flex-1 justify-center items-center"
              onPress={() => {
                // Navigate to add workout screen or open modal
              }}
            >
              <View className="w-10 h-10 rounded-full bg-blue-600 justify-center items-center">
                <Icon name="plus" size={24} color="white" />
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            className="flex-1 justify-center items-center"
          >
            {getIcon(route.name, isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export const AppNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name={ROUTES.DASHBOARD} component={Dashboard} />
      <Tab.Screen name={ROUTES.TIMER} component={TimerPage} />
      <Tab.Screen name="AddButton" component={EmptyComponent} />
      <Tab.Screen name={ROUTES.EXERCISES} component={AllExercises} />
      {/* <Tab.Screen name="Chart" component={ChartScreen} /> */}
    </Tab.Navigator>
  );
};

// This is just a placeholder for the add button
const EmptyComponent = () => null;

// AppLayout component to wrap the entire app UI
export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="flex-1 flex justify-center bg-zinc-950">
      <View className="w-full max-w-[414px] flex-1 flex flex-col relative bg-zinc-950 mx-auto">
        <View className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </View>
      </View>
    </View>
  );
};
