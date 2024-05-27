import { Request, Response } from "express";
import prisma from "../../config/prisma";
import { TgApi } from "../../services/tgApi/tgApi";

type Data = string | { message: string };

export const setTgTokenController = async (
  req: Request,
  res: Response<Data>,
) => {
  try {
    const { tg_token } = req.body;
    const { id } = (req as any).user;

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const tgLink = await TgApi.init({
      assistant_id: user.assistant_id!,
      tg_token,
    });

    await prisma.user.update({
      where: { id },
      data: {
        tg_token: tg_token,
        tg: tgLink,
      },
    });

    res.status(200).json(tgLink);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось установить Telegram токен" });
  }
};
