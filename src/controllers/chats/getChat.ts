import { Request, Response } from "express";
import { Chats } from "@prisma/client";
import prisma from "../../config/prisma";

type Data = Chats | { message: string };

export const getChat = async (req: Request, res: Response<Data>) => {
  try {
    const { chat_id } = req.body;

    const chat = await prisma.chats.findUnique({
      where: {
        id: chat_id,
      },
    });

    if (chat) {
      res.status(200).json(chat);
    } else {
      res.status(404).json({ message: "Не удалось получить чат" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось получить чат" });
  }
};
