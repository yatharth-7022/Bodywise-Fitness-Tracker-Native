// TimerPage.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import { ROUTES } from "../../navigation/routes";
import { useTimer } from "../../hooks/useTimer";
import { Stopwatch } from "../../components/Timer/Stopwatch";
import { Timer } from "../../components/Timer/Timer";

const pad = (n: number) => n.toString().padStart(2, "0");

export const TimerPage = () => {
  const navigation = useNavigation();
  const {
    pauseTimer,
    addLap,
    resetStopwatch,
    pauseStopwatch,
    startStopwatch,
    laps,
    setTimerFromInput,
    resetTimer,
    startTimer,
    setTimerInput,
    tab,
    setTab,
    timerInput,
    timerActive,
    stopwatchActive,
    stopwatch,
    timer,
  } = useTimer();

  // For animated tab indicator
  const tabPosition = useSharedValue(tab === "timer" ? 0 : 1);

  // Update animation when tab changes
  React.useEffect(() => {
    tabPosition.value = tab === "timer" ? 0 : 1;
  }, [tab, tabPosition]);

  // Animated style for the tab indicator
  const tabIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(tabPosition.value * 50, {
            damping: 20,
            stiffness: 300,
          }),
        },
      ],
    };
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#0D1B2A",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 32,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          width: "100%",
          maxWidth: 400,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <TouchableOpacity
          style={{ marginRight: 8 }}
          onPress={() => navigation.navigate(ROUTES.DASHBOARD as never)}
        >
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <View className="flex-row items-center gap-2">
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "white",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            Timer & Stopwatch
          </Text>
          <Icon name="clock" size={20} color="#1d4ed8" />
        </View>
      </View>

      <View
        style={{
          width: "100%",
          maxWidth: 400,
          flexDirection: "row",
          position: "relative",
          marginBottom: 32,
        }}
      >
        <TouchableOpacity
          style={{ flex: 1, paddingVertical: 8 }}
          onPress={() => setTab("timer")}
        >
          <Text
            style={{
              color: tab === "timer" ? "#3b82f6" : "#a1a1aa",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Timer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, paddingVertical: 8 }}
          onPress={() => setTab("stopwatch")}
        >
          <Text
            style={{
              color: tab === "stopwatch" ? "#3b82f6" : "#a1a1aa",
              textAlign: "center",
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Stopwatch
          </Text>
        </TouchableOpacity>
        <View
          style={[
            {
              position: "absolute",
              bottom: 0,
              height: 4,
              width: "50%",
              backgroundColor: "#1d4ed8",
              borderRadius: 2,
            },
            tabIndicatorStyle,
          ]}
        />
      </View>

      {tab === "timer" ? (
        <Animated.View style={{ width: "100%", alignItems: "center" }}>
          <Timer
            setTimerFromInput={setTimerFromInput}
            resetTimer={resetTimer}
            startTimer={startTimer}
            setTimerInput={setTimerInput}
            timerInput={timerInput}
            timerActive={timerActive}
            pauseTimer={pauseTimer}
            timer={timer}
            pad={pad}
          />
        </Animated.View>
      ) : (
        <Animated.View style={{ width: "100%", alignItems: "center" }}>
          <Stopwatch
            laps={laps}
            pad={pad}
            addLap={addLap}
            resetStopwatch={resetStopwatch}
            stopwatchActive={stopwatchActive}
            stopwatch={stopwatch}
            pauseStopwatch={pauseStopwatch}
            startStopwatch={startStopwatch}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
};
