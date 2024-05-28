"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendChatMessage = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const cohere_1 = require("../../services/cohere/cohere");
const sendChatMessage = async (req, res) => {
    try {
        let { chat_id, message } = req.body;
        let updatedChat;
        const chat = await prisma_1.default.chats.findFirst({
            where: {
                id: chat_id,
            },
        });
        if (!chat) {
            return res.status(404).json({ message: "Чат не найден" });
        }
        if (message.role === "CHATBOT") {
            updatedChat = await prisma_1.default.chats.update({
                where: {
                    id: chat_id,
                },
                data: {
                    chat_history: [...chat.chat_history, message],
                },
            });
        }
        else {
            updatedChat = await (0, cohere_1.cohereSendMessage)({ ...chat, message });
        }
        res.status(200).json(updatedChat);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Не удалось получить чат",
        });
    }
};
exports.sendChatMessage = sendChatMessage;
