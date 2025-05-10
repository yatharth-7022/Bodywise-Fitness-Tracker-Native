import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "../../navigation/routes";
import api from "../../interceptor";

import Animated, {
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { UPLOAD_PROFILE_PICTURE } from "../../api";

const UploadProfile = () => {
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Animation values
  const scale = useSharedValue(0.9);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 100 });

    // Request permission for the camera and photo library
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission required",
            "Sorry, we need camera roll permissions to upload photos!"
          );
        }
      }
    })();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error picking image:", error);
      Alert.alert("Error", "Failed to pick an image");
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Camera permission is required to take a photo"
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log("Error taking photo:", error);
      Alert.alert("Error", "Failed to take a photo");
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return;

    setIsUploading(true);

    try {
      // Show progress animation
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newValue = prev + 5;
          return newValue > 90 ? 90 : newValue;
        });
      }, 200);

      // Create form data for the image
      const formData = new FormData();
      const filename = selectedImage.split("/").pop() || "photo.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";

      // @ts-ignore - FormData expects a Blob but React Native uses the uri format
      formData.append("profilePicture", {
        uri: selectedImage,
        name: filename,
        type,
      });

      // Upload the image
      await api.post(UPLOAD_PROFILE_PICTURE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Success - complete the progress bar animation
      clearInterval(progressInterval);
      setUploadProgress(100);

      setTimeout(() => {
        Alert.alert("Success", "Profile picture uploaded successfully!");
        navigation.navigate(ROUTES.DASHBOARD as never);
      }, 1000);
    } catch (error) {
      console.log("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload profile picture");
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.content, animatedStyle]}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Feather name="camera" size={32} color="#000" />
          </View>
          <Text style={styles.title}>Add Your Profile Picture</Text>
          <Text style={styles.subtitle}>
            Let's make your profile more personal
          </Text>
        </View>

        <TouchableOpacity
          style={styles.imageContainer}
          onPress={pickImage}
          activeOpacity={0.8}
        >
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.previewImage}
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Feather name="image" size={50} color="#a1a1aa" />
              <Text style={styles.placeholderText}>Tap to select a photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.option, styles.galleryOption]}
            onPress={pickImage}
          >
            <Feather name="image" size={24} color="#fff" />
            <Text style={styles.optionText}>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, styles.cameraOption]}
            onPress={takePhoto}
          >
            <Feather name="camera" size={24} color="#fff" />
            <Text style={styles.optionText}>Camera</Text>
          </TouchableOpacity>
        </View>

        {uploadProgress > 0 && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View
                style={[styles.progressBar, { width: `${uploadProgress}%` }]}
              />
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[
            styles.uploadButton,
            (!selectedImage || isUploading) && styles.disabledButton,
          ]}
          onPress={uploadImage}
          disabled={!selectedImage || isUploading}
        >
          {isUploading ? (
            <View style={styles.buttonContent}>
              <ActivityIndicator size="small" color="#000" />
              <Text style={styles.buttonText}>Uploading...</Text>
            </View>
          ) : uploadProgress === 100 ? (
            <View style={styles.buttonContent}>
              <Feather name="check-circle" size={20} color="#000" />
              <Text style={styles.buttonText}>Done!</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>Upload & Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 16,
    justifyContent: "center",
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    backgroundColor: "#D6FC03",
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#a1a1aa",
    textAlign: "center",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#3f3f46",
    marginBottom: 24,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  placeholderText: {
    marginTop: 16,
    fontSize: 16,
    color: "#a1a1aa",
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  galleryOption: {
    backgroundColor: "#3b82f6",
  },
  cameraOption: {
    backgroundColor: "#3f3f46",
  },
  optionText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "500",
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBackground: {
    height: 8,
    backgroundColor: "#3f3f46",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#D6FC03",
  },
  uploadButton: {
    backgroundColor: "#D6FC03",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#3f3f46",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 8,
  },
});

export default UploadProfile;
