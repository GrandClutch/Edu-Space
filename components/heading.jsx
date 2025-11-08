import { Text, View } from "react-native";

const Heading = ({ title, description, className }) => {
  return (
    <View className={className}>
      <Text className="text-2xl text-primary font-bold tracking-tight">
        {title}
      </Text>
      <Text className="text-sm text-primary text-muted-foreground font-medium">
        {description}
      </Text>
    </View>
  );
};

export default Heading;
