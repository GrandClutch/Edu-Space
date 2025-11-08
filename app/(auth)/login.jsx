// app/login.jsx

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

      {/* <View className="w-40 h-40 rounded-full bg-white items-center justify-center shadow-xl border border-gray-200 overflow-hidden">
        <Image
          source={require("../../assets/images/edu-space.png")}
          className="w-[90%] h-[90%] rounded-full"
          resizeMode="cover"
        />
      </View> */}

      <View className="w-[90%] bg-darkBg rounded-xl p-6 mt-10 shadow-2xl">
        {/* Header */}
        <Text className="text-white text-2xl font-bold mb-1 text-center">
          Welcome Back
        </Text>
        <Text className="text-white text-sm opacity-70 mb-6 text-center">
          Enter your credentials to access your classes
        </Text>

        <TextInput
          className="w-full bg-white text-primary p-3 rounded-lg mb-4 text-base"
          placeholder="Email..."
          placeholderTextColor="#A0AEC0"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <View className="w-full mb-2 relative">
          <TextInput
            className="w-full bg-white text-primary p-3 rounded-lg text-base pr-10"
            placeholder="Password..."
            placeholderTextColor="#A0AEC0"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye size={20} color="#A0AEC0" />
            ) : (
              <EyeOff size={20} color="#A0AEC0" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="self-end mb-8">
          <Text className="text-secondary text-sm font-semibold">
            Forget password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoggingIn}
          className="w-full bg-accent py-4 rounded-xl items-center shadow-lg"
        >
          <Text className="text-white text-xl font-bold">
            {isLoggingIn ? "Loging In..." : "Log In"}
          </Text>
        </TouchableOpacity>

        <Text className="text-white text-xs text-center mt-6 px-4 opacity-70">
          By clicking continue, you accept our
          <Text className="font-semibold"> Terms of Service </Text>
          and
          <Text className="font-semibold"> Privacy Policy.</Text>
        </Text>
      </View>

      <Text className="absolute bottom-6 text-primary font-semibold text-sm">
        Powered By Edu Space
      </Text>
    </View>
  );
}
