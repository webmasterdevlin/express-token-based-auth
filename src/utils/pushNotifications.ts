import Expo from "expo-server-sdk";

export const sendPushNotification = async (targetExpoPushToken, message) => {
  // Create a new Expo SDK client
  // optionally providing an access token if you have enabled push security
  // let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
  const expo = new Expo();
  const chunks = expo.chunkPushNotifications([
    {
      to: targetExpoPushToken,
      sound: "default",
      channelId: "invites",
      title: "title",
      subtitle: "subtitle",
      body: message,
      data: {
        withSome: "data",
      },
      badge: 1,
      priority: "high",
      ttl: 3,
    },
  ]);

  const sendChunks = async () => {
    /* This code runs synchronously. We're waiting for each chunk to be send.
     * A better approach is to use Promise.all() and send multiple chunks in parallel.*/
    for (const chunk of chunks) {
      console.log("Sending Chunk", chunk);
      try {
        const tickets = await expo.sendPushNotificationsAsync(chunk);
        console.log("Tickets", tickets);
      } catch (error) {
        console.log("Error sending chunk", error);
      }
    }
  };

  await sendChunks();
};
