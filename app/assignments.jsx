"use client";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AssignmentButton from "../components/assignment-button";

export default function AssignmentsScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const assignmentTitles = [
    {
      id: 1,
      name: "How to Code in React Native",
      class: "React Fundamentals",
      done: false,
    },
    {
      id: 2,
      name: "Solve Maths Problems",
      class: "Math Fundamentals",
      done: true,
    },
  ];

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
                placeholder="Search Assignments..."
                placeholderTextColor="#A0AEC0"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Your Classes Section */}
            <View className="px-5 mb-6">
              <Text className="text-primary font-bold text-base mb-4">
                Your Assignments
              </Text>
              {assignmentTitles.map((assignmentTitle) => (
                <AssignmentButton
                  key={assignmentTitle.id}
                  assignmentTitle={assignmentTitle}
                />
              ))}
            </View>

            {/* Footer */}
            <Text className="text-primary font-semibold text-xs text-center pb-4">
              Powered By Edu Space
            </Text>
          </ScrollView>

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
