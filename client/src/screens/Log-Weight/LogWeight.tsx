// LogWeight.tsx
import React, { useState } from "react";
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
import FontAwesome from "react-native-vector-icons/FontAwesome5";
const screenWidth = Dimensions.get("window").width - 60; // Increased subtraction to account for padding

export const LogWeight = () => {
  const {
    handleSubmit,
    handleInputChange,
    formData,
    recentWeights,
    allWeights,
  } = useWeights();
  const navigation = useNavigation();
  const [weightError, setWeightError] = useState(false);

  console.log(recentWeights);
  console.log(allWeights);

  const weightData = recentWeights?.weights
    .slice(0, 5)
    .map((entry: WeightResponse) => ({
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

  const validateAndSubmit = (e: any) => {
    if (!formData.value.trim()) {
      setWeightError(true);
      return;
    }
    setWeightError(false);
    handleSubmit(e);
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <ScrollView>
        <View className="flex-row items-center justify-between p-6 mb-4">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              className="p-2"
              onPress={() =>
                navigation.navigate("MainTabs", {
                  screen: "Dashboard",
                })
              }
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
                <TextInput
                  className={`bg-zinc-900 ${
                    weightError ? "border border-red-500" : "border-zinc-800"
                  } text-white pl-12 h-14 text-lg rounded-md`}
                  keyboardType="numeric"
                  placeholder="0.0"
                  placeholderTextColor="#999"
                  value={formData.value}
                  onChangeText={(text) => {
                    handleInputChange("value", text);
                    if (weightError) setWeightError(false);
                  }}
                />
                <View className="absolute left-4 top-[17px]">
                  <FontAwesome name="weight-hanging" size={16} color="white" />
                </View>
                <Text className="absolute right-4 top-4 text-zinc-400">kg</Text>
              </View>
              {weightError && (
                <Text className="text-red-500 text-xs mt-1">
                  Please enter your weight
                </Text>
              )}
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
              className="w-full bg-primary h-14 rounded-md flex-row items-center justify-center"
              onPress={validateAndSubmit}
            >
              <Icon name="plus" size={20} color="white" />
              <Text className="text-lg ml-2 text-white font-black">
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
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("WeightStack", {
                      screen: "Weights",
                    })
                  }
                >
                  <Text className="text-sm text-primary">View All</Text>
                </TouchableOpacity>
              </View>
              <Text className="text-zinc-400 text-xs mt-1">Last 5 entries</Text>

              {weightData && weightData.length > 0 && (
                <View className="h-[200px] mt-4 -ml-4">
                  <LineChart
                    data={chartData}
                    height={200}
                    width={screenWidth}
                    chartConfig={{
                      backgroundColor: "#18181B",
                      backgroundGradientFrom: "#18181B",
                      backgroundGradientTo: "#18181B",
                      decimalPlaces: 1,
                      color: (opacity = 1) => `rgba(29, 78, 216, ${opacity})`,
                      labelColor: (opacity = 1) =>
                        `rgba(255, 255, 255, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: "4",
                        strokeWidth: "2",
                        stroke: "#1d4ed8",
                      },
                      paddingRight: 20,
                      formatYLabel: (value) => value, // Format Y-axis labels
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 8,
                    }}
                    fromZero={true}
                    withInnerLines={true}
                    withOuterLines={false}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
