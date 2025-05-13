// SignUp.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../navigation/routes";
import { SignupData } from "../../types/auth";

const SignUp = () => {
  const navigation = useNavigation();
  const { signup, isLoading, formData, setFormData } = useAuth();
  const [signupData, setSignupData] = useState<SignupData>({
    name: "",
    email: formData.email || "",
    password: formData.password || "",
  });
  const [localErrors, setLocalErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const validateInputs = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    let isValid = true;

    if (!signupData.name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!signupData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!signupData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (signupData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setLocalErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async () => {
    if (validateInputs()) {
      await signup(signupData);
      // Navigation is handled in the AuthContext if signup succeeds
    }
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
            <Text
              className="text-primary font-medium ml-1"
              style={styles.normalText}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-center my-6">
          <View className="bg-primary rounded-full p-2 mr-2">
            <Icon name="activity" size={24} color="black" />
          </View>
          <Text
            className="text-2xl font-bold text-white"
            style={styles.headingText}
          >
            FitTrack
          </Text>
        </View>

        <Text
          className="text-3xl font-bold text-white text-center"
          style={styles.headingText}
        >
          Create Account
        </Text>
        <Text
          className="text-zinc-400 text-center mb-8"
          style={styles.normalText}
        >
          Start your fitness journey today
        </Text>

        <View className="space-y-4">
          <View className="space-y-2">
            <Text
              className="text-sm font-medium text-zinc-300"
              style={styles.normalText}
            >
              Name
            </Text>
            <TextInput
              className={`bg-zinc-900 border ${
                localErrors.name ? "border-red-500" : "border-zinc-700"
              } text-white h-12 px-4 rounded-md`}
              placeholder="Your name"
              placeholderTextColor="#666"
              autoCapitalize="words"
              value={signupData.name}
              onChangeText={(text) => {
                setSignupData((prev) => ({ ...prev, name: text }));
                if (localErrors.name) {
                  setLocalErrors((prev) => ({ ...prev, name: undefined }));
                }
              }}
            />
            {localErrors.name && (
              <Text
                className="text-red-500 text-xs mt-1"
                style={styles.normalText}
              >
                {localErrors.name}
              </Text>
            )}
          </View>

          <View className="space-y-2">
            <Text
              className="text-sm font-medium text-zinc-300"
              style={styles.normalText}
            >
              Email
            </Text>
            <TextInput
              className={`bg-zinc-900 border ${
                localErrors.email ? "border-red-500" : "border-zinc-700"
              } text-white h-12 px-4 rounded-md`}
              placeholder="you@example.com"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={signupData.email}
              onChangeText={(text) => {
                setSignupData((prev) => ({ ...prev, email: text }));
                if (localErrors.email) {
                  setLocalErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
            />
            {localErrors.email && (
              <Text
                className="text-red-500 text-xs mt-1"
                style={styles.normalText}
              >
                {localErrors.email}
              </Text>
            )}
          </View>

          <View className="space-y-2">
            <Text
              className="text-sm font-medium text-zinc-300"
              style={styles.normalText}
            >
              Password
            </Text>
            <TextInput
              className={`bg-zinc-900 border ${
                localErrors.password ? "border-red-500" : "border-zinc-700"
              } text-white h-12 px-4 rounded-md`}
              placeholder="••••••••"
              placeholderTextColor="#666"
              secureTextEntry
              value={signupData.password}
              onChangeText={(text) => {
                setSignupData((prev) => ({ ...prev, password: text }));
                if (localErrors.password) {
                  setLocalErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
            />
            {localErrors.password && (
              <Text
                className="text-red-500 text-xs mt-1"
                style={styles.normalText}
              >
                {localErrors.password}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className="w-full bg-primary hover:bg-lime-500 text-black font-bold h-12 rounded-md flex-row items-center justify-center mt-4"
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <View className="flex-row items-center justify-center">
                <ActivityIndicator size="small" color="black" />
                <Text
                  className="text-black font-bold ml-2"
                  style={styles.buttonText}
                >
                  Creating account...
                </Text>
              </View>
            ) : (
              <Text
                style={[
                  styles.buttonText,
                  { color: "black", fontWeight: "bold" },
                ]}
              >
                Sign Up
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-auto pt-4 items-center">
          <Text
            className="text-center text-sm text-zinc-400"
            style={styles.normalText}
          >
            Already have an account?{" "}
            <Text
              className="text-primary font-medium"
              style={styles.normalText}
              onPress={() => navigation.navigate(ROUTES.LOGIN as never)}
            >
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
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

export default SignUp;
