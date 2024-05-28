import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";

type Data = string[] | { message: string };

export const deleteChats = async (
  req: Request,
  res: Response<Data>,
  next: NextFunction,
) => {
  try {
    const { ids } = req.body;

    await Promise.all(
      ids.map((id: string) => prisma.chats.delete({ where: { id } })),
    );

    res.status(200).json(ids);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось удалить чаты" });
    next(error);
  }
};
