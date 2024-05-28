"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const constants_1 = require("../../constants");
const prisma_1 = __importDefault(require("../../config/prisma"));
const updateUser = async (req, res) => {
    try {
        const { secret, updates } = req.body;
        if (secret !== constants_1.ADMIN_SERVER_SECRET) {
            return res.status(403).json({ message: "Неверный секрет" });
        }
        const updatedUser = await prisma_1.default.user.update({
            where: {
                id: updates.id,
            },
            data: {
                permits: updates.permits,
            },
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось обновить пользователя" });
    }
};
exports.updateUser = updateUser;
