import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

import {
  signupController,
  loginController,
  unsetTgTokenController,
  setTgTokenController,
  getTgTokens,
} from "../controllers/users";

import {
  getAssistantSettings,
  createAssistant,
  updateAssistant,
} from "../controllers/assistant";

import { getPopup, updatePopup } from "../controllers/popup";

import {
  getNotificationsController,
  deleteNotificationsController,
} from "../controllers/notifications";

import {
  getChats,
  sendChatMessage,
  deleteChats,
  blockChat,
  getChat,
  createChat,
  sendAll
} from "../controllers/chats";

import { getAllUsers, getAdminToken, updateUser } from "../controllers/admin";
import { getPopupSettings } from "../controllers/popup/getPopupSettings";
import { activateSubscription } from "../controllers/admin/subscriptions/activateSubscription";
import { addTgNotificationsChatId } from "../controllers/assistant/addTgNotificationsChatId";

const router = Router();

// Телеграмм токен
router.post("/users/tg/setTgToken", authMiddleware, setTgTokenController);
router.get("/users/tg/unsetTgToken", authMiddleware, unsetTgTokenController);
router.post("/users/tgTokens", getTgTokens);
router.post("/users/login", loginController);
router.post("/users/signup", signupController);

// Ассистент
router.get("/assistant", authMiddleware, getAssistantSettings);
router.post("/assistant", authMiddleware, createAssistant);
router.patch("/assistant", authMiddleware, updateAssistant);
router.patch("/assistant/tg/notification", addTgNotificationsChatId);

// Попап
router.get("/popup", getPopup);
router.get("/popup/settings", authMiddleware, getPopupSettings);
router.post("/popup", authMiddleware, updatePopup);

// Оповещения
router.get("/notifications", authMiddleware, getNotificationsController);
router.delete("/notifications", authMiddleware, deleteNotificationsController);

// Чаты
router.post("/chats", authMiddleware, getChats);
router.post("/chat/create", createChat)
router.delete("/chats", deleteChats);
router.post("/chat", getChat);
router.post("/chat/block", authMiddleware, blockChat);
router.post("/chat/send", sendChatMessage);
router.post("/chats/send/all", authMiddleware, sendAll)

// Админка
router.post("/admin", getAdminToken);
router.post("/admin/users", getAllUsers);
router.patch("/admin/user", updateUser);
router.post("/admin/subscription", activateSubscription);

export default router;
