"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Bell, LogOut } from "lucide-react-native";
import { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const UpperNavBar = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const handleLogout = () => {
    try {
      setIsLoggingOut(true);
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            style: "destructive",
            onPress: async () => {
              await AsyncStorage.removeItem("idToken");
              router.replace("/login");
            },
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    }finally{
      setIsLoggingOut(false);
    }
  };
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
        <TouchableOpacity className="w-10 h-10 bg-white bg-opacity-30 rounded-full items-center justify-center text-primary">
          <Bell color={"#10266F"} />
        </TouchableOpacity>
        {/* <TouchableOpacity className="w-10 h-10 bg-white bg-opacity-30 rounded-full items-center justify-center">
          <User color={"#10266F"} />
        </TouchableOpacity> */}
        <TouchableOpacity className="w-10 h-10 bg-white bg-opacity-30 rounded-full items-center justify-center" onPress={handleLogout}>
          <LogOut color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpperNavBar;
