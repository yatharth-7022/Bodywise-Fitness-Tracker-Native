// components/Routine/Routine.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDashboard } from "../../hooks/useDashboard";
import { firstLetterUppercase } from "../../utils/handlerFunctions";
import { ROUTES } from "../../navigation/routes";
import config from "../../../config";

// Define navigation types
// type RootStackParamList = {
//   Dashboard: undefined;
//   RoutineSession: { id: number; title: string };
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Routine = () => {
  const { routineById, isRoutineLoading } = useDashboard();
  const navigation = useNavigation();
  console.log({ routineById });

  if (isRoutineLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-950">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (!isRoutineLoading && !routineById) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-950">
        <Text className="text-xl font-semibold mb-2 text-white">
          Routine not found
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("MainTabs", {
              screen: "Dashboard",
            })
          }
          className="mt-2"
        >
          <Text className="text-blue-500">Return to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-950" edges={["bottom"]}>
      <View className="flex-1 rounded-t-2xl">
        <View className="h-64 relative">
          <Image
            source={{ uri: `${config.API_URL}${routineById?.imageUrl}` }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MainTabs", {
                screen: "Dashboard",
              })
            }
            className="absolute top-4 left-4 p-2 rounded-full bg-black/20"
          >
            <Feather name="chevron-left" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="absolute top-4 right-4 p-2 rounded-full bg-black/20">
            <Feather name="bookmark" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View className="flex-1  bg-zinc-950 rounded-t-2xl">
          <ScrollView className="flex-1 px-4 pt-4 pb-5">
            <Text className="text-2xl font-bold mb-2 text-white">
              {routineById?.name}
            </Text>

            <View className="flex-row items-center text-gray-500 text-sm mb-4">
              <View className="flex-row ml-auto space-x-4">
                <View className="flex-row items-center">
                  <Feather name="clock" size={16} color="white" />
                  <Text className="text-white ml-1">46m</Text>
                </View>
                <View className="flex-row items-center">
                  <Feather name="activity" size={16} color="white" />
                  <Text className="text-white ml-1">7695 Kg</Text>
                </View>
                <View className="flex-row items-center">
                  <Feather name="award" size={16} color="white" />
                  <Text className="text-white ml-1">2 PRs</Text>
                </View>
              </View>
            </View>

            <View className="space-y-4">
              {routineById?.exercises?.map((exercise) => (
                <View
                  key={exercise?.id}
                  className="flex-row items-center border-b border-gray-700 pb-4"
                >
                  <View className="w-14 h-14 rounded-lg overflow-hidden bg-gray-800 mr-3">
                    <Image
                      source={{
                        uri: `${config.API_URL}${exercise?.exercise?.imageUrl}`,
                      }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-medium text-white">
                      {firstLetterUppercase(exercise?.exercise?.name)}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      {firstLetterUppercase(exercise?.exercise?.bodyPart)}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-sm text-blue-500 font-medium">
                      Free Weight
                    </Text>
                    <View className="flex-row items-center text-gray-500 text-sm mt-1">
                      <Feather name="clock" size={14} color="#6b7280" />
                      <Text className="text-gray-500 ml-1">
                        {exercise?.sets} Sets x {exercise?.reps} Reps
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          <View className="px-4 py-2 border-t border-zinc-800">
            <TouchableOpacity
              className="w-full bg-blue-600 py-3 rounded-lg items-center"
              onPress={() =>
                navigation.navigate("WorkoutStack", {
                  screen: "RoutineSession",
                  params: {
                    routineId: routineById?.id || 0,
                  },
                })
              }
            >
              <Text className="text-white font-medium">Start Session</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Routine;
