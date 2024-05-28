"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const users_1 = require("../controllers/users");
const assistant_1 = require("../controllers/assistant");
const popup_1 = require("../controllers/popup");
const notifications_1 = require("../controllers/notifications");
const chats_1 = require("../controllers/chats");
const admin_1 = require("../controllers/admin");
const router = (0, express_1.Router)();
// Телеграмм токен
router.post("/users/tg/setTgToken", authMiddleware_1.authMiddleware, users_1.setTgTokenController);
router.get("/users/tg/unsetTgToken", authMiddleware_1.authMiddleware, users_1.unsetTgTokenController);
router.post("/users/tgTokens", users_1.getTgTokens);
router.post("/users/login", users_1.loginController);
router.post("/users/signup", users_1.signupController);
// Ассистент
router.get("/assistant", authMiddleware_1.authMiddleware, assistant_1.getAssistantSettings);
router.post("/assistant", authMiddleware_1.authMiddleware, assistant_1.createAssistant);
router.patch("/assistant", authMiddleware_1.authMiddleware, assistant_1.updateAssistant);
// Попап
router.get("/popup", authMiddleware_1.authMiddleware, popup_1.getPopup);
router.post("/popup", authMiddleware_1.authMiddleware, popup_1.updatePopup);
// Оповещения
router.get("/notifications", authMiddleware_1.authMiddleware, notifications_1.getNotificationsController);
router.delete("/notifications", authMiddleware_1.authMiddleware, notifications_1.deleteNotificationsController);
// Чаты
router.post("/chats", authMiddleware_1.authMiddleware, chats_1.getChats);
router.delete("/chats", chats_1.deleteChats);
router.post("/chat", chats_1.getChat);
router.post("/chat/block", authMiddleware_1.authMiddleware, chats_1.blockChat);
router.post("/chat/send", chats_1.sendChatMessage);
// Админка
router.post("/admin", admin_1.getAdminToken);
router.post("/admin/users", admin_1.getAllUsers);
router.patch("/admin/user", admin_1.updateUser);
exports.default = router;
