"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTgTokens = void 0;
const constants_1 = require("../../constants");
const prisma_1 = __importDefault(require("../../config/prisma"));
const getTgTokens = async (req, res, next) => {
    try {
        const { secret } = req.body;
        if (secret === constants_1.ADMIN_SECRET) {
            const allTokens = await (await prisma_1.default.user.findMany({
                where: {
                    NOT: {
                        tg_token: null,
                    },
                },
            })).filter(user => !!user.tg_token);
            res.status(200).json(allTokens);
        }
        else {
            throw new Error("Неверная сикрет фраза");
        }
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.getTgTokens = getTgTokens;
