import express from "express";


import { getNotifications, updateNotification } from "../controllers/notification.controller";

const notificationRouter = express.Router();

notificationRouter.get("/get-all-notifications", getNotifications);
notificationRouter.put("/update-notification/:id", updateNotification);


export default notificationRouter;
