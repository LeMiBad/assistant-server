"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const constants_1 = require("../../constants");
const prisma_1 = __importDefault(require("../../config/prisma"));
const getAllUsers = async (req, res) => {
    try {
        const { secret } = req.body;
        if (secret !== constants_1.ADMIN_SERVER_SECRET) {
            return res.status(403).json({ message: "Неверный секрет" });
        }
        const users = await prisma_1.default.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось получить пользователей" });
    }
};
exports.getAllUsers = getAllUsers;
