// components/Timer/Timer.tsx
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Button } from '../ui/Button';

interface TimerProps {
  setTimerFromInput: () => void;
  resetTimer: () => void;
  startTimer: () => void;
  setTimerInput: React.Dispatch<
    React.SetStateAction<{
      min: number;
      sec: number;
    }>
  >;
  timerInput: {
    min: number;
    sec: number;
  };
  timerActive: boolean;
  pauseTimer: () => void;
  timer: number;
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
    <View className="w-full max-w-md">
      <Animated.View
        entering={FadeIn.duration(300).springify()}
        exiting={FadeOut.duration(300)}
        className="w-full items-center"
      >
        <View className="flex-row gap-4 mb-6 items-center">
          <TextInput
            keyboardType="numeric"
            value={String(timerInput.min)}
            onChangeText={(text) =>
              setTimerInput((prev) => ({
                ...prev,
                min: Math.max(0, Math.min(99, Number(text) || 0)),
              }))
            }
            className="w-16 h-16 text-3xl bg-zinc-900 border-0 rounded-lg text-center text-primary focus:border-2 focus:border-primary"
            editable={!timerActive}
            maxLength={2}
          />
          <Text className="text-3xl text-zinc-400">:</Text>
          <TextInput
            keyboardType="numeric"
            value={String(timerInput.sec)}
            onChangeText={(text) =>
              setTimerInput((prev) => ({
                ...prev,
                sec: Math.max(0, Math.min(59, Number(text) || 0)),
              }))
            }
            className="w-16 h-16 text-3xl bg-zinc-900 border-0 rounded-lg text-center text-primary focus:border-2 focus:border-primary"
            editable={!timerActive}
            maxLength={2}
          />
        </View>

        <Button
          onPress={setTimerFromInput}
          disabled={timerActive}
          className="mb-6 bg-primary"
          textClassName="text-black"
        >
          Set Timer
        </Button>

        <Animated.View style={animatedStyle} className="mb-8">
          <Text className="text-6xl font-mono text-primary">
            {pad(Math.floor(timer / 60))}:{pad(timer % 60)}
          </Text>
        </Animated.View>

        <View className="flex-row gap-4">
          {timerActive ? (
            <Button
              onPress={pauseTimer}
              className="bg-zinc-800"
              textClassName="text-primary"
              icon={<Feather name="pause" size={20} color="#D6FC03" />}
              iconPosition="left"
            >
              <Text className="ml-2">Pause</Text>
            </Button>
          ) : (
            <Button
              onPress={startTimer}
              className="bg-primary"
              textClassName="text-black"
              disabled={timer === 0}
              icon={<Feather name="play" size={20} color="black" />}
              iconPosition="left"
            >
              <Text className="ml-2">Start</Text>
            </Button>
          )}
          <Button
            onPress={resetTimer}
            className="bg-zinc-800"
            textClassName="text-zinc-400"
            icon={<Feather name="rotate-ccw" size={20} color="#a1a1aa" />}
            iconPosition="left"
          >
            <Text className="ml-2">Reset</Text>
          </Button>
        </View>
      </Animated.View>
    </View>
  );
};