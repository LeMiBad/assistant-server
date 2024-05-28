"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPopup = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const getPopup = async (req, res) => {
    try {
        const { popup_id } = req.query;
        if (popup_id) {
            const popup = await prisma_1.default.popup.findFirst({
                where: { id: popup_id },
            });
            if (popup) {
                const popupSettings = popup.settings;
                res.setHeader("Content-Type", "application/javascript");
                return res.status(200).send(popupSettings.code);
            }
            else {
                return res.status(404).json({ message: "Попап не найден" });
            }
        }
        const { id } = req.user;
        const popup = await prisma_1.default.popup.findFirst({
            where: { user_id: id },
        });
        res.status(200).json(popup);
    }
    catch (error) {
        res.status(500).json({ message: "Не удалось получить настройки попапа" });
    }
};
exports.getPopup = getPopup;
