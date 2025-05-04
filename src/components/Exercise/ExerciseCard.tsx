// components/Exercise/ExerciseCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { ExerciseCard as ExerciseCardType } from '@/types/exercises';
import { firstLetterUppercase } from '@/utils/handlerFunctions';
import { Feather } from '@expo/vector-icons';

export const ExerciseCardContent = ({
  exercise,
  onClick,
}: {
  exercise: ExerciseCardType;
  onClick: () => void;
}) => {
  return (
    <TouchableOpacity
      className="bg-zinc-900 rounded-lg overflow-hidden flex-1"
      onPress={onClick}
      activeOpacity={0.7}
    >
      <View>
        <Image
          source={{ uri: `${exercise?.imageUrl}` }}
          className="w-full h-40"
          resizeMode="cover"
        />
      </View>
      <View className="p-4">
        <Text className="font-semibold text-lg mb-1 text-white">{exercise?.name}</Text>
        <Text className="text-gray-400 text-sm mb-2">
          {firstLetterUppercase(exercise?.bodyPart)}
        </Text>
        <View className="flex-row items-center text-gray-500 text-sm">
          <Feather name="clock" size={16} color="#6b7280" style={{ marginRight: 4 }} />
        </View>
      </View>
    </TouchableOpacity>
  );
};