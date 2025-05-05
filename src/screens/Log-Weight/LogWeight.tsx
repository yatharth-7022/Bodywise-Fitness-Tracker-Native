// LogWeight.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { ROUTES } from "../../navigation/routes";
import { useWeights } from "../../hooks/useWeights";
import { WeightResponse } from "../../types/weights";

const screenWidth = Dimensions.get("window").width - 40;

export const LogWeight = () => {
  const { handleSubmit, handleInputChange, formData, recentWeights } =
    useWeights();
  const navigation = useNavigation();

  const weightData = recentWeights?.weights.map((entry: WeightResponse) => ({
    ...entry,
    formattedDate: new Date(entry.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
  }));

  const latestWeight = recentWeights?.weights[0]?.value;
  const previousWeight = recentWeights?.weights[1]?.value;
  const weightDiff = latestWeight - previousWeight;
  const isWeightDown = weightDiff < 0;

  // Prepare data for LineChart
  const chartData = {
    labels: weightData?.map((item: any) => item.formattedDate) || [],
    datasets: [
      {
        data: weightData?.map((item: any) => item.value) || [],
      },
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView>
        <View className="flex-row items-center justify-between p-6 mb-4">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              className="p-2"
              onPress={() => navigation.navigate(ROUTES.DASHBOARD as never)}
            >
              <Icon name="arrow-left" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-xl font-semibold text-white">Log Weight</Text>
          </View>
        </View>

        <View className="px-6 space-y-6">
          <View className="bg-zinc-900 border-zinc-800 rounded-lg p-4">
            <Text className="text-white text-base font-medium">
              Current Weight
            </Text>
            <View className="flex-row items-baseline gap-2">
              <Text className="text-3xl font-bold text-white">
                {latestWeight}
              </Text>
              <Text className="text-zinc-400">kg</Text>
              <Text
                className={`text-sm ml-2 ${
                  isWeightDown ? "text-green-400" : "text-red-400"
                }`}
              >
                {isWeightDown ? "↓" : "↑"} {Math.abs(weightDiff).toFixed(1)} kg
              </Text>
            </View>
          </View>

          <View className="space-y-4">
            <View className="space-y-2">
              <Text className="text-sm font-medium text-zinc-300">
                Enter Weight
              </Text>
              <View className="relative">
                <Icon
                  name="activity"
                  size={24}
                  color="#999"
                  className="absolute left-4 top-4"
                />
                <TextInput
                  className="bg-zinc-900 border-zinc-800 text-white pl-12 h-14 text-lg rounded-md"
                  keyboardType="numeric"
                  placeholder="0.0"
                  placeholderTextColor="#999"
                  value={formData.value}
                  onChangeText={(text) => handleInputChange("value", text)}
                />
                <Text className="absolute right-4 top-4 text-zinc-400">kg</Text>
              </View>
            </View>

            <View className="space-y-2">
              <Text className="text-sm font-medium text-zinc-300">
                Add Note (Optional)
              </Text>
              <TextInput
                className="bg-zinc-900 border-zinc-800 text-white h-14 px-4 rounded-md"
                placeholder="How are you feeling today?"
                placeholderTextColor="#999"
                value={formData.note}
                onChangeText={(text) => handleInputChange("note", text)}
              />
            </View>

            <TouchableOpacity
              className="w-full bg-blue-600 hover:bg-blue-700 h-14 rounded-md flex-row items-center justify-center"
              onPress={handleSubmit}
            >
              <Icon name="plus" size={20} color="white" className="mr-2" />
              <Text className="text-lg text-white font-semibold">
                Log Weight
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-8">
            <View className="bg-zinc-900 border-zinc-800 rounded-lg p-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <Icon name="trending-up" size={20} color="white" />
                  <Text className="text-white text-base font-semibold">
                    Weight Progress
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text className="text-sm text-blue-400">View All</Text>
                </TouchableOpacity>
              </View>
              <Text className="text-zinc-400 text-xs mt-1">Last 7 entries</Text>

              {weightData && weightData.length > 0 && (
                <View className="h-[200px] mt-4">
                  <LineChart
                    data={chartData}
                    width={screenWidth}
                    height={200}
                    chartConfig={{
                      backgroundColor: "#1f1f1f",
                      backgroundGradientFrom: "#1f1f1f",
                      backgroundGradientTo: "#1f1f1f",
                      decimalPlaces: 1,
                      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(107, 114, 128, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: "4",
                        strokeWidth: "2",
                        stroke: "#3B82F6",
                      },
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 8,
                    }}
                  />
                </View>
              )}
            </View>
          </View>

          <View>
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-semibold text-white">
                Recent Entries
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.WEIGHTS as never)}
              >
                <Text className="text-sm text-blue-400">See All</Text>
              </TouchableOpacity>
            </View>
            <View className="space-y-4 mt-4">
              {recentWeights?.weights?.map((entry: WeightResponse) => (
                <View
                  key={entry.id}
                  className="bg-zinc-900 border-zinc-800 rounded-lg p-4"
                >
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="text-sm text-zinc-400">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </Text>
                      <View className="flex-row items-baseline gap-1 mt-1">
                        <Text className="text-xl font-semibold text-white">
                          {entry.value}
                        </Text>
                        <Text className="text-zinc-400 text-sm">kg</Text>
                      </View>
                      {entry?.note && (
                        <Text className="text-sm w-full truncate text-zinc-400">
                          {entry.note}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
