import { useRouter } from "expo-router";
import { Book, Home } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

const BottomNavBar = () => {
  const router = useRouter();

  const handleRouteToHome = () => {
    router.replace("/home");
  };

  const handleRouteToAssignments = () => {
    router.replace("/assignments");
  };

  return (
    <View className="bg-darkBg flex-row items-center justify-around py-4 border-t border-accent">
      <TouchableOpacity
        className="items-center py-2"
        onPress={handleRouteToHome}
      >
        {/* <Text className="text-secondary text-2xl mb-1">🏠</Text> */}
        <Home color={"white"} />
        <Text className="text-white text-xs font-semibold">Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleRouteToAssignments}
        className="items-center py-2"
      >
        {/* <Text className="text-white text-2xl mb-1">📝</Text> */}
        <Book color={"white"} />
        <Text className="text-white text-xs">Assignments</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavBar;
