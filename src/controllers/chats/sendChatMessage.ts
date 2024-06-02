import { Request, Response } from "express";
import { Chats } from "@prisma/client";
import prisma from "../../config/prisma";
import { cohereSendMessage } from "../../services/cohere/cohere";
import { TgApi } from "../../services/tgApi/tgApi";

type Data = Chats | { message: string };

export const sendChatMessage = async (req: Request, res: Response<Data>) => {
  try {
    let { chat_id, message } = req.body;
    let updatedChat;

    const chat = await prisma.chats.findFirst({
      where: {
        id: chat_id,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: chat?.user_id ?? ''
      }
    })

    if (!chat) {
      return res.status(404).json({ message: "Чат не найден" });
    }

    if (message.role === "CHATBOT") {
      updatedChat = await prisma.chats.update({
        where: {
          id: chat_id,
        },
        data: {
          chat_history: [...(chat.chat_history as any), message],
        },
      });

      await TgApi.send({ chat_id, content: message.message, bot_id: user?.tg_token ?? "" })

    } else {
      updatedChat = await cohereSendMessage({ ...chat, message });
    }

    res.status(200).json(updatedChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Не удалось получить чат",
    });
  }
};
