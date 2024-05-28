"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TgApi = void 0;
const axios_1 = __importDefault(require("axios"));
// const host = "http://localhost:80/api/";
const host = "http://213.171.10.159/api/";
exports.TgApi = {
    init: async ({ assistant_id, tg_token, }) => {
        return await (await axios_1.default.post(`${host}init`, { assistant_id, tg_token })).data;
    },
    stop: async (tg_token) => {
        return await (await axios_1.default.post(`${host}stop`, { tg_token })).data;
    },
    send: async ({ bot_id, chat_id, content }) => {
        try {
            return await (await axios_1.default.post(`${host}send`, { bot_id, chat_id, content })).data;
        }
        catch { }
    },
};
