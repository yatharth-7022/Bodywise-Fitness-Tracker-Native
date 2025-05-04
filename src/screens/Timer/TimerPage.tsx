// TimerPage.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import { ROUTES } from '@/routes/routes';
import { useTimer } from '@/hooks/useTimer';
import { Stopwatch } from '../../components/Timer/Stopwatch';
import { Timer } from '../../components/Timer/Timer';

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
  const tabPosition = useSharedValue(tab === 'timer' ? 0 : 1);

  // Update animation when tab changes
  React.useEffect(() => {
    tabPosition.value = tab === 'timer' ? 0 : 1;
  }, [tab, tabPosition]);

  // Animated style for the tab indicator
  const tabIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withSpring(tabPosition.value * 50 + '%', { damping: 20, stiffness: 300 }) }
      ],
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-zinc-950 text-white items-center justify-start py-8 px-4">
      <View className="w-full max-w-md flex-row items-center mb-8">
        <TouchableOpacity
          className="mr-2"
          onPress={() => navigation.navigate(ROUTES.DASHBOARD)}
        >
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white flex-row items-center">
          <Icon name="clock" size={20} color="#D6FC03" /> Timer & Stopwatch
        </Text>
      </View>

      <View className="w-full max-w-md flex-row relative mb-8">
        <TouchableOpacity
          className={`flex-1 py-2 text-lg font-semibold transition-colors`}
          onPress={() => setTab("timer")}
        >
          <Text className={tab === 'timer' ? "text-primary text-center" : "text-zinc-400 text-center"}>
            Timer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 py-2 text-lg font-semibold transition-colors`}
          onPress={() => setTab("stopwatch")}
        >
          <Text className={tab === 'stopwatch' ? "text-primary text-center" : "text-zinc-400 text-center"}>
            Stopwatch
          </Text>
        </TouchableOpacity>
        <Animated.View
          className="absolute bottom-0 h-1 w-1/2 bg-primary rounded-full"
          style={tabIndicatorStyle}
        />
      </View>

      {tab === "timer" ? (
        <Animated.View
          className="w-full items-center"
          entering={FadeIn}
          exiting={FadeOut}
        >
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
        <Animated.View
          className="w-full items-center"
          entering={FadeIn}
          exiting={FadeOut}
        >
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