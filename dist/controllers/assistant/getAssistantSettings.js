"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssistantSettings = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const getAssistantSettings = async (req, res) => {
    try {
        const { id } = req.user;
        const assistant = await prisma_1.default.assistantSetting.findFirst({
            where: { user_id: id },
        });
        if (!assistant) {
            return res
                .status(404)
                .json({ message: "Настройки ассистента не найдены" });
        }
        res.status(200).json(assistant);
    }
    catch (error) {
        console.log("Не удалось получить настройки ассистента: " + error);
        res
            .status(500)
            .json({ message: "Не удалось получить настройки ассистента" });
    }
};
exports.getAssistantSettings = getAssistantSettings;
