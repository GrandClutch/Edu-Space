"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Bell, LogOut, User } from "lucide-react-native";
import { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

const UpperNavBar = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const handleImagePicker = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission not granted",
        "Please grant permission to access your media library"
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
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
    } finally {
      setIsLoggingOut(false);
    }
  };
  return (
    <View className="bg-accent px-5 pt-4 pb-6 flex-row items-center justify-between">
      <View className="flex-row items-center">
        {/* <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-3">
          <Text className="text-accent font-bold text-lg">CL</Text>
        </View> */}
        <TouchableOpacity onPress={handleImagePicker}>
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
        </TouchableOpacity>
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
