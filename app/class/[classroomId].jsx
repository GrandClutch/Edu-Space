"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BottomNavBar from "../../components/bottom-navbar";
import Heading from "../../components/heading";
import UpperNavBar from "../../components/upper-navbar";

export default function ClassroomPage() {
  const { classroomId } = useLocalSearchParams();
  const [classroom, setClassroom] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMaterials, setIsloadingMaterials] = useState(false);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(false);
  const [markedAsRead, setMarkedAsRead] = useState(false);

  const fetchClassroom = async () => {
    if (!classroomId) return;
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
  const fetchMaterials = async () => {
    if (!classroomId) return;
    setIsloadingMaterials(true);
    try {
      const idToken = await AsyncStorage.getItem("idToken");
      if (!idToken) {
        Alert.alert("Authentication Error", "Please log in again.");
        router.push("/login");
        return;
      }
      const res = await fetch(
        `https://anouvot.web.app/api/v1/classrooms/${classroomId}/materials`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          method: "GET",
        }
      );
      const materialData = await res.json();
      if (!res.ok) {
        throw new Error(materialData.message || "Failed to fetch materials");
      }
      setMaterials(materialData);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    } finally {
      setIsloadingMaterials(false);
    }
  };
  const fetchAssignments = async () => {
    if (!classroomId) return;
    setIsLoadingAssignments(true);
    try {
      const idToken = await AsyncStorage.getItem("idToken");
      if (!idToken) {
        Alert.alert("Authentication Error", "Please log in again.");
        router.push("/login");
        return;
      }
      const res = await fetch(
        `https://anouvot.web.app/api/v1/classrooms/${classroomId}/assignments`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          method: "GET",
        }
      );
      const assignmentData = await res.json();
      if (!res.ok) {
        throw new Error(assignmentData.message || "Failed to fetch materials");
      }
      setAssignments(assignmentData);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    } finally {
      setIsLoadingAssignments(false);
    }
  };
  useEffect(() => {
    fetchAssignments();
    fetchMaterials();
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
        <UpperNavBar />
        <ScrollView className="px-4 py-2" showsVerticalScrollIndicator={false}>
          <View className="bg-primary/90 border border-primary/40 rounded-2xl p-5 mb-6 shadow-md shadow-black/30">
            {/* Top Row — Name & Teacher */}
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-xl font-bold text-white flex-1">
                {classroom?.name}
              </Text>
              <Text className="text-sm text-white/80 italic ml-3">
                👩‍🏫 {classroom?.teacherName}
              </Text>
            </View>

            {/* Bottom Row — Class Code */}
            <View className="flex-row justify-between items-center">
              <Text className="text-xs text-white/80">Class Code</Text>
              <View className="bg-white/20 px-3 py-1 rounded-full">
                <Text className="text-xs text-white font-semibold tracking-widest">
                  {classroom?.classCode}
                </Text>
              </View>
            </View>
          </View>
          <View className="mb-6 space-y-3">
            <Heading
              title="Class Materials"
              description={"Manage your class materials here."}
            />
            {isLoadingMaterials ? (
              <View className="justify-center items-center my-6">
                <ActivityIndicator size={"small"} color={"white"} />
                <Text className="text-primary mt-2">Loading Materials...</Text>
              </View>
            ) : materials.length === 0 ? (
              <Text className="text-center text-white/60 italic">
                No materials uploaded yet.
              </Text>
            ) : (
              materials.map((material, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  className="bg-primary/90 border border-primary/40 rounded-2xl p-5 mb-5 shadow-lg shadow-black/30"
                  onPress={() => Alert.alert("Material", material.title)}
                >
                  {/* Title & Date */}
                  <View className="flex-row justify-between items-center mb-3">
                    <Text className="text-lg font-bold text-white flex-1">
                      {material.title}
                    </Text>
                    <Text className="text-xs text-white/80">
                      {new Date(material.createdAt).toLocaleDateString()}
                    </Text>
                  </View>

                  {/* Description */}
                  {material.description && (
                    <Text className="text-sm text-white/90 mb-3 leading-5">
                      {material.description}
                    </Text>
                  )}

                  {/* Files Section */}
                  {material.files && material.files.length > 0 && (
                    <View className="bg-white/15 rounded-lg p-3 mb-4">
                      <Text className="text-xs text-white/70 mb-2">
                        📎 Attached Files:
                      </Text>
                      {material.files.map((file, i) => (
                        <TouchableOpacity
                          key={i}
                          onPress={() => {
                            Alert.alert(
                              "Open File",
                              `Opening: ${file.fileName}`,
                              [
                                {
                                  text: "Open",
                                  onPress: () => {
                                    Linking.openURL(file.downloadURL);
                                  },
                                },
                                { text: "Cancel", style: "cancel" },
                              ],
                              { cancelable: true }
                            );
                          }}
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
                        View Materials
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
          <View className="mb-6 space-y-3">
            <Text className="text-lg text-primary font-bold">
              Class Assignments
            </Text>
            {isLoadingAssignments ? (
              <View className="justify-center items-center my-6">
                <ActivityIndicator size={"small"} color={"white"} />
                <Text className="text-primary mt-2">
                  Loading Assignments...
                </Text>
              </View>
            ) : assignments.length === 0 ? (
              <Text className="text-center text-white/60 italic">
                No assignments uploaded yet.
              </Text>
            ) : (
              assignments.map((assignment, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  className="bg-primary/90 border border-primary/40 rounded-2xl p-5 mb-5 shadow-lg shadow-black/30"
                  // onPress={() => router.push(`/assignment/${assignment.id}`)}
                >
                  {/* Title & Type */}
                  <View className="flex-row justify-between items-center mb-3">
                    <Text
                      numberOfLines={1}
                      className="text-lg font-bold text-white flex-1 pr-2"
                    >
                      {assignment.title}
                    </Text>
                    <Text className="text-xs text-primary bg-white/20 px-3 py-1 rounded-full">
                      {assignment.type?.toUpperCase()}
                    </Text>
                  </View>

                  {/* Description */}
                  {assignment.description && (
                    <Text className="text-sm text-white/90 mb-4 leading-5">
                      {assignment.description}
                    </Text>
                  )}

                  {/* Assignment Details */}
                  <View className="space-y-1 mb-3">
                    {/* For “practice” type */}
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
                        {/* For “submission” type */}
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

                  {/* Files Section */}
                  {assignment.files && assignment.files.length > 0 && (
                    <View className="bg-white/15 rounded-lg p-3 mb-4">
                      <Text className="text-xs text-white/70 mb-2">
                        📎 Attached Files:
                      </Text>
                      {assignment.files.map((file, index) => (
                        <TouchableOpacity
                          key={index}
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
              ))
            )}
          </View>
        </ScrollView>
        <BottomNavBar />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
