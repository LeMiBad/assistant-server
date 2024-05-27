import { Request, Response } from "express";
import prisma from "../../config/prisma";

type Data = string[] | { message: string };

export const deleteNotificationsController = async (
  req: Request,
  res: Response<Data>,
) => {
  try {
    const { ids } = req.body;

    for (let id of ids) {
      await prisma.notification.delete({
        where: { id },
      });
    }

    res.status(200).json(ids);
  } catch (error) {
    res.status(500).json({ message: "Не удалось удалить уведомления" });
  }
};
