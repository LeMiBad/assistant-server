import { Request, Response } from "express";
import { Popup } from "@prisma/client";
import prisma from "../../config/prisma";

type Data = Popup | null | string | { message: string };

export const getPopup = async (req: Request, res: Response<Data>) => {
  try {
    const { popup_id } = req.query;

    if (popup_id) {
      const popup = await prisma.popup.findFirst({
        where: { id: popup_id as string },
      });

      if (popup) {
        const popupSettings = popup.settings as { code: string };
        res.setHeader("Content-Type", "application/javascript");
        return res.status(200).send(popupSettings.code);
      } else {
        return res.status(404).json({ message: "Попап не найден" });
      }
    }

    const { id } = (req as any).user;

    const popup = await prisma.popup.findFirst({
      where: { user_id: id },
    });

    res.status(200).json(popup);
  } catch (error) {
    res.status(500).json({ message: "Не удалось получить настройки попапа" });
  }
};
