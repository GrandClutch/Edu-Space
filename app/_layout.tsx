import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";

export default function RootLayout() {
  // const colorScheme = useColorScheme();

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <>
      <Stack screenOptions={{headerShown:false}}>
        {/* Index route (default screen) */}
        <Stack.Screen name="login" options={{ headerShown: false }} />

        {/* Other screens */}
        <Stack.Screen name="home" options={{ title: "Home Page" , headerShown:false}} />
        <Stack.Screen name="classroomList" options={{ title: "Classrooms" , headerShown:false}} />
        <Stack.Screen
          name="classroomDetails"
          options={{ title: "Classroom Details" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
    // </ThemeProvider>
  );
}
