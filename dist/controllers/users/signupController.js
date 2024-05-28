"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = __importDefault(require("../../config/prisma"));
const uuid_1 = require("uuid");
const secret = "secret";
const signupController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const id = (0, uuid_1.v4)();
        const user = await prisma_1.default.user.create({
            data: {
                id,
                email,
                password: hashedPassword,
                created_at: new Date(),
                permits: [],
            },
        });
        const token = (0, jsonwebtoken_1.sign)({ email: user.email, id, time: Date.now() }, secret, {
            expiresIn: "8h",
        });
        res.status(200).json({ token, email: user.email });
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ message: "Пользователь с таким email уже зарегистрирован" });
    }
};
exports.signupController = signupController;
