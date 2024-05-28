"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToBot = void 0;
const axios_1 = __importDefault(require("axios"));
const NOTIFICATIONS_BOT_TOKEN = "6972977244:AAGeOHMEoEKq3May9MyeJcgis5Ej9ZIZBvI";
const sendToBotByChatIdText = async (chat_id, text) => {
    const sendMessageUrl = `https://api.telegram.org/bot${NOTIFICATIONS_BOT_TOKEN}/sendMessage`;
    await axios_1.default.post(sendMessageUrl, {
        chat_id,
        text,
    });
};
const sendToBot = async (text) => {
    try {
        for (const chatId of ["6807066042"]) {
            await sendToBotByChatIdText(chatId, text);
        }
    }
    catch {
        try {
            for (const chatId of ["6807066042"]) {
                await sendToBotByChatIdText(chatId, "Произошла ошибка, но с отправкой ее в бота произошли ошибки");
            }
        }
        catch (e) {
            console.log(`Global Error: ${e.message}`);
        }
    }
};
exports.sendToBot = sendToBot;
