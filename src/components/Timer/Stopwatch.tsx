// components/Timer/Stopwatch.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Button } from '../ui/Button';

interface StopwatchProps {
  stopwatch: number;
  stopwatchActive: boolean;
  startStopwatch: () => void;
  pauseStopwatch: () => void;
  resetStopwatch: () => void;
  addLap: () => void;
  laps: number[];
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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time - minutes * 6000) / 100);
    const hundredths = time - minutes * 6000 - seconds * 100;
    return `${pad(minutes)}:${pad(seconds)}.${pad(hundredths)}`;
  };

  return (
    <View className="w-full max-w-md items-center">
      <Animated.View
        entering={FadeIn.duration(300).springify()}
        style={animatedStyle}
        className="mb-6"
      >
        <Text className="text-6xl font-mono text-primary">
          {formatTime(stopwatch)}
        </Text>
      </Animated.View>

      <View className="flex-row gap-4 mb-8">
        {stopwatchActive ? (
          <Button
            onPress={pauseStopwatch}
            className="bg-zinc-800"
            textClassName="text-primary"
            icon={<Feather name="pause" size={20} color="#D6FC03" />}
            iconPosition="left"
          >
            <Text className="ml-2">Pause</Text>
          </Button>
        ) : (
          <Button
            onPress={startStopwatch}
            className="bg-primary"
            textClassName="text-black"
            icon={<Feather name="play" size={20} color="black" />}
            iconPosition="left"
          >
            <Text className="ml-2">Start</Text>
          </Button>
        )}

        <Button
          onPress={stopwatchActive ? addLap : resetStopwatch}
          className="bg-zinc-800"
          textClassName="text-white"
          icon={<Feather name={stopwatchActive ? "flag" : "rotate-ccw"} size={20} color="white" />}
          iconPosition="left"
        >
          <Text className="ml-2">{stopwatchActive ? "Lap" : "Reset"}</Text>
        </Button>
      </View>

      {laps.length > 0 && (
        <View className="w-full bg-zinc-900 rounded-lg p-4 mb-6">
          <Text className="text-white text-lg font-semibold mb-2">Laps</Text>

          <FlatList
            data={laps}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View className="flex-row justify-between py-2 border-b border-zinc-800">
                <Text className="text-zinc-400">Lap {laps.length - index}</Text>
                <Text className="text-white font-mono">{formatTime(item)}</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 12 }}
          />
        </View>
      )}
    </View>
  );
};