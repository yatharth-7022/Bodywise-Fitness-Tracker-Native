// components/Dashboard/Dashboard.tsx
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { WorkoutCard } from './WorkoutCard';
import { WeeklyActivityChart } from './WeeklyActivityChart';
import { MonthlyVolumeChart } from './MonthlyVolumeChart';
import { ROUTES } from '@/routes/routes';
import { useAuth } from '@/hooks/useAuth';
import { useDashboard } from '@/hooks/useDashboard';
import { ProfilePicture } from '../Upload-Profile/ProfilePicture';
import Animated, { FadeInDown } from 'react-native-reanimated';

export const Dashboard = () => {
  const { defaultRoutines } = useDashboard();
  const { profileData } = useAuth();
  const navigation = useNavigation();

  const defaultRoutinesWithImage = defaultRoutines?.filter(
    (routine) => routine.imageUrl !== null
  );

  return (
    <View className="flex-1 bg-zinc-950">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-4">
          <View className="flex-row justify-between items-center pb-6">
            <View className="flex-row items-center gap-3">
              <ProfilePicture src={profileData?.user?.profilePicture} size="md" />
              <View>
                <Text className="text-zinc-400 text-sm">Good morning!</Text>
                <Text className="text-xl font-semibold text-white">{profileData?.user?.name}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate(ROUTES.SETTINGS)}
              className="p-2"
            >
              <Feather name="settings" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Animated.View entering={FadeInDown.delay(100).duration(400)}>
            <Text className="text-lg font-semibold mb-4 text-white">Quick Actions</Text>
            <View className="flex-row gap-2 mb-8">
              <Button
                className="flex-1 bg-blue-600"
                textClassName="text-white text-xs"
                onPress={() => navigation.navigate(ROUTES.LOG_WEIGHT)}
                icon={<Feather name="activity" size={16} color="white" />}
              >
                <Text className="ml-1">Log Weight</Text>
              </Button>
              <Button
                className="flex-1 bg-blue-600"
                textClassName="text-white text-xs"
                onPress={() => navigation.navigate(ROUTES.TIMER)}
                icon={<Feather name="clock" size={16} color="white" />}
              >
                <Text className="ml-1">Start Timer</Text>
              </Button>
              <Button
                className="flex-1 bg-yellow-600"
                textClassName="text-white text-xs"
              >
                Start Session →
              </Button>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).duration(400)}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold text-white">Start A Workout</Text>
              <TouchableOpacity>
                <Text className="text-blue-400">See all</Text>
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
                  id={routine?.id}
                  title={routine?.name}
                  duration="35 min"
                  calories="90 cals"
                  image={routine?.imageUrl}
                  description={routine?.description}
                />
              ))}
            </ScrollView>
          </Animated.View>

          <Animated.View className="mb-8 mt-4" entering={FadeInDown.delay(300).duration(400)}>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold text-white">History</Text>
              <TouchableOpacity>
                <Text className="text-blue-400">See all</Text>
              </TouchableOpacity>
            </View>

            <Card className="bg-zinc-900 border-zinc-800 p-4 rounded-xl">
              <View className="mb-2">
                <Text className="text-white text-base font-semibold">Average weekly activity</Text>
                <View className="flex-row items-center">
                  <Text className="text-zinc-400">6h 35m</Text>
                  <Text className="text-green-400 text-xs ml-2">↑ 12%</Text>
                </View>
              </View>
              <View className="mt-4">
                <WeeklyActivityChart />
              </View>
            </Card>
          </Animated.View>

          <Animated.View className="mb-24" entering={FadeInDown.delay(400).duration(400)}>
            <Card className="bg-zinc-900 border-zinc-800 p-4 rounded-xl">
              <View className="flex-row justify-between mb-4">
                <View>
                  <Text className="text-white text-base font-semibold">Weekly Volume</Text>
                  <Text className="text-zinc-400">445 Kg</Text>
                </View>
                <View>
                  <Text className="text-white text-base font-semibold">Monthly Volume</Text>
                  <Text className="text-2xl font-bold text-white">2679 Kg</Text>
                </View>
              </View>
              <View>
                <MonthlyVolumeChart />
              </View>
            </Card>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Dashboard;