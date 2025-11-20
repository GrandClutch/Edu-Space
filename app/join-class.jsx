"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera } from "expo-camera";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Barcode } from "lucide-react-native";
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
import BottomNavBar from "../components/bottom-navbar";
import QRScannerModal from "../components/qrcode-scanner";
import UpperNavBar from "../components/upper-navbar";

export default function JoinClassPage() {
  const [classCode, setClassCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const [scannerVisible, setScannerVisibile] = useState(false);
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

      Alert.alert("Successfully Join Class.");
      router.push(`/class/${classData.classroomId}`);
      console.log("classdata id:", classData.classroomId);
    } catch (error) {
      console.error("Failed to join class:", error);
      Alert.alert("Error", "Failed to join class. Please try again.");
    } finally {
      setIsJoining(false);
    }
  };
  // const handleScanned = (code) => {
  //   setScannerVisibile(false);
  //   setClassCode(code);
  // };
  const handleOpenScanner = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissions Denied",
        "Please grant camera permissions to use the QR scanner."
      );
      return;
    } else {
      setScannerVisibile(true);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-lightBg">
        <View className="flex-1">
          <StatusBar style="auto" />

          <ScrollView showsVerticalScrollIndicator={false}>
            <UpperNavBar />

            <View className="flex flex-row items-center justify-center gap-2 px-5 py-4">
              <TextInput
                className="w-[80%] bg-white text-primary p-3 rounded-lg text-base"
                placeholder="Enter Class Code..."
                placeholderTextColor="#A0AEC0"
                value={classCode}
                onChangeText={setClassCode}
              />
              <TouchableOpacity
                className="w-10 h-10 bg-primary bg-opacity-30 rounded-lg items-center justify-center"
                // onPress={() => setScannerVisibile(true)}
                onPress={handleOpenScanner}
              >
                <Barcode color={"white"} />
              </TouchableOpacity>
            </View>
            <QRScannerModal
              visible={scannerVisible}
              onClose={() => setScannerVisibile(false)}
              onScan={(data) => setClassCode(data)}
            />

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

          <Text className="text-primary font-semibold text-xs text-center pb-4">
            Powered By Edu Space
          </Text>

          <BottomNavBar />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
