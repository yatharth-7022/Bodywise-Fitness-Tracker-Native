// Settings.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../interceptor";
import {
  API_CONFIG,
  GET_PROFILE_PICTURE,
  UPLOAD_PROFILE_PICTURE,
} from "../../api";
import { ROUTES } from "../../navigation/routes";
import { RootStackParamList } from "../../types/navigation";
import { useQuery } from "@tanstack/react-query";
import { firstLetterUppercase } from "../../utils/handlerFunctions";
import { AlertDialog, Button, Dialog, YStack } from "tamagui";
type SettingsScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export const Settings = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const { logout, isLoading, user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };
  const { data: profilePicture, refetch: refetchProfilePicture } = useQuery({
    queryKey: ["profilePicture"],
    queryFn: async () => {
      const response = await api.get(GET_PROFILE_PICTURE);
      return response?.data?.user;
    },
  });

  const handleUpload = async () => {
    if (!selectedImage) return;

    setIsUploading(true);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 300);

      // Create form data
      const formData = new FormData();
      const filename = selectedImage?.split("/").pop();

      // @ts-ignore
      formData.append("profilePicture", {
        uri: selectedImage,
        name: filename,
        type: "image/jpeg",
      });

      await api.post(UPLOAD_PROFILE_PICTURE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      refetchProfilePicture();
      setSelectedImage(null);
      Alert.alert("Success", "Profile picture updated successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to upload profile picture");
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const confirmLogout = () => {
    setDialogOpen(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        key="logout-dialog"
      >
        <Dialog.Portal>
          <Dialog.Overlay
            key="logout-dialog-overlay"
            className="bg-black/75 backdrop-blur-sm"
            animation="quick"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />

          <Dialog.Content
            key="logout-dialog-content"
            className="bg-zinc-900 px-10 py-10 rounded-lg"
            animation="bouncy"
            enterStyle={{ scale: 0.9, opacity: 0, y: 10 }}
            exitStyle={{ scale: 0.95, opacity: 0, y: 10 }}
          >
            <Dialog.Title className="text-xl font-bold text-white">
              Logout
            </Dialog.Title>
            <Dialog.Description className="text-gray-300 mt-2">
              Are you sure you want to logout?
            </Dialog.Description>
            <YStack marginTop="$4" space="$3">
              <Dialog.Close asChild>
                <Button onPress={logout} backgroundColor="$red10" size="$4">
                  Logout
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button size="$4">Cancel</Button>
              </Dialog.Close>
            </YStack>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
      {isLoading && (
        <View className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <View className="flex flex-col items-center gap-4">
            <ActivityIndicator size="large" color="#D6FC03" />
            <Text className="text-lg text-white font-medium">
              Logging out...
            </Text>
          </View>
        </View>
      )}
      <View className="px-6 py-4 flex flex-row items-center">
        <TouchableOpacity
          className="mr-2"
          onPress={() =>
            navigation.navigate("MainTabs", {
              screen: "Dashboard",
            })
          }
        >
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white">Settings</Text>
      </View>
      <View className="h-px bg-zinc-800 mb-6" />
      <ScrollView className="px-6">
        <View className="space-y-4 mb-6">
          <Text className="text-xl font-semibold text-primary">
            Profile Picture
          </Text>
          <View className="bg-zinc-900 rounded-lg p-6">
            <View className="flex flex-col items-center gap-6">
              <View className="relative">
                <View className="w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    source={
                      selectedImage
                        ? { uri: selectedImage }
                        : profilePicture?.profilePicture
                        ? { uri: profilePicture.profilePicture }
                        : require("../../assets/image/phyphoto.jpg")
                    }
                    className="w-full h-full"
                  />
                </View>
                <TouchableOpacity
                  className="absolute bottom-0 right-0 bg-primary rounded-full p-2"
                  onPress={pickImage}
                >
                  <Icon name="camera" size={16} color="black" />
                </TouchableOpacity>
              </View>

              {isUploading && (
                <View className="w-full mb-4">
                  <View className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-primary"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </View>
                </View>
              )}

              {selectedImage && (
                <TouchableOpacity
                  className="w-full bg-primary text-black font-bold py-3 rounded-md items-center disabled:bg-zinc-800 disabled:text-zinc-500"
                  onPress={handleUpload}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <View className="flex-row items-center gap-2">
                      <Icon name="upload" size={20} color="black" />
                      <Text className="text-black font-bold">Uploading...</Text>
                    </View>
                  ) : uploadProgress === 100 ? (
                    <View className="flex-row items-center gap-2">
                      <Icon name="check-circle" size={20} color="black" />
                      <Text className="text-black font-bold">Done!</Text>
                    </View>
                  ) : (
                    <Text className="text-black font-bold">
                      Update Profile Picture
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        <View className="space-y-4 mb-6">
          <Text className="text-xl font-semibold text-primary">Account</Text>
          <View className="bg-zinc-900 rounded-lg p-4 space-y-4">
            <View className="space-y-1">
              <Text className="text-sm font-medium text-zinc-400">
                Username
              </Text>
              <Text className="text-white">
                {firstLetterUppercase(user?.username)}
              </Text>
            </View>
            <View className="space-y-1">
              <Text className="text-sm font-medium text-zinc-400">Email</Text>
              <Text className="text-white">{user?.email}</Text>
            </View>
            <View className="space-y-1">
              <Text className="text-sm font-medium text-zinc-400">
                Account Type
              </Text>
              <Text className="text-white">Free Plan</Text>
            </View>
          </View>
        </View>

        <View className="space-y-4 mb-6">
          <Text className="text-xl font-semibold text-primary">
            Preferences
          </Text>
          <View className="bg-zinc-900 rounded-lg p-4 space-y-4">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="font-medium text-white">Dark Mode</Text>
                <Text className="text-sm text-zinc-400">
                  Toggle between light and dark theme
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#D6FC03" }}
                thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setIsDarkMode(!isDarkMode)}
                value={isDarkMode}
              />
            </View>

            <View className="flex-row items-center justify-between">
              <View>
                <Text className="font-medium text-white">Notifications</Text>
                <Text className="text-sm text-zinc-400">Workout reminders</Text>
              </View>
              <Switch
                trackColor={{ false: "#767577", true: "#D6FC03" }}
                thumbColor={true ? "#fff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => {}}
                value={true}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          className="bg-red-600 rounded-lg p-4 flex-row justify-center items-center mb-8"
          onPress={confirmLogout}
        >
          <Icon name="log-out" size={20} color="white" className="mr-2" />
          <Text className="text-white font-semibold text-base">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
