"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAssistant = void 0;
const uuid_1 = require("uuid");
const prisma_1 = __importDefault(require("../../config/prisma"));
const constants_1 = require("./utils/constants");
const createAssistant = async (req, res) => {
    try {
        const { setting } = req.body;
        const file = req.body.file;
        const { id: user_id } = req.user;
        const assistantPromt = (0, constants_1.getAssistantProps)(setting);
        const newAssistantId = (0, uuid_1.v4)();
        const newAssistant = await prisma_1.default.assistantSetting.create({
            data: {
                ...setting,
                id: newAssistantId,
                created_at: new Date(),
                user_id,
                model: assistantPromt.model,
            },
        });
        await prisma_1.default.user.update({
            data: {
                assistant_id: newAssistantId,
            },
            where: {
                id: user_id,
            },
        });
        if (file) {
            await prisma_1.default.files.create({
                data: {
                    id: file.id,
                    created_at: new Date(file.created_at),
                    name: file.filename,
                    assistant_id: newAssistantId,
                },
            });
        }
        res.status(200).json(newAssistant);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Не удалось создать ассистента" });
    }
};
exports.createAssistant = createAssistant;
