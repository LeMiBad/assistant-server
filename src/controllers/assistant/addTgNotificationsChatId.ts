import { Request, Response } from "express";
import { ADMIN_SERVER_SECRET } from "../../constants";
import prisma from "../../config/prisma";

type Data = string | { message: string };

export const addTgNotificationsChatId = async (req: Request, res: Response<Data>) => {
  try {
    const { chat_id, secret, assistant_id } = req.body;

    if (secret !== ADMIN_SERVER_SECRET) {
      return res.status(403).json({ message: "Неверный секрет" });
    }

    const assistant = await prisma.assistantSetting.findFirst({
      where: {
        id: assistant_id
      }
    })

    await prisma.assistantSetting.update({
      where: {
        id: assistant_id
      },
      data: {
        tg_notifications_chat_ids: [...assistant?.tg_notifications_chat_ids!, chat_id]
      }
    })

    res.status(200).json(chat_id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось обновить данные ассистента" });
  }
};
