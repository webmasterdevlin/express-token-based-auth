import { Router } from "express";
import { sendPushNotification } from "../../utils/pushNotifications";

// Export module for registering router in express app
export const router: Router = Router();

// Define your routes here
router.get("/", (req, res) => {
  res.status(200).send({
    message: "GET request from sample router",
  });
});

router.post("/", (req, res) => {
  res.status(200).send({
    message: "POST request from sample router",
  });
});

router.put("/", (req, res) => {
  res.status(200).send({
    message: "PUT request from sample router",
  });
});

router.delete("/", (req, res) => {
  res.status(200).send({
    message: "DELETE request from sample router",
  });
});

router.post("/expo-push-tokens", (req, res) => {
  const pushToken = req.body.pushToken.data;
  const message = req.body.pushToken.message;
  sendPushNotification(pushToken, message)
    .then((data) =>
      res.status(200).send({
        message: JSON.stringify(data, null, 2),
      })
    )
    .catch((err) => console.log("ERROR:", err));
});
