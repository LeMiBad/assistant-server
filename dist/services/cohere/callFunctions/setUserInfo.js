"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserInfo = void 0;
const prisma_1 = __importDefault(require("../../../config/prisma"));
const setUserInfo = async (chat, info) => {
    await prisma_1.default.chats.update({
        where: {
            id: chat.id,
        },
        data: {
            user_info: [...chat.user_info, info],
        },
    });
};
exports.setUserInfo = setUserInfo;
