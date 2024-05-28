"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cohereSendMessage = exports.makeCohereRequest = void 0;
const getCohereInstructuion_1 = require("./getCohereInstructuion");
const uuid_1 = require("uuid");
const functionAdapter_1 = require("./functionAdapter");
const axios_1 = __importDefault(require("axios"));
const prisma_1 = __importDefault(require("../../config/prisma"));
const makeCohereRequest = async (body) => {
    const result = await (await axios_1.default.post("http://45.93.201.73/chat", body)).data;
    return result;
};
exports.makeCohereRequest = makeCohereRequest;
const cohereSendMessage = async ({ message, assistant_id, id, chat_history, }) => {
    const { message: content, role } = message;
    const chat = await prisma_1.default.chats.findUnique({
        where: {
            id,
        },
    });
    if (chat?.is_blocked) {
        const updatedChat = await prisma_1.default.chats.update({
            where: {
                id,
            },
            data: {
                chat_history: [
                    //@ts-expect-error
                    ...chat_history,
                    { ...message, role, position: chat_history.length },
                ],
            },
        });
        return updatedChat;
    }
    const assistant = await prisma_1.default.assistantSetting.findFirst({
        where: {
            id: assistant_id,
        },
    });
    const assistantInstruction = (0, getCohereInstructuion_1.getCohereInstructuion)(assistant);
    const cohereBody = {
        preamble: assistantInstruction,
        chat_history: chat?.chat_history.filter(
        //@ts-expect-error
        (item) => !!item.message && !!message.role),
        message: content,
        model: "command-r-plus",
        tools: (0, getCohereInstructuion_1.getCohereTools)(),
    };
    let cohereAnswer = await (0, exports.makeCohereRequest)(cohereBody);
    if (cohereAnswer.tool_calls) {
        cohereAnswer = {
            ...(await (0, functionAdapter_1.functionsAdapter)(chat, cohereAnswer, cohereBody)),
        };
    }
    const answer = {
        message: cohereAnswer.text,
        role: "CHATBOT",
        created_at: new Date(),
        id: (0, uuid_1.v4)(),
    };
    const updatedChat = await prisma_1.default.chats.update({
        where: {
            id,
        },
        data: {
            chat_history: [
                ...chat_history,
                { ...message, role: "USER", position: chat_history.length },
                { ...answer, position: chat_history.length + 1 },
            ],
        },
    });
    return { ...updatedChat, text: cohereAnswer.text };
};
exports.cohereSendMessage = cohereSendMessage;
