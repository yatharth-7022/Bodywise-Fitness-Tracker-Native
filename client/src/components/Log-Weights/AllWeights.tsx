// components/Log-Weights/AllWeights.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../../src/navigation/routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Card } from "../ui/Card";
import { useWeights } from "../../hooks/useWeights";
import { WeightResponse } from "../../types/weights";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

// Define navigation types
type WeightStackParamList = {
  LOG_WEIGHT: undefined;
};

export const AllWeights = () => {
  const { allWeights } = useWeights();
  const navigation = useNavigation();

  // Function to format date without using date-fns
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <View className="flex-1 mt-6">
        <View className="flex-row items-center p-6 mb-4">
          <TouchableOpacity
            className="mr-3"
            onPress={() =>
              navigation.navigate("WeightStack", {
                screen: "LogWeight",
              })
            }
          >
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <Text className="text-xl font-semibold text-white">Weight Log</Text>
            <FontAwesome name="weight-hanging" size={16} color="white" />
          </View>
        </View>

        <FlatList
          data={allWeights?.weights}
          keyExtractor={(item: WeightResponse) => item.id.toString()}
          renderItem={({ item }: { item: WeightResponse }) => (
            <Card className="mx-6 mb-4 bg-zinc-900 border-zinc-800">
              <View className="p-4">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-sm text-zinc-400">
                      {formatDate(item.date)}
                    </Text>
                    <View className="flex-row items-baseline mt-1">
                      <Text className="text-xl font-semibold text-white">
                        {item.value}
                      </Text>
                      <Text className="text-zinc-400 text-sm ml-1">kg</Text>
                    </View>
                    {item.note && (
                      <Text className="text-zinc-400 text-sm mt-1">
                        {item.note}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
            </Card>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
