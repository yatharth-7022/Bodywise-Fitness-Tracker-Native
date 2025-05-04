// Login.tsx
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const navigation = useNavigation();
  const { isLoginLoading, handleInputChange, handleSubmit, errors, formData } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="flex-1 px-5">
        <View className="py-4">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => navigation.navigate('Home')}
          >
            <Icon name="arrow-left" size={20} color="#D6FC03" />
            <Text className="text-primary font-medium ml-1">Back</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-center mb-6">
          <View className="bg-primary rounded-full p-2 mr-2">
            <Icon name="activity" size={24} color="black" />
          </View>
          <Text className="text-2xl font-bold text-white">FitTrack</Text>
        </View>

        <View className="items-center mb-8">
          <View className="w-32 h-32 rounded-full bg-zinc-800 items-center justify-center mb-6">
            <Icon name="user" size={64} color="#D6FC03" />
          </View>
          <Text className="text-3xl font-bold text-white mb-2">Welcome Back</Text>
          <Text className="text-zinc-400">Continue your fitness journey</Text>
        </View>

        <View className="space-y-4">
          <View className="space-y-2">
            <Text className="text-sm font-medium text-zinc-300">Email</Text>
            <TextInput
              className={`bg-zinc-900 border ${errors.email ? "border-red-500" : "border-zinc-700"} text-white h-12 px-4 rounded-md`}
              placeholder="you@example.com"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => handleInputChange({ target: { id: 'email', value: text } })}
            />
            {errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>}
          </View>

          <View className="space-y-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-sm font-medium text-zinc-300">Password</Text>
              <TouchableOpacity>
                <Text className="text-xs text-primary">Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <TextInput
              className={`bg-zinc-900 border ${errors.password ? "border-red-500" : "border-zinc-700"} text-white h-12 px-4 rounded-md`}
              placeholder="••••••••"
              placeholderTextColor="#666"
              secureTextEntry
              value={formData.password}
              onChangeText={(text) => handleInputChange({ target: { id: 'password', value: text } })}
            />
            {errors.password && <Text className="text-red-500 text-xs mt-1">{errors.password}</Text>}
          </View>

          <TouchableOpacity
            className="w-full bg-primary hover:bg-lime-500 text-black font-bold h-12 rounded-md flex-row items-center justify-center mt-4"
            onPress={handleSubmit}
            disabled={isLoginLoading}
          >
            {isLoginLoading ? (
              <View className="flex-row items-center justify-center">
                <Icon name="loader" size={20} color="black" className="animate-spin mr-2" />
                <Text className="text-black font-bold">Logging in...</Text>
              </View>
            ) : (
              <Text className="text-black font-bold">Log In</Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-auto pt-4 items-center">
          <Text className="text-center text-sm text-zinc-400">
            Don't have an account yet?{" "}
            <Text
              className="text-primary font-medium"
              onPress={() => navigation.navigate('SignUp')}
            >
              Sign up
            </Text>
          </Text>
        </View>

        <View className="mt-6 p-5 bg-zinc-900/60 rounded-xl">
          <Text className="text-lg text-primary font-semibold italic text-center">
            "The only bad workout is the one that didn't happen."
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;