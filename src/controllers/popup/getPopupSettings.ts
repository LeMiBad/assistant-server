import { Request, Response } from "express";
import { Popup } from "@prisma/client";
import prisma from "../../config/prisma";

type Data = Popup | null | string | { message: string };

export const getPopupSettings = async (req: Request, res: Response<Data>) => {
  try {
    const { id } = (req as any).user;

    const popup = await prisma.popup.findFirst({
      where: {
        user_id: id,
      },
    });

    res.status(200).json(popup);
  } catch (error) {
    console.log("ERROR");
    res.status(500).json({ message: "Не удалось получить настройки попапа" });
  }
};
