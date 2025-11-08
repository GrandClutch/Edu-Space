"use client";

import { CameraView } from "expo-camera";
import { useRef } from "react";
import { Modal, Platform, StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const BarcodeScannerModal = ({ visible, onClose, onScan }) => {
  const qrLock = useRef(false);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 relative bg-black">
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
          {Platform.OS === "android" && <StatusBar hidden />}

          <CameraView
            style={{ flex: 1 }}
            facing="back"
            onBarcodeScanned={({ data }) => {
              if (data && !qrLock.current) {
                qrLock.current = true;
                onScan(data);
                onClose();
              }
            }}
          />
          {/**Overlay */}
          <View className="absolute inset-0 flex-col justify-center items-center">
            <View className="flex-1 w-full bg-black/50" />

            <View className="flex-row">
              <View className="flex-1 bg-black/50" />

              <View className="w-64 h-64 border-2 border-white relative">
                <View className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white" />
                <View className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white" />
                <View className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white" />
                <View className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white" />
              </View>

              <View className="flex-1 bg-black/50" />
            </View>

            <View className="flex-1 w-full bg-black/50" />
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BarcodeScannerModal;
