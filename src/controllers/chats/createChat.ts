import prisma from "../../config/prisma";
import { Request, Response } from "express";
import { Chats } from "@prisma/client";
import { v4 } from "uuid";

type Data = Chats | { message: string };

export const createChat = async (req: Request, res: Response<Data>) => {
  
  try {
    const { assistant_id, integration_type, id } = req.body;
    const assistant = await prisma.assistantSetting.findFirst({
      where: { id: assistant_id },
    });

    if (!assistant) {
      res
        .status(500)
        .json({ message: "Не удалось найти ассистента при создании чата" });
      return;
    }

    const newChatId = id ?? v4();

    const chat = await prisma.chats.create({
      data: {
        id: newChatId,
        user_id: assistant?.user_id,
        chat_history: [],
        target: [],
        user_info: [],
        created_at: new Date(),
        assistant_id,
        is_blocked: false,
        integration_type: integration_type ?? "browser",
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось получить чат" });
  }
}
