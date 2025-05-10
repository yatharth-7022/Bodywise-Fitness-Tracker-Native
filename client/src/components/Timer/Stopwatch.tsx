// components/Timer/Stopwatch.tsx
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface StopwatchProps {
  stopwatch: {
    minutes: number;
    seconds: number;
    milliseconds: number;
  };
  stopwatchActive: boolean;
  startStopwatch: () => void;
  pauseStopwatch: () => void;
  resetStopwatch: () => void;
  addLap: () => void;
  laps: {
    minutes: number;
    seconds: number;
    milliseconds: number;
  }[];
  pad: (n: number) => string;
}

export const Stopwatch = ({
  stopwatch,
  stopwatchActive,
  startStopwatch,
  pauseStopwatch,
  resetStopwatch,
  addLap,
  laps,
  pad,
}: StopwatchProps) => {
  const scale = useSharedValue(0.9);

  React.useEffect(() => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const formatTime = (time: {
    minutes: number;
    seconds: number;
    milliseconds: number;
  }) => {
    return `${pad(time.minutes)}:${pad(time.seconds)}.${pad(
      time.milliseconds
    )}`;
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 60, color: "white", marginBottom: 20 }}>
        {formatTime(stopwatch)}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
        {stopwatchActive ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#ef4444",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 8,
            }}
            onPress={pauseStopwatch}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Pause</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#22c55e",
              paddingVertical: 12,
              paddingHorizontal: 24,
              borderRadius: 8,
            }}
            onPress={startStopwatch}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Start</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{
            backgroundColor: "#3b82f6",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
          }}
          onPress={addLap}
          disabled={!stopwatchActive}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Lap</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#6b7280",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
          }}
          onPress={resetStopwatch}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Reset</Text>
        </TouchableOpacity>
      </View>

      {laps.length > 0 && (
        <View style={{ marginTop: 20, width: "100%", maxHeight: 200 }}>
          <Text
            style={{ color: "white", marginBottom: 10, fontWeight: "bold" }}
          >
            Laps
          </Text>
          {laps.map((lap, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: "#3f3f46",
              }}
            >
              <Text style={{ color: "white" }}>Lap {laps.length - index}</Text>
              <Text style={{ color: "white" }}>{formatTime(lap)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};
