import { Request, Response } from "express";
import { User } from "@prisma/client";
import { ADMIN_SERVER_SECRET } from "../../constants";
import prisma from "../../config/prisma";

type Data = User | { message: string };

export const updateUser = async (req: Request, res: Response<Data>) => {
  try {
    const { secret, updates } = req.body;

    if (secret !== ADMIN_SERVER_SECRET) {
      return res.status(403).json({ message: "Неверный секрет" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: updates.id,
      },
      data: {
        permits: updates.permits,
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось обновить пользователя" });
  }
};
