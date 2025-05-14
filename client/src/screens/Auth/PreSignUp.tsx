// PreSignUp.tsx
import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { ROUTES } from "../../navigation/routes";

export const PreSignUp = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-8 justify-center">
        <View className="items-center mb-12">
          <View className="bg-primary rounded-2xl w-24 h-24 items-center justify-center mb-6">
            <Icon name="activity" size={48} color="white" />
          </View>
          <Text
            className="text-white text-5xl font-bold"
            style={styles.headingText}
          >
            FitTrack
          </Text>
        </View>

        <View className="items-center mb-16">
          <Text
            className="text-white text-4xl font-bold text-center mb-6"
            style={styles.headingText}
          >
            Track Your Fitness Journey
          </Text>
          <Text
            className="text-gray-400 text-base text-center leading-6"
            style={styles.normalText}
          >
            Monitor workouts, track progress, and achieve your fitness goals
          </Text>
        </View>

        <TouchableOpacity
          className="bg-primary rounded-lg py-5 items-center"
          onPress={() => navigation.navigate(ROUTES.SIGNUP as never)}
        >
          <Text
            className="text-white text-lg font-semibold"
            style={styles.buttonText}
          >
            Create Account
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-4 items-center"
          onPress={() => navigation.navigate(ROUTES.LOGIN as never)}
        >
          <Text
            className="text-white text-base opacity-70"
            style={styles.normalText}
          >
            Already have an account?{" "}
            <Text className="text-primary">Log In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontFamily: "GilroySemiBold",
    letterSpacing: -0.5,
  },
  normalText: {
    fontFamily: "GilroyRegular",
  },
  buttonText: {
    fontFamily: "GilroySemiBold",
  },
});
