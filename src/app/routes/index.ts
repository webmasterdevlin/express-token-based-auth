import express from 'express';
import {helloWorldController, processNotificationController} from "../controllers/notificationControllers";
const router = express.Router();


router.post("/expo-push-tokens", processNotificationController);
router.get("/hello-world", helloWorldController);


export default function(app) {
    // @ts-ignore
    app.use("/api", router);
};
