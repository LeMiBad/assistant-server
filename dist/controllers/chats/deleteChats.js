"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChats = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const deleteChats = async (req, res, next) => {
    try {
        const { ids } = req.body;
        await Promise.all(ids.map((id) => prisma_1.default.chats.delete({ where: { id } })));
        res.status(200).json(ids);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось удалить чаты" });
        next(error);
    }
};
exports.deleteChats = deleteChats;
