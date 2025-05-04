// SignUp.tsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  GestureResponderEvent,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { useAuth } from "../../hooks/useAuth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define navigation types
type AuthStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const SignUp = () => {
  const navigation = useNavigation<NavigationProp>();
  const { handleInputChange, handleSignupSubmit, errors, formData, isLoading } =
    useAuth();

  const handleSubmit = (event: GestureResponderEvent) => {
    handleSignupSubmit();
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 px-5">
        <View className="py-4">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={20} color="#D6FC03" />
            <Text className="text-primary font-medium ml-1">Back</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-center my-6">
          <View className="bg-primary rounded-full p-2 mr-2">
            <Icon name="activity" size={24} color="black" />
          </View>
          <Text className="text-2xl font-bold text-white">FitTrack</Text>
        </View>

        <Text className="text-3xl font-bold text-white text-center">
          Create Account
        </Text>
        <Text className="text-zinc-400 text-center mb-8">
          Start your fitness journey today
        </Text>

        <View className="space-y-4">
          <View className="space-y-2">
            <Text className="text-sm font-medium text-zinc-300">Email</Text>
            <TextInput
              className={`bg-zinc-900 border ${
                errors.email ? "border-red-500" : "border-zinc-700"
              } text-white h-12 px-4 rounded-md`}
              placeholder="you@example.com"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) =>
                handleInputChange({ id: "email", value: text })
              }
            />
            {errors.email && (
              <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>
            )}
          </View>

          <View className="space-y-2">
            <Text className="text-sm font-medium text-zinc-300">Password</Text>
            <TextInput
              className={`bg-zinc-900 border ${
                errors.password ? "border-red-500" : "border-zinc-700"
              } text-white h-12 px-4 rounded-md`}
              placeholder="••••••••"
              placeholderTextColor="#666"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) =>
                handleInputChange({ id: "password", value: text })
              }
            />
            {errors.password && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.password}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className="w-full bg-primary hover:bg-lime-500 text-black font-bold h-12 rounded-md flex-row items-center justify-center mt-4"
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <View className="flex-row items-center justify-center">
                <Icon
                  name="loader"
                  size={20}
                  color="black"
                  className="animate-spin mr-2"
                />
                <Text className="text-black font-bold">
                  Creating account...
                </Text>
              </View>
            ) : (
              <Text style={{ color: "black", fontWeight: "bold" }}>
                Sign Up
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-auto pt-4 items-center">
          <Text className="text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Text
              className="text-primary font-medium"
              onPress={() => navigation.navigate("Login")}
            >
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
