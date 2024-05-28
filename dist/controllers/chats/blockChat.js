"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockChat = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const blockChat = async (req, res) => {
    try {
        const { chat_id, blocked } = req.body;
        const chat = await prisma_1.default.chats.update({
            where: {
                id: chat_id,
            },
            data: {
                is_blocked: blocked,
            },
        });
        res.status(200).json(chat);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось обновить статус чата" });
    }
};
exports.blockChat = blockChat;
