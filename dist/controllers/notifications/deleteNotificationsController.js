"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotificationsController = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const deleteNotificationsController = async (req, res) => {
    try {
        const { ids } = req.body;
        for (let id of ids) {
            await prisma_1.default.notification.delete({
                where: { id },
            });
        }
        res.status(200).json(ids);
    }
    catch (error) {
        res.status(500).json({ message: "Не удалось удалить уведомления" });
    }
};
exports.deleteNotificationsController = deleteNotificationsController;
