"use client";

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar from "../components/bottom-navbar";
import UpperNavBar from "../components/upper-navbar";

export default function AssignmentsScreen() {
  const [markedAsRead, setMarkedAsRead] = useState(false);
  // Dummy assignment data with different types
  const assignments = [
    {
      id: 1,
      title: "React Native Mobile App Project",
      type: "submission",
      description:
        "Build a complete mobile application using React Native with authentication, navigation, and API integration.",
      dueDate: "2025-12-15T23:59:59",
      files: [
        {
          fileName: "project-requirements.pdf",
          downloadURL: "https://example.com/requirements.pdf",
        },
        {
          fileName: "starter-template.zip",
          downloadURL: "https://example.com/template.zip",
        },
      ],
    },
    {
      id: 2,
      title: "Daily JavaScript Practice",
      type: "practice",
      description:
        "Complete coding challenges to improve your JavaScript fundamentals and problem-solving skills.",
      assignmentDetails: {
        frequency: "Daily",
        count: 10,
        deadline: "2025-12-31T23:59:59",
      },
      files: [
        {
          fileName: "practice-guide.pdf",
          downloadURL: "https://example.com/guide.pdf",
        },
      ],
    },
    {
      id: 3,
      title: "Database Design Assignment",
      type: "submission",
      description:
        "Design and implement a relational database schema for an e-commerce platform. Include ER diagrams and SQL scripts.",
      dueDate: "2025-12-10T23:59:59",
      files: [
        {
          fileName: "database-requirements.docx",
          downloadURL: "https://example.com/db-requirements.docx",
        },
        {
          fileName: "sample-schema.sql",
          downloadURL: "https://example.com/schema.sql",
        },
        {
          fileName: "er-diagram-template.png",
          downloadURL: "https://example.com/er-template.png",
        },
      ],
    },
    {
      id: 4,
      title: "Weekly Algorithm Practice",
      type: "practice",
      description:
        "Solve algorithm problems focusing on data structures, sorting, and searching techniques.",
      assignmentDetails: {
        frequency: "Weekly",
        count: 5,
        deadline: "2025-12-20T23:59:59",
      },
    },
    {
      id: 5,
      title: "UI/UX Design Mockup",
      type: "submission",
      description:
        "Create high-fidelity mockups for a mobile banking application. Include user flow diagrams and interactive prototypes.",
      dueDate: "2025-12-18T23:59:59",
      files: [
        {
          fileName: "design-brief.pdf",
          downloadURL: "https://example.com/brief.pdf",
        },
        {
          fileName: "color-palette.png",
          downloadURL: "https://example.com/colors.png",
        },
      ],
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-lightBg">
        <View className="flex-1">
          <StatusBar style="auto" />

          <ScrollView showsVerticalScrollIndicator={false}>
            <UpperNavBar />

            <View className="px-5 mb-6 mt-4">
              <Text className="text-primary font-bold text-lg mb-4">
                Your Assignments
              </Text>

              {assignments.map((assignment, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  className="bg-primary/90 border border-primary/40 rounded-2xl p-5 mb-5 shadow-lg shadow-black/30"
                >
                  <View className="flex-row justify-between items-center mb-3">
                    <Text
                      numberOfLines={1}
                      className="text-lg font-bold text-white flex-1 pr-2"
                    >
                      {assignment.title}
                    </Text>
                    <Text className="text-xs text-white bg-white/20 px-3 py-1 rounded-full">
                      {assignment.type?.toUpperCase()}
                    </Text>
                  </View>

                  {assignment.description && (
                    <Text className="text-sm text-white/90 mb-4 leading-5">
                      {assignment.description}
                    </Text>
                  )}

                  <View className="space-y-1 mb-3">
                    {assignment.assignmentDetails ? (
                      <>
                        <Text className="text-xs text-white/80">
                          Frequency:{" "}
                          <Text className="font-semibold text-white/90">
                            {assignment.assignmentDetails.frequency || "-"}
                          </Text>
                        </Text>
                        <Text className="text-xs text-white/80">
                          Count:{" "}
                          <Text className="font-semibold text-white/90">
                            {assignment.assignmentDetails.count ?? "-"}
                          </Text>
                        </Text>
                        <Text className="text-xs text-white/80">
                          Deadline:{" "}
                          <Text className="font-semibold text-white/90">
                            {assignment.assignmentDetails.deadline
                              ? new Date(
                                  assignment.assignmentDetails.deadline
                                ).toLocaleDateString()
                              : "No deadline"}
                          </Text>
                        </Text>
                      </>
                    ) : (
                      <>
                        <Text className="text-xs text-white/80">
                          Due Date:{" "}
                          <Text className="font-semibold text-white/90">
                            {assignment.dueDate
                              ? new Date(
                                  assignment.dueDate
                                ).toLocaleDateString()
                              : "—"}
                          </Text>
                        </Text>
                      </>
                    )}
                  </View>

                  {assignment.files && assignment.files.length > 0 && (
                    <View className="bg-white/15 rounded-lg p-3 mb-4">
                      <Text className="text-xs text-white/70 mb-2">
                        📎 Attached Files:
                      </Text>
                      {assignment.files.map((file, fileIndex) => (
                        <TouchableOpacity
                          key={fileIndex}
                          onPress={() =>
                            Alert.alert("Open File", file.fileName, [
                              {
                                text: "Open",
                                onPress: () =>
                                  Linking.openURL(file.downloadURL),
                              },
                              { text: "Cancel", style: "cancel" },
                            ])
                          }
                          className="flex-row items-center justify-between bg-white/10 px-3 py-2 rounded-lg mb-2"
                        >
                          <Text
                            numberOfLines={1}
                            className="text-xs text-white/90 flex-1 mr-3"
                          >
                            {file.fileName}
                          </Text>
                          <Text className="text-xs text-primary bg-white px-2 py-1 rounded-md font-semibold">
                            View
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  <View className="flex-row justify-around mt-4 gap-4">
                    <TouchableOpacity
                      className={`${
                        markedAsRead ? "bg-green-400" : "bg-white"
                      } px-4 py-2 rounded-full flex-1 mr-2`}
                      onPress={() => setMarkedAsRead(!markedAsRead)}
                    >
                      {/* <Text className="text-primary font-semibold text-center text-sm">
                        {markedAsRead ? "Already Marked as Read" : "Mark as Read"}
                      </Text> */}
                      {markedAsRead ? (
                        <Text className="text-white font-semibold text-center text-sm">
                          Marked as Read
                        </Text>
                      ) : (
                        <Text className="text-primary font-semibold text-center text-sm">
                          Mark as Read
                        </Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-white px-4 py-2 rounded-full flex-1 ml-2">
                      <Text className="text-primary font-semibold text-center text-sm">
                        View Assignment
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-primary font-semibold text-xs text-center pb-4">
              Powered By Edu Space
            </Text>
          </ScrollView>

          <BottomNavBar />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
