import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

import {
  signupController,
  loginController,
  unsetTgTokenController,
  setTgTokenController,
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
} from "../controllers/chats";

import { getAllUsers, getAdminToken, updateUser } from "../controllers/admin";

const router = Router();

// Телеграмм токен
router.use("/users/tg/setTgToken", setTgTokenController);
router.use("/users/tg/unsetTgToken", unsetTgTokenController);
router.post("/users/login", loginController);
router.post("/users/signup", signupController);

// Ассистент
router.get("/assistant", authMiddleware, getAssistantSettings);
router.post("/assistant", authMiddleware, createAssistant);
router.patch("/assistant", authMiddleware, updateAssistant);

// Попап
router.get("/popup", authMiddleware, getPopup);
router.post("/popup", authMiddleware, updatePopup);

// Оповещения
router.get("/notifications", authMiddleware, getNotificationsController);
router.delete("/notifications", authMiddleware, deleteNotificationsController);

// Чаты
router.get("/chats", authMiddleware, getChats);
router.delete("/chats", deleteChats);
router.post("/chat", getChats);
router.post("/chat/block", authMiddleware, blockChat);
router.post("/chat/send", sendChatMessage);

// Админка
router.post("/admin", getAdminToken);
router.post("/admin/users", getAllUsers);
router.patch("/admin/user", updateUser);

export default router;
