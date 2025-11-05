"use client";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";

export default function RootLayout() {
  return (
    <>
      {/* Stack automatically picks up all screens from app/ folder */}
      <Stack
        screenOptions={{
          headerShown: false, // hide headers globally
        }}
      />
      <StatusBar style="auto" />
    </>
  );
}

//global layout with children later
// "use client";

// import BottomNavBar from "@/components/bottom-navbar";
// import UpperNavBar from "@/components/upper-navbar";
// import "react-native-reanimated";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import "./global.css";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <SafeAreaProvider>
//       <SafeAreaView className="flex-1 bg-lightBg">
//         {/* Top Navbar */}
//         <UpperNavBar />

//         {/* Main content of each page */}
//         <SafeAreaView className="flex-1">{children}</SafeAreaView>

//         {/* Bottom navigation */}
//         <BottomNavBar />
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// }



// import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import "react-native-reanimated";
// import "./global.css";

// export default function RootLayout() {
//   // const colorScheme = useColorScheme();

//   return (
//     // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//     <>
//       <Stack screenOptions={{ headerShown: false }}>
//         {/* Index route (default screen) */}
//         <Stack.Screen name="login" options={{ headerShown: false }} />

//         {/* Other screens */}
//         <Stack.Screen
//           name="home"
//           options={{ title: "Home Page", headerShown: false }}
//         />
//         <Stack.Screen
//           name="join-class"
//           options={{ title: "Join Class", headerShown: false }}
//         />
//         <Stack.Screen
//           name="class/[classroomId]"
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="classroomList"
//           options={{ title: "Classrooms", headerShown: false }}
//         />
//         <Stack.Screen
//           name="classroomDetails"
//           options={{ title: "Classroom Details" }}
//         />
//       </Stack>
//       <StatusBar style="auto" />
//     </>
//     // </ThemeProvider>
//   );
// }
