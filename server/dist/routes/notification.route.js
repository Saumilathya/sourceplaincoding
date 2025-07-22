"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("../controllers/notification.controller");
const notificationRouter = express_1.default.Router();
notificationRouter.get("/get-all-notifications", notification_controller_1.getNotifications);
notificationRouter.put("/update-notification/:id", notification_controller_1.updateNotification);
exports.default = notificationRouter;
