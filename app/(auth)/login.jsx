// app/login.jsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Missing fields", "Please enter both email and password.");
      return;
    }

    setIsLoggingIn(true);

    // user login from appwrite auth
    // try {
    //   // Create email/password session
    //   await account.createEmailPasswordSession(email, password);

    //   //  Get user data
    //   const user = await account.get();
    //   console.log("Logged in user:", user);

    //   // Navigate to home (replace with your real route)
    //   router.replace("/home");
    // } catch (err) {
    //   console.error("Login failed:", err);
    //   Alert.alert("Login Failed", err.message || "Invalid credentials.");
    // } finally {
    //   setIsLogingIn(false);
    // }

    try {
      const res = await fetch("https://anouvot.web.app/api/v1/auth/login", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      Alert.alert("Success", "You have logged in successfully!");
      await AsyncStorage.setItem("idToken", data.idToken);
      router.replace("/home");
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert("Login Failed", error.message || "Something went wrong.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <View className="flex-1 bg-lightBg items-center my-auto justify-center">
      <StatusBar style="auto" />

      {/* Logo Section */}
      <View className="w-30 h-30 bg-white rounded-full items-center justify-center shadow-lg">
        <Image
          source={require("../../assets/images/edu-space.png")}
          className="w-20 h-20 rounded-full"
        />
      </View>

      {/* Login Card Section */}
      <View className="w-[90%] bg-darkBg rounded-xl p-6 mt-10 shadow-2xl">
        {/* Header */}
        <Text className="text-white text-2xl font-bold mb-1 text-center">
          Welcome Back
        </Text>
        <Text className="text-white text-sm opacity-70 mb-6 text-center">
          Enter your credentials to access your classes
        </Text>

        {/* Email Input */}
        <TextInput
          className="w-full bg-white text-primary p-3 rounded-lg mb-4 text-base"
          placeholder="Email..."
          placeholderTextColor="#A0AEC0"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          className="w-full bg-white text-primary p-3 rounded-lg mb-2 text-base"
          placeholder="Password..."
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Forgot Password */}
        <TouchableOpacity className="self-end mb-8">
          <Text className="text-secondary text-sm font-semibold">
            Forget password?
          </Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoggingIn}
          className="w-full bg-accent py-4 rounded-xl items-center shadow-lg"
        >
          <Text className="text-white text-xl font-bold">
            {isLoggingIn ? "Loging In..." : "Log In"}
          </Text>
        </TouchableOpacity>

        {/* Terms and Privacy */}
        <Text className="text-white text-xs text-center mt-6 px-4 opacity-70">
          By clicking continue, you accept our
          <Text className="font-semibold"> Terms of Service </Text>
          and
          <Text className="font-semibold"> Privacy Policy.</Text>
        </Text>
      </View>

      {/* Footer */}
      <Text className="absolute bottom-6 text-primary font-semibold text-sm">
        Powered By Edu Space
      </Text>
    </View>
  );
}
