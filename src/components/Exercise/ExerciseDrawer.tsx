// components/Exercise/ExerciseDrawer.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { firstLetterUppercase } from '@/utils/handlerFunctions';
import { ExerciseCard } from '@/types/exercises';

interface ExerciseDrawerProps {
  exercise: ExerciseCard | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExerciseDrawer = ({ exercise, isOpen, onClose }: ExerciseDrawerProps) => {
  if (!exercise) return null;

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-zinc-900 rounded-t-3xl h-3/4">
          <ScrollView className="flex-1">
            <View className="relative">
              <Image
                source={{ uri: `${exercise.imageUrl}` }}
                className="w-full h-64"
                resizeMode="cover"
              />
              <TouchableOpacity
                className="absolute top-4 right-4 bg-black/30 rounded-full p-2"
                onPress={onClose}
              >
                <Feather name="x" size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View className="p-6">
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Text className="text-2xl font-bold text-white">{exercise.name}</Text>
                  <Text className="text-blue-500">
                    {firstLetterUppercase(exercise.bodyPart)} Exercise
                  </Text>
                </View>
                <TouchableOpacity className="bg-zinc-800 rounded-full p-3">
                  <Feather name="bookmark" size={20} color="white" />
                </TouchableOpacity>
              </View>

              <View className="flex-row justify-between bg-zinc-800 rounded-lg p-4 mb-6">
                <View className="items-center">
                  <Text className="text-zinc-400 text-sm mb-1">Target</Text>
                  <Text className="text-white font-semibold">
                    {firstLetterUppercase(exercise.bodyPart)}
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-zinc-400 text-sm mb-1">Equipment</Text>
                  <Text className="text-white font-semibold">
                    {exercise.equipment || "Bodyweight"}
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-zinc-400 text-sm mb-1">Difficulty</Text>
                  <Text className="text-white font-semibold">Intermediate</Text>
                </View>
              </View>

              <View className="mb-6">
                <Text className="text-lg font-semibold mb-2 text-white">Description</Text>
                <Text className="text-zinc-400 leading-5">
                  {exercise.description || "No description available for this exercise."}
                </Text>
              </View>

              <View className="mb-6">
                <Text className="text-lg font-semibold mb-2 text-white">Instructions</Text>
                <View className="space-y-2">
                  {exercise.instructions ? (
                    exercise.instructions.split('\n').map((step, index) => (
                      <View key={index} className="flex-row items-start">
                        <View className="bg-blue-600 w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5">
                          <Text className="text-white font-bold">{index + 1}</Text>
                        </View>
                        <Text className="flex-1 text-zinc-300">{step.trim()}</Text>
                      </View>
                    ))
                  ) : (
                    <Text className="text-zinc-400">No instructions available for this exercise.</Text>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>

          <View className="p-4 border-t border-zinc-800">
            <TouchableOpacity className="bg-blue-600 py-4 rounded-lg items-center">
              <Text className="text-white font-semibold">Add to Routine</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};