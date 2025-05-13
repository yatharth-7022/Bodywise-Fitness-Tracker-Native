// components/Exercise/AllExercises.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ExerciseCardContent } from "./ExerciseCard";
import { ExerciseDrawer } from "./ExerciseDrawer";
import { useExercises } from "../../hooks/useExercises";
import { headingText, normalText } from "../../utils/fontStyles";

const bodyParts = ["All", "Chest", "Back", "Arms", "Shoulders", "Legs"];

export const AllExercises = () => {
  const {
    allExercises,
    selectedExercise,
    showModal,
    activeFilter,
    handleExerciseClick,
    setShowModal,
    setActiveFilter,
    isLoadingAllExercises,
  } = useExercises();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredExercises = allExercises?.filter((exercise) => {
    const matchesBodyPart =
      activeFilter === "All" ||
      exercise?.bodyPart?.toLowerCase() === activeFilter.toLowerCase();

    const matchesSearch =
      searchQuery === "" ||
      exercise?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise?.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      exercise?.bodyPart?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBodyPart && matchesSearch;
  });

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      {isLoadingAllExercises && (
        <View className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center">
          <View className="flex flex-col items-center gap-4">
            <ActivityIndicator size="large" color="#D6FC03" />
            <Text style={normalText} className="text-lg text-white font-medium">
              Getting exercises...
            </Text>
          </View>
        </View>
      )}

      <View className="flex-1 pt-5 px-2">
        <View className="mb-6">
          <View className="flex-row gap-2 items-center mb-4">
            <Text
              style={headingText}
              className="text-2xl w-1/4 font-bold text-white"
            >
              Exercises
            </Text>
            <View className="relative w-3/4">
              <TextInput
                placeholder="Search exercises..."
                className="bg-gray-800 rounded-full h-11 py-2 px-10 text-sm text-white"
                placeholderTextColor="#9ca3af"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Feather
                name="search"
                size={16}
                color="#9ca3af"
                style={{ position: "absolute", left: 12, top: 14 }}
              />
            </View>
          </View>

          <FlatList
            horizontal
            data={bodyParts}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`px-4 py-2 rounded-full mr-2 ${
                  activeFilter === item ? "bg-blue-600" : "bg-gray-800"
                }`}
                onPress={() => setActiveFilter(item)}
              >
                <Text
                  style={normalText}
                  className={`text-sm ${
                    activeFilter === item ? "text-white" : "text-gray-300"
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
            className="pb-2"
          />
        </View>

        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ExerciseCardContent
              exercise={item}
              onClick={() => handleExerciseClick(item)}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 4, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <ExerciseDrawer
        exercise={selectedExercise}
        onClose={() => setShowModal(false)}
        isOpen={showModal}
      />
    </SafeAreaView>
  );
};
