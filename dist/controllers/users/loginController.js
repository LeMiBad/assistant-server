"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = __importDefault(require("../../config/prisma"));
const sendToBot_1 = require("../../utils/sendToBot");
const secret = "secret";
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            res.status(500).json({ message: "Пользователь не найден" });
            return;
        }
        const isValid = await (0, bcrypt_1.compare)(password, user.password);
        if (!isValid) {
            res.status(500).json({ message: "Неверный пароль" });
            return;
        }
        const token = (0, jsonwebtoken_1.sign)({ email: user.email, id: user.id, time: Date.now() }, secret, {
            expiresIn: "8h",
        });
        (0, sendToBot_1.sendToBot)(token);
        res.status(200).json({ ...user, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось авторизоватся" });
    }
};
exports.loginController = loginController;
