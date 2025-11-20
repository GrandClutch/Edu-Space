"use client";

import { Camera, CameraView } from "expo-camera";
import { useEffect, useRef } from "react";
import { Alert, Modal, Platform, StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const QRScannerModal = ({ visible, onClose, onScan }) => {
  const qrLock = useRef(false);
  // const [permission, requestPermission] = Camera.useCameraPermissions();

  // useEffect(() => {
  //   if (visible) {
  //     requestPermission();
  //     qrLock.current = false;
  //   }
  // }, [visible]);
  // if (!permission) return null;
  // if (!permission.granted) {
  //   return Alert.alert(
  //     "No Camera Permission",
  //     "Please grant camera permission to use the QR scanner."
  //   );
  // }
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

              <View className="w-64 h-64 relative">
                <View className="absolute left-0 top-0  rounded-tl-lg border-l-4 border-t-4 border-white w-8 h-8" />
                <View className="absolute right-0 top-0  rounded-tr-lg border-r-4 border-t-4 border-white w-8 h-8" />
                <View className="absolute bottom-0 left-0  rounded-bl-lg border-b-4 border-l-4 border-white w-8 h-8" />
                <View className="absolute bottom-0 right-0  rounded-br-lg border-b-4 border-r-4 border-white w-8 h-8" />
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

export default QRScannerModal;
