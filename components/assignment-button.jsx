import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const AssignmentButton = ({ assignmentTitle }) => {
  const router = useRouter();
  const [markAsDone, setMarkAsDone] = useState(assignmentTitle.done);

  return (
    <TouchableOpacity
      className="bg-darkBg rounded-lg p-4 mb-4"
      // onPress={() => router.push(`/class/${assignmentTitle.class}`)}
    >
      {/* Assignment Info */}
      <View className="flex-row items-center gap-4">
        <View className="w-12 h-12 bg-secondary rounded-lg items-center justify-center">
          <Text className="text-white text-xl">📚</Text>
        </View>
        <View className="flex-1">
          <Text className="text-white font-bold text-base">{assignmentTitle.name}</Text>
          <Text className="text-white text-xs opacity-70">
            Class: {assignmentTitle.class}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-center items-center gap-4 mt-4">
        <TouchableOpacity
        //   onPress={() => router.push(`/assignment/${assignmentTitle.id}`)}
          className="bg-secondary px-4 py-2 rounded-full"
        >
          <Text className="text-darkBg font-semibold text-sm">View Assignment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setMarkAsDone(!markAsDone)}
          className={`px-4 py-2 rounded-full ${markAsDone ? "bg-green-500" : "bg-red-500"}`}
        >
          <Text className="text-white font-semibold text-sm">
            {markAsDone ? "Mark as Done" : "Unsubmit"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default AssignmentButton;
