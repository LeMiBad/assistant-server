import { Request, Response } from "express";
import { Chats } from "@prisma/client";
import prisma from "../../config/prisma";

type Data = Chats | { message: string };

export const blockChat = async (req: Request, res: Response<Data>) => {
  try {
    const { chat_id, blocked } = req.body;

    const chat = await prisma.chats.update({
      where: {
        id: chat_id,
      },
      data: {
        is_blocked: blocked,
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось обновить статус чата" });
  }
};
