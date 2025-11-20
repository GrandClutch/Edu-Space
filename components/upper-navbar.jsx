"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { Bell, LogOut, User } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

const UpperNavBar = () => {
  const [profileImage, setProfileImage] = useState(null);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadProfileImage();
    }, [])
  );

  const loadProfileImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem("profileImage");
      if (savedImage) {
        setProfileImage(savedImage);
      }
    } catch (error) {
      console.error("Error loading profile image:", error);
    }
  };

  const handleLogout = () => {
    try {
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
    }
  };
  return (
    <View className="bg-accent px-5 pt-4 pb-6 flex-row items-center justify-between">
      <View className="flex-row items-center">
        {/* <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-3">
          <Text className="text-accent font-bold text-lg">CL</Text>
        </View> */}
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            className="w-12 h-12 rounded-full mr-3"
          />
        ) : (
          <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-3">
            <Text className="text-accent font-bold text-lg">CL</Text>
          </View>
        )}
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
        <TouchableOpacity
          className="w-10 h-10 bg-white bg-opacity-30 rounded-full items-center justify-center"
          onPress={() => router.push("/profile")}
        >
          <User color={"#10266F"} />
        </TouchableOpacity>
        <TouchableOpacity
          className="w-10 h-10 bg-white bg-opacity-30 rounded-full items-center justify-center"
          onPress={handleLogout}
        >
          <LogOut color={"red"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpperNavBar;
