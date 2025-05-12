// components/Timer/Timer.tsx
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Button } from "../ui/Button";

interface TimerProps {
  setTimerFromInput: () => void;
  resetTimer: () => void;
  startTimer: () => void;
  setTimerInput: React.Dispatch<
    React.SetStateAction<{
      hours: string;
      minutes: string;
      seconds: string;
    }>
  >;
  timerInput: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  timerActive: boolean;
  pauseTimer: () => void;
  timer: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  pad: (n: number) => string;
}

export const Timer: React.FC<TimerProps> = ({
  setTimerFromInput,
  resetTimer,
  startTimer,
  setTimerInput,
  timerInput,
  timerActive,
  pauseTimer,
  timer,
  pad,
}) => {
  const scale = useSharedValue(0.9);

  React.useEffect(() => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={{ alignItems: "center", width: "100%" }}>
      <View
        style={{ flexDirection: "row", marginBottom: 30, alignItems: "center" }}
      >
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#a1a1aa", fontSize: 12, marginBottom: 4 }}>
            Hours
          </Text>
          <TextInput
            style={{
              backgroundColor: "#27272a",
              color: "white",
              padding: 12,
              borderRadius: 8,
              fontSize: 24,
              width: 80,
              textAlign: "center",
            }}
            keyboardType="number-pad"
            maxLength={2}
            value={timerInput.hours}
            onChangeText={(text) =>
              setTimerInput((prev) => ({
                ...prev,
                hours: text,
              }))
            }
          />
        </View>

        <Text style={{ color: "white", fontSize: 24, marginHorizontal: 10 }}>
          :
        </Text>

        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#a1a1aa", fontSize: 12, marginBottom: 4 }}>
            Minutes
          </Text>
          <TextInput
            style={{
              backgroundColor: "#27272a",
              color: "white",
              padding: 12,
              borderRadius: 8,
              fontSize: 24,
              width: 80,
              textAlign: "center",
            }}
            keyboardType="number-pad"
            maxLength={2}
            value={timerInput.minutes}
            onChangeText={(text) =>
              setTimerInput((prev) => ({
                ...prev,
                minutes: text,
              }))
            }
          />
        </View>

        <Text style={{ color: "white", fontSize: 24, marginHorizontal: 10 }}>
          :
        </Text>

        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#a1a1aa", fontSize: 12, marginBottom: 4 }}>
            Seconds
          </Text>
          <TextInput
            style={{
              backgroundColor: "#27272a",
              color: "white",
              padding: 12,
              borderRadius: 8,
              fontSize: 24,
              width: 80,
              textAlign: "center",
            }}
            keyboardType="number-pad"
            maxLength={2}
            value={timerInput.seconds}
            onChangeText={(text) =>
              setTimerInput((prev) => ({
                ...prev,
                seconds: text,
              }))
            }
          />
        </View>
      </View>

      {!timerActive ? (
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#D6FC03",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 8,
            }}
            onPress={() => {
              setTimerFromInput();
              startTimer();
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>Start</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: "#ef4444",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 8,
            }}
            onPress={resetTimer}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Reset</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 60, color: "white", marginBottom: 20 }}>
            {pad(timer.hours)}:{pad(timer.minutes)}:{pad(timer.seconds)}
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#ef4444",
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
              }}
              onPress={pauseTimer}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Pause</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: "#6b7280",
                paddingVertical: 12,
                paddingHorizontal: 24,
                borderRadius: 8,
              }}
              onPress={resetTimer}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
