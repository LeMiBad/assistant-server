"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsetTgTokenController = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const tgApi_1 = require("../../services/tgApi/tgApi");
const unsetTgTokenController = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await prisma_1.default.user.findFirst({
            where: { id },
        });
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }
        const tg_token = user.tg_token;
        if (tg_token) {
            await tgApi_1.TgApi.stop(tg_token).then(console.log);
        }
        const updatedUser = await prisma_1.default.user.update({
            where: { id },
            data: {
                tg_token: null,
                tg: null,
            },
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось отвязать телеграмм" });
    }
};
exports.unsetTgTokenController = unsetTgTokenController;
