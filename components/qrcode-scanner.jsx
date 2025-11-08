// components/BarcodeScannerModal.jsx
import React, { useEffect, useState } from "react";
import { Modal, View, TouchableOpacity, Text, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function BarcodeScannerModal({ visible, onClose, onScanned }) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      if (status !== "granted") {
        Alert.alert("Camera permission is required!");
      }
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    onScanned(data);
  };

  if (!hasPermission) return null;

  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-black justify-center items-center">
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={{ width: "100%", height: "100%" }}
        />
        <TouchableOpacity
          className="absolute top-10 right-5 bg-white px-4 py-2 rounded"
          onPress={onClose}
        >
          <Text className="text-black font-bold">Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
