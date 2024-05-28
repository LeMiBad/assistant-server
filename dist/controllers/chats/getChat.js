"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChat = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const getChat = async (req, res, next) => {
    try {
        const { chat_id } = req.body;
        const chat = await prisma_1.default.chats.findUnique({
            where: {
                id: chat_id,
            },
        });
        if (chat) {
            res.status(200).json(chat);
        }
        else {
            res.status(404).json({ message: "Не удалось получить чат" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось получить чат" });
        next(error);
    }
};
exports.getChat = getChat;
