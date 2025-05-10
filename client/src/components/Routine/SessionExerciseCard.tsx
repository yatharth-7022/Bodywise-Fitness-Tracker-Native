import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { Exercise } from "../../types/routine";

// First define the SessionSetRow component
interface SetRowProps {
  set: {
    weight: number;
    reps: number;
    isCompleted: boolean;
  };
  idx: number;
  onChange: (
    field: "kg" | "reps" | "isCompleted",
    value: number | boolean
  ) => void;
}

const SessionSetRow: React.FC<SetRowProps> = ({ set, idx, onChange }) => {
  return (
    <View
      className={`flex-row items-center justify-between p-3 rounded-lg mb-2 ${
        set.isCompleted
          ? "bg-zinc-800/40 border border-green-500/30"
          : "bg-zinc-800"
      }`}
    >
      <View className="flex-row items-center flex-1">
        <Text className="text-zinc-400 mr-3 w-10">Set {idx + 1}</Text>

        <View className="flex-row">
          <View className="items-center mr-4">
            <Text className="text-zinc-400 text-xs mb-1">Weight</Text>
            <TouchableOpacity
              className="bg-zinc-700 w-16 h-8 rounded items-center justify-center"
              onPress={() => onChange("kg", set.weight + 2.5)}
            >
              <Text className="text-white">{set.weight} kg</Text>
            </TouchableOpacity>
          </View>

          <View className="items-center">
            <Text className="text-zinc-400 text-xs mb-1">Reps</Text>
            <TouchableOpacity
              className="bg-zinc-700 w-16 h-8 rounded items-center justify-center"
              onPress={() => onChange("reps", set.reps + 1)}
            >
              <Text className="text-white">{set.reps}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => onChange("isCompleted", !set.isCompleted)}
        className="p-2"
      >
        {set.isCompleted ? (
          <Feather name="check-circle" size={22} color="#10b981" />
        ) : (
          <Feather name="circle" size={22} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

// Main SessionExerciseCard component
interface SessionExerciseCardProps {
  exercise: Exercise;
  exerciseIdx: number;
  onSetChange: (
    exerciseIdx: number,
    setIdx: number,
    field: "kg" | "reps" | "isCompleted",
    value: number | boolean
  ) => void;
  onAddSet: (exerciseIdx: number) => void;
}

const SessionExerciseCard: React.FC<SessionExerciseCardProps> = ({
  exercise,
  exerciseIdx,
  onSetChange,
  onAddSet,
}) => {
  const apiUrl = "https://your-api-url.com"; // Replace with your actual API URL

  return (
    <View className="bg-zinc-900 rounded-xl shadow p-4 mb-4">
      <View className="flex-row items-center gap-3 mb-3">
        <View className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 items-center justify-center">
          {exercise?.exercise?.imageUrl ? (
            <Image
              source={{ uri: `${apiUrl}/${exercise.exercise.imageUrl}` }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <Text className="text-zinc-400">No Img</Text>
          )}
        </View>
        <View>
          <Text className="font-semibold text-lg text-white">
            {exercise.exercise.name}
          </Text>
          <Text className="text-zinc-400 text-xs">
            {exercise.exercise.bodyPart}
          </Text>
        </View>
      </View>

      <View>
        {exercise.exerciseSets?.map((set, setIdx) => (
          <SessionSetRow
            key={setIdx}
            set={set}
            idx={setIdx}
            onChange={(field, value) =>
              onSetChange(exerciseIdx, setIdx, field, value)
            }
          />
        ))}

        <TouchableOpacity
          className="mt-2 flex-row items-center justify-center py-2 rounded bg-zinc-800"
          onPress={() => onAddSet(exerciseIdx)}
        >
          <Feather name="plus" size={16} color="#d6fc03" />
          <Text className="ml-2 text-lime-400">Add Set</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SessionExerciseCard;
