import React from "react";
import { View } from "react-native";
import { ToastExample } from "../components/ToastExample";

export const ToastExampleScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#111" }}>
      <ToastExample />
    </View>
  );
};
