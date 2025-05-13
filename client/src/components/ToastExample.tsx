import React from "react";
import { Button, YStack, Text } from "tamagui";
import { useToastController } from "@tamagui/toast";

export const ToastExample = () => {
  const toast = useToastController();

  const showSuccessToast = () => {
    toast.show("Success!", {
      message: "Your action was completed successfully.",
      duration: 5000, // 5 seconds
    });
  };

  const showErrorToast = () => {
    toast.show("Error!", {
      message: "Something went wrong. Please try again.",
      duration: 5000,
    });
  };

  const showInfoToast = () => {
    toast.show("Information", {
      message: "This is an informational message.",
      duration: 5000,
    });
  };

  return (
    <YStack space="$4" padding="$4">
      <Text fontSize="$6" fontWeight="bold">
        Toast Examples
      </Text>

      <Button theme="green" onPress={showSuccessToast}>
        Show Success Toast
      </Button>

      <Button theme="red" onPress={showErrorToast}>
        Show Error Toast
      </Button>

      <Button theme="blue" onPress={showInfoToast}>
        Show Info Toast
      </Button>
    </YStack>
  );
};
