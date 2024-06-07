import { NextFunction, Request, Response } from "express";
import { Chats } from "@prisma/client";
import prisma from "../../config/prisma";

type Data = Chats[] | { message: string };

export const getChats = async (
  req: Request,
  res: Response<Data>,
  next: NextFunction,
) => {
  try {
    const { assistant_id } = req.body;

    if (!assistant_id) {
      return res.status(400).json({ message: "Требуется ID ассистента" });
    }

    const chats = await prisma.chats.findMany({
      where: { assistant_id },
    });

    console.log(chats)

    res.status(200).json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось получить чат" });
    next(error);
  }
};
