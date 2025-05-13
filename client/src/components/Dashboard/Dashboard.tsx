// components/Dashboard/Dashboard.tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { WorkoutCard } from "./WorkoutCard";
import { WeeklyActivityChart } from "./WeeklyActivityChart";
import { MonthlyVolumeChart } from "./MonthlyVolumeChart";
import { ROUTES } from "../../navigation/routes";
import { RootStackParamList } from "../../types/navigation";
import { H2, Paragraph, XStack, YStack } from "tamagui";

import { ProfilePicture } from "../Upload-Profile/ProfilePicture";
import { useDashboard } from "../../hooks/useDashboard";
import { useAuth } from "../../contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { GET_PROFILE_PICTURE } from "../../api";
import api from "../../interceptor";
import config from "../../../config";
import { firstLetterUppercase } from "../../utils/handlerFunctions";
import { Clock } from "lucide-react-native";
import { Toast, useToastController } from "@tamagui/toast";
import {
  headingText,
  sectionHeading,
  normalText,
  buttonText,
  cardTitle,
} from "../../utils/fontStyles";

type DashboardScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export const Dashboard = () => {
  const { defaultRoutines } = useDashboard();
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const defaultRoutinesWithImage = defaultRoutines?.filter(
    (routine) => routine.imageUrl !== null
  );
  const { data: userInfo } = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const response = await api.get(GET_PROFILE_PICTURE);
      return response?.data?.user;
    },
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning!";
    if (hour < 18) return "Good Afternoon!";
    return "Good Evening!";
  };

  return (
    <>
      <View className="flex-1 bg-zinc-950">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pt-8">
            <View className="flex-row justify-between items-center pb-6">
              <View className="flex-row items-center gap-3">
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ProfileStack", {
                      screen: "Settings",
                    })
                  }
                >
                  <ProfilePicture src={userInfo?.profilePicture} size="md" />
                </TouchableOpacity>
                <View>
                  <Text style={normalText} className="text-zinc-400 text-sm">
                    {getGreeting()}
                  </Text>
                  <Text style={headingText} className="text-xl text-white">
                    {firstLetterUppercase(
                      userInfo?.name ?? "Fitness Enthusiast"
                    )}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ProfileStack", {
                    screen: "Settings",
                  })
                }
                className="p-2"
              >
                <Feather name="settings" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <View className="mb-8">
              <Text style={sectionHeading} className="text-2xl mb-4 text-white">
                Quick Actions
              </Text>

              {/* Row 1: Log Weight and Start Timer */}
              <View className="flex-row justify-between space-x-3 mb-3">
                <Button
                  className="flex-1 bg-blue-500"
                  textClassName="text-white text-sm"
                  onPress={() =>
                    navigation.navigate("WeightStack", {
                      screen: "LogWeight",
                    })
                  }
                  icon={<Feather name="activity" size={16} color="white" />}
                >
                  <Text style={buttonText} className="text-white">
                    Log Weight
                  </Text>
                </Button>

                <Button
                  className="flex-1 bg-blue-500"
                  textClassName="text-white text-sm"
                  onPress={() =>
                    navigation.navigate("MainTabs", {
                      screen: "Timer",
                    })
                  }
                  icon={<Clock size={16} className="mr-1" color="white" />}
                >
                  <Text style={buttonText} className="text-white ml-1">
                    Start Timer
                  </Text>
                </Button>
              </View>

              {/* Row 2: Start Session and Make Routine */}
              <View className="flex-row justify-between space-x-3">
                <Button
                  className="flex-1 bg-red-500"
                  textClassName="text-white text-sm"
                  icon={<Feather name="play" size={16} color="white" />}
                >
                  <Text style={buttonText} className="text-white">
                    Start Session
                  </Text>
                </Button>
              </View>
            </View>

            <View className="mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text style={sectionHeading} className="text-2xl text-white">
                  Start a workout
                </Text>
                <TouchableOpacity>
                  <Text style={normalText} className="text-blue-500">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="pb-4 -mx-2"
              >
                {defaultRoutinesWithImage?.map((routine) => (
                  <WorkoutCard
                    key={routine?.id}
                    id={Number(routine?.id)}
                    title={routine?.name}
                    duration="35 min"
                    calories="90 cals"
                    image={`${config.API_URL}${routine?.imageUrl}` || ""}
                    description={routine?.description}
                  />
                ))}
              </ScrollView>
            </View>

            <View className="mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text style={sectionHeading} className="text-2xl text-white">
                  History
                </Text>
                <TouchableOpacity>
                  <Text style={normalText} className="text-blue-500">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              <Card className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                <View className="mb-2">
                  <Text style={cardTitle} className="text-white text-base">
                    Average weekly activity
                  </Text>
                  <View className="flex-row items-center">
                    <Text style={normalText} className="text-zinc-400">
                      6h 35m
                    </Text>
                    <Text
                      style={normalText}
                      className="text-green-400 text-xs ml-2"
                    >
                      ↑ 12%
                    </Text>
                  </View>
                </View>
                <View className="mt-4">
                  <WeeklyActivityChart />
                </View>
              </Card>
            </View>

            <View className="mb-24">
              <Card className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                <View className="flex-row justify-between mb-4">
                  <View>
                    <Text style={cardTitle} className="text-white text-base">
                      Weekly Volume
                    </Text>
                    <Text style={normalText} className="text-zinc-400">
                      445 Kg
                    </Text>
                  </View>
                  <View>
                    <Text style={cardTitle} className="text-white text-base">
                      Monthly Volume
                    </Text>
                    <Text
                      style={[headingText, { fontSize: 24 }]}
                      className="text-2xl text-white"
                    >
                      2679 Kg
                    </Text>
                  </View>
                </View>
                <View>
                  <MonthlyVolumeChart />
                </View>
              </Card>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Dashboard;
