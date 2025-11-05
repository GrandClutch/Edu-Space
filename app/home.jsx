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

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const classes = [
    {
      id: 1,
      name: "React Fundamentals",
      code: "C2345678",
      students: 8,
      assignments: 3,
    },
    {
      id: 2,
      name: "React Fundamentals",
      code: "C2345678",
      students: 8,
      assignments: 3,
    },
  ];

  const stats = [
    { label: "Classes", value: "2" },
    { label: "Students", value: "42" },
    { label: "Assignments", value: "5" },
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
                placeholder="Search Classes..."
                placeholderTextColor="#A0AEC0"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Create/Join Buttons */}
            <View className="flex-row px-5 gap-3 mb-6">
              <TouchableOpacity className="flex-1 bg-darkBg rounded-lg p-4 items-center">
                <Text className="text-secondary text-2xl mb-2">➕</Text>
                <Text className="text-white font-bold text-sm">
                  Create Class
                </Text>
                <Text className="text-white text-xs opacity-70">
                  Enter class code
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-darkBg rounded-lg p-4 items-center">
                <Text className="text-secondary text-2xl mb-2">👥</Text>
                <Text className="text-white font-bold text-sm">Join Class</Text>
                <Text className="text-white text-xs opacity-70">
                  Enter class code
                </Text>
              </TouchableOpacity>
            </View>

            {/* Your Classes Section */}
            <View className="px-5 mb-6">
              <Text className="text-primary font-bold text-base mb-4">
                Your classes
              </Text>
              {classes.map((classItem) => (
                <TouchableOpacity
                  key={classItem.id}
                  onPress={() => router.push(`/class/${classItem.id}`)}
                  className="bg-darkBg rounded-lg p-4 mb-4 flex-row items-center justify-between"
                >
                  <View className="flex-row items-center gap-4 flex-1">
                    <View className="w-12 h-12 bg-secondary rounded-lg items-center justify-center">
                      <Text className="text-white text-xl">📚</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-white font-bold text-base">
                        {classItem.name}
                      </Text>
                      <Text className="text-white text-xs opacity-70">
                        Code: {classItem.code}
                      </Text>
                      <View className="flex-row gap-4 mt-2">
                        <Text className="text-white text-xs">
                          👥 {classItem.students} students
                        </Text>
                        <Text className="text-white text-xs">
                          📋 {classItem.assignments} assignments
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View className="bg-secondary px-3 py-1 rounded-full">
                    <Text className="text-darkBg font-bold text-xs">
                      Active
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Stats Section */}
            <View className="flex-row px-5 gap-3 pb-8">
              {stats.map((stat, idx) => (
                <View
                  key={idx}
                  className="flex-1 bg-secondary rounded-lg p-4 items-center"
                >
                  <Text className="text-darkBg font-bold text-2xl mb-1">
                    {stat.value}
                  </Text>
                  <Text className="text-darkBg text-xs font-semibold">
                    {stat.label}
                  </Text>
                </View>
              ))}
            </View>

            {/* Footer */}
            <Text className="text-primary font-semibold text-xs text-center pb-4">
              Powered By Edu Space
            </Text>
          </ScrollView>

          {/* Bottom Navigation */}
          <View className="bg-darkBg flex-row items-center justify-around py-4 border-t border-accent">
            <TouchableOpacity className="items-center py-2">
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
