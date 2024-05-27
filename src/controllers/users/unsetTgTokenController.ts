import { Request, Response } from "express";
import { User } from "@prisma/client";
import prisma from "../../config/prisma";
import { TgApi } from "../../services/tgApi/tgApi";

type Data = User | { message: string };

export const unsetTgTokenController = async (
  req: Request,
  res: Response<Data>,
) => {
  try {
    const { id } = (req as any).user;

    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const tg_token = user.tg_token;

    if (tg_token) {
      await TgApi.stop(tg_token).then(console.log);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        tg_token: null,
        tg: null,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось отвязать телеграмм" });
  }
};
