import { Request, Response } from "express";
import { v4 } from "uuid";
import { Popup } from "@prisma/client";
import prisma from "../../config/prisma";

type Data = Popup | null | { message: string };

export const updatePopup = async (req: Request, res: Response<Data>) => {
  try {
    const { popup_id, updates } = req.body;
    const { id: user_id } = (req as any).user;

    let popup;

    if (!popup_id) {
      popup = await prisma.popup.create({
        data: {
          id: v4(),
          user_id,
          settings: updates,
        },
      });
    } else {
      popup = await prisma.popup.update({
        where: { id: popup_id },
        data: {
          settings: updates,
        },
      });
    }

    res.status(200).json(popup);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось обновить или создать попап" });
  }
};
