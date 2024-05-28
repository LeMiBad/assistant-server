"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAssistant = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const updateAssistant = async (req, res) => {
    try {
        const { assistant_id, updates } = req.body;
        if (!assistant_id) {
            return res.status(400).json({ message: "Требуется ID ассистента" });
        }
        const updatedAssistant = await prisma_1.default.assistantSetting.update({
            where: { id: assistant_id },
            data: updates,
        });
        res.status(200).json(updatedAssistant);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось обновить данные ассистента" });
    }
};
exports.updateAssistant = updateAssistant;
