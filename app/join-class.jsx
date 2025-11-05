"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function JoinClassPage() {
  const [classCode, setClassCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [idToken, setIdToken] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem("idToken").then((token) => {
      setIdToken(token);
    });
  }, []);

  const handleJoinClass = async () => {
    if (!classCode.trim()) {
      Alert.alert("Error", "Please enter a valid class code.");
      return;
    }
    setIsJoining(true);
    try {
      const res = await fetch(
        "https://anouvot.web.app/api/v1/classrooms/join",
        {
          method: "POST",
          body: JSON.stringify({ classCode }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      const classData = await res.json();
      if (!res.ok) {
        Alert.alert("Error", classData.message || "Failed to join class.");
        setIsJoining(false);
        return;
      }

      Alert.alert("Success", `Joined class: ${classData.name}`);
      router.push(`/class/${classData.classroomId}`);
      console.log("classdata id:", classData.classroomId);
    } catch (error) {
      console.error("Failed to join class:", error);
      Alert.alert("Error", "Failed to join class. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-lightBg">
        <View className="flex-1">
          <StatusBar style="auto" />

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View className="bg-accent px-5 pt-4 pb-6 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-3">
                  <Text className="text-accent font-bold text-lg">CL</Text>
                </View>
                <View>
                  <Text className="text-white font-bold text-base">
                    Chhin Long
                  </Text>
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

            {/* Search Bar */}
            <View className="px-5 py-4">
              <TextInput
                className="w-full bg-white text-primary p-3 rounded-lg text-base"
                placeholder="Enter Class Code..."
                placeholderTextColor="#A0AEC0"
                value={classCode}
                onChangeText={setClassCode}
              />
            </View>

            <View className="flex-row justify-center items-center gap-4 mt-4 w-[80%] mx-auto">
              <TouchableOpacity
                className="bg-secondary px-4 py-2 rounded-full w-full"
                onPress={handleJoinClass}
                disabled={isJoining}
              >
                <Text className="text-darkBg font-semibold text-sm text-center">
                  {isJoining ? (
                    <View className="flex-row justify-center items-center gap-2">
                      <ActivityIndicator size="small" color="#000000" />
                      <Text>Joining...</Text>
                    </View>
                  ) : (
                    "Join Class"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Footer */}
          <Text className="text-primary font-semibold text-xs text-center pb-4">
            Powered By Edu Space
          </Text>

          {/* Bottom Navigation */}
          <View className="bg-darkBg flex-row items-center justify-around py-4 border-t border-accent">
            <TouchableOpacity
              className="items-center py-2"
              onPress={() => router.push("/home")}
            >
              <Text className="text-secondary text-2xl mb-1">🏠</Text>
              <Text className="text-secondary text-xs font-semibold">Home</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center py-2">
              <Text className="text-white text-2xl mb-1">📊</Text>
              <Text className="text-white text-xs">Overview</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/assignments")}
              className="items-center py-2"
            >
              <Text className="text-white text-2xl mb-1">📝</Text>
              <Text className="text-white text-xs">Assignments</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
