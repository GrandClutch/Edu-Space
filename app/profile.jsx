"use client";

import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ClipboardClock,
  Mail,
  MapPin,
  Phone,
} from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavBar from "../components/bottom-navbar";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
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

  return (
    <View className="flex-1 bg-lightBg pb-4">
      <View className="bg-accent px-5 pt-12 pb-8">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mb-4 w-10 h-10 bg-white bg-opacity-30 rounded-full items-center justify-center"
        >
          <ArrowLeft color="#1E80C9" size={24} />
        </TouchableOpacity>
        <View className="items-center">
          {/* <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-3">
            <Text className="text-accent font-bold text-3xl">CL</Text>
          </View> */}
          <TouchableOpacity onPress={handleImagePicker}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                className="w-12 h-12 rounded-full mr-3"
              />
            ) : (
              <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-3">
                <Text className="text-accent font-bold text-3xl">CL</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text className="text-white font-bold text-2xl">Chhin Long</Text>
          <Text className="text-white text-sm opacity-90 mt-1">
            Role: Student
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-5 pt-6">
        <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
          <Text className="text-primary font-bold text-lg mb-4">
            Personal Information
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-accent bg-opacity-20 rounded-full items-center justify-center mr-3">
                <Mail color="#FFFFFF" size={20} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-xs mb-1">Email</Text>
                <Text className="text-primary font-medium">
                  chhinlong@eduspace.edu.kh
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-accent bg-opacity-20 rounded-full items-center justify-center mr-3">
                <Phone color="#FFFFFF" size={20} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-xs mb-1">Phone</Text>
                <Text className="text-primary font-medium">
                  +855 12 345 678
                </Text>
              </View>
            </View>

            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-accent bg-opacity-20 rounded-full items-center justify-center mr-3">
                <Calendar color="#FFFFFF" size={20} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-xs mb-1">
                  Date of Birth
                </Text>
                <Text className="text-primary font-medium">
                  January 15, 2005
                </Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-accent bg-opacity-20 rounded-full items-center justify-center mr-3">
                <MapPin color="#FFFFFF" size={20} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-xs mb-1">Location</Text>
                <Text className="text-primary font-medium">
                  Phnom Penh, Cambodia
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
          <Text className="text-primary font-bold text-lg mb-4">
            Academic Information
          </Text>

          <View className="space-y-4">
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-accent bg-opacity-20 rounded-full items-center justify-center mr-3">
                <BookOpen color="#FFFFFF" size={20} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-xs mb-1">Student ID</Text>
                <Text className="text-primary font-medium">6024010070</Text>
              </View>
            </View>

            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-accent bg-opacity-20 rounded-full items-center justify-center mr-3">
                <ClipboardClock color="#FFFFFF" size={20} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-xs mb-1">Grade Level</Text>
                <Text className="text-primary font-medium">Grade 12</Text>
              </View>
            </View>

            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-accent bg-opacity-20 rounded-full items-center justify-center mr-3">
                <Calendar color="#FFFFFF" size={20} />
              </View>
              <View className="flex-1">
                <Text className="text-gray-500 text-xs mb-1">
                  Enrollment Date
                </Text>
                <Text className="text-primary font-medium">
                  September 1, 2024
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
          <Text className="text-primary font-bold text-lg mb-4">
            Statistics
          </Text>

          <View className="flex-row justify-between">
            <View className="flex-1 items-center bg-lightBg rounded-xl p-4 mr-2">
              <Text className="text-accent font-bold text-2xl">8</Text>
              <Text className="text-primary text-xs mt-1">Classes</Text>
            </View>

            <View className="flex-1 items-center bg-lightBg rounded-xl p-4 mx-1">
              <Text className="text-accent font-bold text-2xl">24</Text>
              <Text className="text-primary text-xs mt-1">Assignments</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomNavBar />
    </View>
  );
};

export default Profile;
