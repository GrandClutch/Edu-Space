"use client";

import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar from "../components/bottom-navbar";
import UpperNavBar from "../components/upper-navbar";
import {
  askNotificationPermission,
  sendLocalNotification,
} from "../lib/local-notifications";
import { Plus, User } from "lucide-react-native";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const classes = [
    {
      id: 1,
      name: "Mobile Development",
      code: "C1234567",
      students: 8,
      assignments: 3,
    },
    {
      id: 2,
      name: "Web Development",
      code: "C2345678",
      students: 8,
      assignments: 3,
    },
  ];

  const stats = [
    { label: "Classes", value: "2" },
    // { label: "Students", value: "42" },
    { label: "Assignments", value: "5" },
  ];
  //below was for push notifications
  // const useEffect =
  //   (() => {
  //     async function setUpPushNotification() {
  //       const token = await registerForPushNotificationsAsync();
  //       console.log("My device token:", token);
  //     }
  //     setUpPushNotification();
  //   },
  //   []);
  useEffect(() => {
    askNotificationPermission();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-lightBg">
        <View className="flex-1">
          <StatusBar style="auto" />

          <ScrollView showsVerticalScrollIndicator={false}>
            <UpperNavBar />

            <View className="px-5 py-4">
              <TextInput
                className="w-full bg-white text-primary p-3 rounded-lg text-base"
                placeholder="Search Classes..."
                placeholderTextColor="#A0AEC0"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <View className="flex-row px-5 gap-3 mb-6">
              <TouchableOpacity className="flex-1 bg-darkBg rounded-lg p-4 items-center">
                <Plus color="white" size={24} className="mb-2" />
                <Text className="text-white font-bold text-sm">
                  Create Class
                </Text>
                <Text className="text-white text-xs opacity-70">
                  Enter class code
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-darkBg rounded-lg p-4 items-center"
                onPress={() => router.push("/join-class")}
              >
                <User color="white" size={24} className="mb-2" />
                <Text className="text-white font-bold text-sm">Join Class</Text>
                <Text className="text-white text-xs opacity-70">
                  Enter class code
                </Text>
              </TouchableOpacity>
            </View>

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
                      {/* <View className="flex-row gap-4 mt-2">
                        <Text className="text-white text-xs">
                          👥 {classItem.students} students
                        </Text>
                        <Text className="text-white text-xs">
                          📋 {classItem.assignments} assignments
                        </Text>
                      </View> */}
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
          </ScrollView>
          <TouchableOpacity className='bg-darkBg rounded-lg  p-4 items-center mx-4' onPress={sendLocalNotification}>
            <Text className="text-white font-bold text-sm">Send Test Notification</Text>
          </TouchableOpacity>

          <Text className="text-primary font-semibold text-xs text-center pb-4">
            Powered By Edu Space
          </Text>

          <BottomNavBar />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
