"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function ClassroomPage() {
  const { classroomId } = useLocalSearchParams();
  const [classroom, setClassroom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchClassroom = async () => {
    if(!classroomId) return;
    setIsLoading(true);
    try {
      const idToken = await AsyncStorage.getItem("idToken");
      if (!idToken) {
        Alert.alert("Authentication Error", "Please log in again.");
        router.push("/login");
        return;
      }
      const res = await fetch(
        `https://anouvot.web.app/api/v1/classrooms/${classroomId}/details`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
            method: "GET",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch classroom");
      }
      setClassroom(data);
    } catch (error) {
      console.error("Failed to fetch classroom:", error);
      Alert.alert("Error", "Failed to load classroom data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchClassroom();
  }, [classroomId]);

  if (isLoading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-lightBg justify-center items-center gap-4">
          <ActivityIndicator size={"large"} color={"white"} />
          <Text className="text-primary">Loading Classroom...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-lightBg">
        <StatusBar style="auto" />
        <ScrollView className="p-5" showsVerticalScrollIndicator={false}>
          <Text className="text-2xl font-bold text-primary mb-2">
            {classroom?.name}
          </Text>
          <Text className="text-sm text-primary opacity-70 mb-4">
            Teacher: {classroom?.teacherName}
          </Text>
          <Text className="text-xs text-secondary mb-6">
            Class Code: {classroom?.classCode}
          </Text>

          {/* Example buttons */}
          <TouchableOpacity
            className="bg-accent px-4 py-3 rounded-lg mb-4"
            onPress={() => Alert.alert("Assignments", "Go to assignments")}
          >
            <Text className="text-white text-center font-bold">
              View Assignments
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-secondary px-4 py-3 rounded-lg"
            onPress={() => Alert.alert("Students", "Go to students list")}
          >
            <Text className="text-darkBg text-center font-bold">
              View Students
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
