"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTarget = void 0;
const prisma_1 = __importDefault(require("../../../config/prisma"));
const setTarget = async (chat, info) => {
    await prisma_1.default.chats.update({
        where: {
            id: chat.id,
        },
        data: {
            target: [...chat.target, info],
        },
    });
};
exports.setTarget = setTarget;
