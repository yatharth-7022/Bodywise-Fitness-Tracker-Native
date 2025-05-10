// Home.tsx
import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../navigation/routes";

export const Home = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../assets/image/back.jpeg")}
      className="flex-1 w-full h-full"
      resizeMode="cover"
    >
      <View className="flex-1 items-center justify-end pb-12">
        <Text className="font-medium text-base text-white mb-2">Welcome</Text>
        <View className="items-center">
          <Text className="font-extrabold text-2xl text-white">
            Build Your Fitness
          </Text>
          <Text className="font-extrabold text-2xl text-white">
            Start Tracker
          </Text>
        </View>
        <Text className="font-medium text-white mt-2">Achieve Body Goals</Text>
        <TouchableOpacity
          className="bg-primary rounded-lg px-10 py-2 mt-6"
          onPress={() => navigation.navigate(ROUTES.PRESIGNUP as never)}
        >
          <Text className="text-lg font-bold text-black">Start Workout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
