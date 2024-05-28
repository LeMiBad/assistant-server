"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChats = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const getChats = async (req, res, next) => {
    try {
        const { assistant_id } = req.body;
        if (!assistant_id) {
            return res.status(400).json({ message: "Требуется ID ассистента" });
        }
        const chats = await prisma_1.default.chats.findMany({
            where: { assistant_id },
        });
        res.status(200).json(chats);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось получить чат" });
        next(error);
    }
};
exports.getChats = getChats;
