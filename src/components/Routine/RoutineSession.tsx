// components/Routine/RoutineSession.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDashboard } from '@/hooks/useDashboard';
import { ROUTES } from '@/routes/routes';
import { firstLetterUppercase } from '@/utils/handlerFunctions';

const RoutineSession = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, title } = route.params;

  const { routineById, isRoutineLoading, startSession, sessionData, isSessionLoading } = useDashboard();
  const [showRestTimer, setShowRestTimer] = useState(false);
  const [restTime, setRestTime] = useState(60);
  const [isResting, setIsResting] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState<Record<string, boolean[]>>({});

  React.useEffect(() => {
    startSession(id);
  }, [id]);

  const handleCompleteSet = (exerciseId: number, setIndex: number) => {
    setCompletedSets((prev) => {
      const exerciseSets = prev[exerciseId] || Array(5).fill(false);
      const updatedSets = [...exerciseSets];
      updatedSets[setIndex] = !updatedSets[setIndex];

      return {
        ...prev,
        [exerciseId]: updatedSets,
      };
    });

    // Show rest timer after completing a set
    setShowRestTimer(true);
  };

  const startRestTimer = () => {
    setIsResting(true);
    setShowRestTimer(false);

    // Logic for counting down rest timer would go here
    setTimeout(() => {
      setIsResting(false);
    }, restTime * 1000);
  };

  if (isRoutineLoading || isSessionLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-950">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="text-white mt-4">Preparing your workout...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <View className="flex-row items-center px-4 py-3 border-b border-zinc-800">
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "End Workout",
              "Are you sure you want to end this workout?",
              [
                { text: "Cancel", style: "cancel" },
                { text: "End Workout", onPress: () => navigation.navigate(ROUTES.DASHBOARD) }
              ]
            );
          }}
          className="mr-4"
        >
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-white flex-1">{title} Workout</Text>
        <View className="flex-row items-center">
          <Feather name="clock" size={16} color="white" />
          <Text className="text-white ml-1">25:43</Text>
        </View>
      </View>

      {isResting && (
        <View className="bg-blue-600 px-4 py-2 flex-row justify-between items-center">
          <Text className="text-white font-medium">Rest Timer: 00:{restTime}s</Text>
          <TouchableOpacity onPress={() => setIsResting(false)}>
            <Text className="text-white">Skip</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView className="flex-1 px-4">
        {sessionData?.exercise?.map((exercise, index) => (
          <View key={exercise.id} className="mt-6">
            <View className="flex-row items-center mb-2">
              <View
                className={`w-6 h-6 rounded-full items-center justify-center mr-2 ${
                  index === currentExerciseIndex ? "bg-blue-600" : "bg-zinc-700"
                }`}
              >
                <Text className="text-white font-semibold">{index + 1}</Text>
              </View>
              <Text className="text-lg font-semibold text-white">
                {exercise.exercise.name}
              </Text>
            </View>

            <View className="mb-4">
              <Text className="text-zinc-400 text-sm">
                {firstLetterUppercase(exercise.exercise.bodyPart)} • {exercise.sets.length} sets
              </Text>
            </View>

            {exercise.sets.map((set, setIndex) => (
              <View
                key={setIndex}
                className={`flex-row items-center justify-between p-3 mb-3 rounded-lg ${
                  completedSets[exercise.id]?.[setIndex]
                    ? "bg-zinc-800/30 border border-green-500/30"
                    : "bg-zinc-800"
                }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-zinc-400 w-10">Set {setIndex + 1}</Text>
                  <View className="flex-row ml-4">
                    <View className="items-center mr-6">
                      <Text className="text-zinc-400 text-xs mb-1">Weight</Text>
                      <TextInput
                        value={set.weight.toString()}
                        onChangeText={(text) => {
                          // Handle weight change
                        }}
                        keyboardType="numeric"
                        className="bg-zinc-700 text-white rounded w-16 h-8 text-center"
                      />
                    </View>
                    <View className="items-center">
                      <Text className="text-zinc-400 text-xs mb-1">Reps</Text>
                      <TextInput
                        value={set.reps.toString()}
                        onChangeText={(text) => {
                          // Handle reps change
                        }}
                        keyboardType="numeric"
                        className="bg-zinc-700 text-white rounded w-16 h-8 text-center"
                      />
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => handleCompleteSet(exercise.id, setIndex)}
                  className="p-2"
                >
                  {completedSets[exercise.id]?.[setIndex] ? (
                    <Feather name="check-circle" size={24} color="#10b981" />
                  ) : (
                    <Feather name="circle" size={24} color="white" />
                  )}
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              className="flex-row items-center justify-center p-2 mb-6 border border-dashed border-zinc-700 rounded-lg"
            >
              <Feather name="plus" size={18} color="#9ca3af" />
              <Text className="text-zinc-400 ml-2">Add Set</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View className="p-4 border-t border-zinc-800">
        <TouchableOpacity className="bg-blue-600 py-3 rounded-lg items-center">
          <Text className="text-white font-medium">Complete Workout</Text>
        </TouchableOpacity>
      </View>

      {/* Rest Timer Modal */}
      <Modal
        visible={showRestTimer}
        transparent={true}
        animationType="fade"
      >
        <View className="flex-1 bg-black/50 items-center justify-center p-4">
          <View className="bg-zinc-900 w-full max-w-xs rounded-xl p-6">
            <Text className="text-white text-lg font-bold mb-4 text-center">Rest Timer</Text>

            <View className="flex-row items-center justify-between bg-zinc-800 rounded-lg p-2 mb-6">
              <TouchableOpacity onPress={() => setRestTime(Math.max(restTime - 15, 15))}>
                <Feather name="minus" size={20} color="white" />
              </TouchableOpacity>
              <Text className="text-xl font-semibold text-white">{restTime}s</Text>
              <TouchableOpacity onPress={() => setRestTime(restTime + 15)}>
                <Feather name="plus" size={20} color="white" />
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={() => setShowRestTimer(false)}
                className="flex-1 py-3 border border-zinc-700 rounded-lg items-center"
              >
                <Text className="text-white">Skip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={startRestTimer}
                className="flex-1 py-3 bg-blue-600 rounded-lg items-center"
              >
                <Text className="text-white font-medium">Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RoutineSession;