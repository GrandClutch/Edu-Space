import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function askNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Permission not granted!");
    return false;
  }
  return true;
}

export async function sendLocalNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Assignment from Mobile Development Class",
      body: "Due date: 2025-11-20",
    },
    trigger: null,
  });
}
