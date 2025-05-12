// components/Exercise/ExerciseDrawer.tsx
import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  Image,
  Button,
  Alert,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { Feather } from "@expo/vector-icons";
import { ExerciseCard } from "../../types/exercises";
import { firstLetterUppercase } from "../../utils/handlerFunctions";
import config from "../../../config";
import YoutubePlayer from "react-native-youtube-iframe";

interface ExerciseDrawerProps {
  exercise: ExerciseCard | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExerciseDrawer = ({
  exercise,
  isOpen,
  onClose,
}: ExerciseDrawerProps) => {
  if (!exercise) return null;
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});

  // Extract YouTube video ID from embed URL
  const getYoutubeVideoId = (url: string | undefined): string | null => {
    if (!url) return null;

    // Match patterns like youtube.com/embed/VIDEO_ID or youtu.be/VIDEO_ID
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const videoId = getYoutubeVideoId(exercise.videoUrl);

  // Use thumbnail image URL for YouTube video
  const getThumbnailUrl = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50  justify-end">
        <View className="bg-zinc-900 h-3/4 rounded-t-3xl">
          <ScrollView className="flex-1  rounded-t-3xl">
            <View className="relative">
              {videoId ? (
                <View className="w-full" style={{ height: 220 }}>
                  <YoutubePlayer
                    height={300}
                    play={playing}
                    videoId={videoId}
                    onChangeState={onStateChange}
                  />
                </View>
              ) : exercise.imageUrl ? (
                <Image
                  source={{ uri: `${config.API_URL}${exercise.imageUrl}` }}
                  className="w-full h-64"
                  resizeMode="cover"
                />
              ) : null}
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
                  <Text className="text-2xl font-bold text-white">
                    {exercise.name}
                  </Text>
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
                  <Text className="text-white font-semibold">Bodyweight</Text>
                </View>
                <View className="items-center">
                  <Text className="text-zinc-400 text-sm mb-1">Difficulty</Text>
                  <Text className="text-white font-semibold">Intermediate</Text>
                </View>
              </View>

              <View className="mb-6">
                <Text className="text-lg font-semibold mb-2 text-white">
                  Description
                </Text>
                <Text className="text-zinc-400 leading-5">
                  {exercise.description ||
                    "No description available for this exercise."}
                </Text>
              </View>

              <View className="mb-6">
                <Text className="text-lg font-semibold mb-2 text-white">
                  Instructions
                </Text>
                <View className="space-y-2">
                  <Text className="text-zinc-400">
                    No instructions available for this exercise.
                  </Text>
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
