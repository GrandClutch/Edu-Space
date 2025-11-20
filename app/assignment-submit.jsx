"use client";

import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar from "../components/bottom-navbar";
import Heading from "../components/heading";
import UpperNavBar from "../components/upper-navbar";

const AssignmentSubmitPage = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-lightBg">
        <View className="flex-1">
          <StatusBar style="auto" />

          <ScrollView showsVerticalScrollIndicator={false}>
            <UpperNavBar />
            <Heading
              className="px-4 mt-4"
              title="Submit Assignment"
              description={"Submit your assignment before the due date"}
            />
            <View className="py-6 px-4 rounded-lg bg-primary mt-4 mx-4 space-y-2">
              <View className="flex flex-col items-start justify-center gap-6">
                <Text className="text-white font-semibold text-lg ">
                  Mobile Development Assignment
                </Text>
                <Text className="text-gray-200 border border-accent border-dashed italic p-4 rounded-lg w-full">
                  Input field to for files submission
                </Text>

                <Text className="text-gray-400 font-normal text-sm">
                  Please complete this assignment by the end of this month.
                </Text>
              </View>
            </View>
          </ScrollView>
          <View className="flex flex-col items-center justify-center mt-6 mb-8 py-6 px-4 gap-4">
            <TouchableOpacity className="bg-accent px-6 py-3 rounded-lg w-full">
              <Text className="text-white font-semibold text-base text-center">
                Submit Assignment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-accent px-6 py-3 rounded-lg w-full">
              <Text className="text-white font-semibold text-base text-center">
                Mark as Done
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-accent px-6 py-3 rounded-lg w-full">
              <Text className="text-white font-semibold text-base text-center">
                Add Work
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="text-primary font-semibold text-xs text-center pb-4">
            Powered By Edu Space
          </Text>

          <BottomNavBar />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AssignmentSubmitPage;
