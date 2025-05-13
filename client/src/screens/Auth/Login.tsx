// Login.tsx
import React, { useState, useEffect } from "react";
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
import Toast from "react-native-toast-message";

const Login = () => {
  const navigation = useNavigation();
  const { login, isLoading, formData, setFormData, errors, handleInputChange } =
    useAuth();
  const [localErrors, setLocalErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  // Reset local loading state if context loading state changes
  useEffect(() => {
    if (!isLoading) {
      setIsLocalLoading(false);
    }
  }, [isLoading]);

  const validateInputs = () => {
    const newErrors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setLocalErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (validateInputs()) {
      try {
        setIsLocalLoading(true);
        await login(formData);
      } catch (error) {
        // Error is already handled in the context
      } finally {
        setIsLocalLoading(false);
      }
    }
  };

  const testToast = () => {
    Toast.show({
      type: "success",
      text1: "Test Toast",
      text2: "This is a test toast message!",
      visibilityTime: 2000,
      topOffset: 50,
    });
  };

  // Determine if button should show loading state
  const showLoadingState = isLoading || isLocalLoading;

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 px-5">
        <View className="py-4">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.navigate(ROUTES.HOME as never)}
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

        <View className="flex-row items-center justify-center mb-6">
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

        <View className="items-center mb-8">
          <View className="w-32 h-32 rounded-full bg-zinc-800 items-center justify-center mb-6">
            <Icon name="user" size={64} color="#D6FC03" />
          </View>
          <Text
            className="text-3xl font-bold text-white mb-2"
            style={styles.headingText}
          >
            Welcome Back
          </Text>
          <Text className="text-zinc-400" style={styles.normalText}>
            Continue your fitness journey
          </Text>
        </View>

        <View className="space-y-4">
          <View className="space-y-2">
            <Text
              className="text-sm font-medium text-zinc-300"
              style={styles.normalText}
            >
              Email
            </Text>
            <TextInput
              className={`bg-zinc-900 border ${
                localErrors.email || errors.email
                  ? "border-red-500"
                  : "border-zinc-700"
              } text-white h-12 px-4 rounded-md`}
              placeholder="you@example.com"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, email: text }));
                if (localErrors.email) {
                  setLocalErrors((prev) => ({ ...prev, email: undefined }));
                }
              }}
            />
            {(localErrors.email || errors.email) && (
              <Text
                className="text-red-500 text-xs mt-1"
                style={styles.normalText}
              >
                {localErrors.email || errors.email}
              </Text>
            )}
          </View>

          <View className="space-y-2">
            <View className="flex-row justify-between items-center">
              <Text
                className="text-sm font-medium text-zinc-300"
                style={styles.normalText}
              >
                Password
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-xs text-primary"
                  style={styles.normalText}
                >
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              className={`bg-zinc-900 border ${
                localErrors.password || errors.password
                  ? "border-red-500"
                  : "border-zinc-700"
              } text-white h-12 px-4 rounded-md`}
              placeholder="••••••••"
              placeholderTextColor="#666"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => {
                setFormData((prev) => ({ ...prev, password: text }));
                if (localErrors.password) {
                  setLocalErrors((prev) => ({ ...prev, password: undefined }));
                }
              }}
            />
            {(localErrors.password || errors.password) && (
              <Text
                className="text-red-500 text-xs mt-1"
                style={styles.normalText}
              >
                {localErrors.password || errors.password}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className="w-full bg-primary hover:bg-lime-500 text-black font-bold h-12 rounded-md flex-row items-center justify-center mt-4"
            onPress={handleLogin}
            disabled={showLoadingState}
          >
            {showLoadingState ? (
              <View className="flex-row items-center justify-center">
                <ActivityIndicator size="small" color="black" />
                <Text
                  className="text-black font-bold ml-2"
                  style={styles.buttonText}
                >
                  Logging in...
                </Text>
              </View>
            ) : (
              <Text className="text-black font-bold" style={styles.buttonText}>
                Log In
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-auto pt-4 items-center">
          <Text
            className="text-center text-sm text-zinc-400"
            style={styles.normalText}
          >
            Don't have an account yet?{" "}
            <Text
              className="text-primary font-medium"
              style={styles.normalText}
              onPress={() => navigation.navigate(ROUTES.SIGNUP as never)}
            >
              Sign up
            </Text>
          </Text>
        </View>

        <View className="mt-6 p-5 bg-zinc-900/60 rounded-xl">
          <Text
            className="text-lg text-primary font-semibold italic text-center"
            style={styles.headingText}
          >
            "The only bad workout is the one that didn't happen."
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

export default Login;
