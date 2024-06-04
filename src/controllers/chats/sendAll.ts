import { NextFunction, Request, Response } from "express";
import { Chats } from "@prisma/client";
import prisma from "../../config/prisma";
import { TgApi } from "../../services/tgApi/tgApi";

type Data = Chats[] | { message: string };

export const sendAll = async (
  req: Request,
  res: Response<Data>,
  next: NextFunction,
) => {
  try {
    const { id: user_id } = (req as any).user;
    const { assistant_id, message } = req.body;

    if (!assistant_id) {
      return res.status(400).json({ message: "Требуется ID ассистента" });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: user_id
      }
    })

    const chats = await prisma.chats.findMany({
      where: {
        integration_type: 'tg',
        assistant_id
      }
    })

    await Promise.all(chats.map(async chat => {
      await prisma.chats.update({
        where: {
          id: chat.id
        },
        data: {
          //@ts-expect-error
          chat_history: [...chat.chat_history, { role: 'CHATBOT', message }]
        }
      })

      await TgApi.send({ bot_id: user?.tg_token!, chat_id: chat.id, content: message})
    }))

    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не провести рассылку" });
    next(error);
  }
};
