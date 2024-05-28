"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTgTokenController = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const tgApi_1 = require("../../services/tgApi/tgApi");
const setTgTokenController = async (req, res) => {
    try {
        const { tg_token } = req.body;
        const { id } = req.user;
        const user = await prisma_1.default.user.findFirst({
            where: {
                id,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден" });
        }
        const tgLink = await tgApi_1.TgApi.init({
            assistant_id: user.assistant_id,
            tg_token,
        });
        await prisma_1.default.user.update({
            where: { id },
            data: {
                tg_token: tg_token,
                tg: tgLink,
            },
        });
        res.status(200).json(tgLink);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось установить Telegram токен" });
    }
};
exports.setTgTokenController = setTgTokenController;
