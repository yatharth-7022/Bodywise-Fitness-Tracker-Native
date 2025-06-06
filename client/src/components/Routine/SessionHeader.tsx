import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { headingText, normalText } from "../../utils/fontStyles";

interface SessionHeaderProps {
  routineName: string;
}

const SessionHeader: React.FC<SessionHeaderProps> = ({ routineName }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between px-4 py-4 bg-zinc-900 border-b border-zinc-800">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={headingText} className="text-xl font-bold text-white">
          {routineName}
        </Text>
      </View>

      <View className="flex-row items-center gap-2">
        <Feather name="clock" size={20} color="#d6fc03" />
        <Text
          style={[normalText, { fontVariant: ["tabular-nums"] }]}
          className="text-lg text-lime-400"
        >
          00:00
        </Text>
      </View>
    </View>
  );
};

export default SessionHeader;
