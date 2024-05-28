"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePopup = void 0;
const uuid_1 = require("uuid");
const prisma_1 = __importDefault(require("../../config/prisma"));
const updatePopup = async (req, res) => {
    try {
        const { popup_id, updates } = req.body;
        const { id: user_id } = req.user;
        let popup;
        if (!popup_id) {
            popup = await prisma_1.default.popup.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    user_id,
                    settings: updates,
                },
            });
        }
        else {
            popup = await prisma_1.default.popup.update({
                where: { id: popup_id },
                data: {
                    settings: updates,
                },
            });
        }
        res.status(200).json(popup);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось обновить или создать попап" });
    }
};
exports.updatePopup = updatePopup;
