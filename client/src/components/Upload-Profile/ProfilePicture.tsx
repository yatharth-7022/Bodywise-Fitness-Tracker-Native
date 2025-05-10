// components/Upload-Profile/ProfilePicture.tsx
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

interface ProfilePictureProps {
  src?: string | null;
  size?: "sm" | "md" | "lg";
  style?: object;
}

export const ProfilePicture = ({
  src,
  size = "md",
  style = {},
}: ProfilePictureProps) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return { width: 32, height: 32 };
      case "md":
        return { width: 40, height: 40 };
      case "lg":
        return { width: 128, height: 128 };
      default:
        return { width: 40, height: 40 };
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return 16;
      case "md":
        return 20;
      case "lg":
        return 64;
      default:
        return 20;
    }
  };

  return (
    <View style={[styles.container, getSize(), style]}>
      {src ? (
        <Image source={{ uri: src }} style={styles.image} />
      ) : (
        <Feather name="user" size={getIconSize()} color="#D6FC03" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "#27272a",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
