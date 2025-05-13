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
    <SafeAreaView className="flex-1 bg-black">
      <View className="p-4">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => navigation.navigate(ROUTES.HOME as never)}
        >
          <Icon name="arrow-left" size={20} color="#D6FC03" />
          <Text
            className="text-primary ml-1 font-medium"
            style={styles.normalText}
          >
            Back
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6 justify-center">
        <View className="flex-row items-center justify-center mb-8">
          <View className="bg-primary rounded-xl w-12 h-12 items-center justify-center mr-3">
            <Icon name="activity" size={28} color="black" />
          </View>
          <Text
            className="text-white text-2xl font-bold"
            style={styles.headingText}
          >
            FitTrack
          </Text>
        </View>

        <View className="items-center mb-8">
          <Image
            source={require("../../assets/image/chest-workout.jpg")}
            className="w-60 h-60"
            resizeMode="contain"
          />
        </View>

        <View className="items-center mb-12">
          <Text
            className="text-white text-2xl font-bold text-center mb-3"
            style={styles.headingText}
          >
            Track Your Fitness Journey
          </Text>
          <Text
            className="text-gray-400 text-base text-center px-6 leading-6"
            style={styles.normalText}
          >
            Monitor workouts, track progress, and achieve your fitness goals
          </Text>
        </View>

        <View className="space-y-4">
          <TouchableOpacity
            className="bg-primary rounded-lg py-4 items-center"
            onPress={() => navigation.navigate(ROUTES.SIGNUP as never)}
          >
            <Text
              className="text-black text-base font-bold"
              style={styles.buttonText}
            >
              Create Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-primary rounded-lg py-4 items-center"
            onPress={() => navigation.navigate(ROUTES.LOGIN as never)}
          >
            <Text
              className="text-primary text-base font-bold"
              style={styles.buttonText}
            >
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingText: {
    fontFamily: "Montserrat",
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  normalText: {
    fontFamily: "DMSans",
  },
  buttonText: {
    fontFamily: "DMSans",
    fontWeight: "bold",
  },
});
