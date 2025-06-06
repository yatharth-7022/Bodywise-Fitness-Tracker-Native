// components/Dashboard/WorkoutCard.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { headingText, normalText } from "../../utils/fontStyles";

// Define the navigation param list
// type RootStackParamList = {
//   Routine: {
//     id: number;
//     title: string;
//   };
// };

// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface WorkoutCardProps {
  id: number;
  title: string;
  duration: string;
  calories: string;
  image: string;
  description: string;
}

export const WorkoutCard = ({
  id,
  title,
  duration,
  calories,
  image,
  description,
}: WorkoutCardProps) => {
  const navigation = useNavigation();
  console.log({ image });

  return (
    <TouchableOpacity
      className="w-64 h-fit bg-card rounded-lg overflow-hidden mr-4 border border-border"
      onPress={() =>
        navigation.navigate("WorkoutStack", {
          screen: "Routine",
          params: { id },
        })
      }
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: image }}
        className="w-full h-28"
        resizeMode="cover"
      />
      <View className="p-3">
        <Text style={headingText} className="text-white mb-1">
          {title}
        </Text>
        <Text
          style={normalText}
          className="text-zinc-400 text-sm mb-2"
          numberOfLines={1}
        >
          {description}
        </Text>
        <View className="flex-row gap-3 mt-auto">
          <View className="flex-row items-center">
            <Feather name="clock" size={12} color="#a1a1aa" />
            <Text style={normalText} className="text-zinc-400 text-xs ml-1">
              {duration}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Feather name="zap" size={12} color="#a1a1aa" />
            <Text style={normalText} className="text-zinc-400 text-xs ml-1">
              {calories}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
