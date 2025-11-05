"use client";

import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const UpperNavBar = () => {
    const router = useRouter();
  return (
     <View className="bg-accent px-5 pt-4 pb-6 flex-row items-center justify-between">
      <View className="flex-row items-center">
        <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-3">
          <Text className="text-accent font-bold text-lg">CL</Text>
        </View>
        <View>
          <Text className="text-white font-bold text-base">Chhin Long</Text>
          <Text className="text-white text-xs opacity-80">
            Edu Space Classroom
          </Text>
        </View>
      </View>
      <View className="flex-row gap-3">
        <TouchableOpacity className="w-10 h-10 bg-white bg-opacity-30 rounded-full items-center justify-center">
          <Text className="text-white text-lg">🔔</Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 bg-white bg-opacity-30 rounded-full items-center justify-center">
          <Text className="text-white text-lg">👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default UpperNavBar