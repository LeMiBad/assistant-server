import { Request, Response } from "express";
import { AssistantSetting } from "@prisma/client";
import prisma from "../../config/prisma";

type Data = AssistantSetting | { message: string };

export const getAssistantSettings = async (
  req: Request,
  res: Response<Data>,
) => {
  try {
    const { id } = (req as any).user;

    const assistant = await prisma.assistantSetting.findFirst({
      where: { user_id: id },
    });

    if (!assistant) {
      return res
        .status(404)
        .json({ message: "Настройки ассистента не найдены" });
    }

    res.status(200).json(assistant);
  } catch (error) {
    console.log("Не удалось получить настройки ассистента: " + error);
    res
      .status(500)
      .json({ message: "Не удалось получить настройки ассистента" });
  }
};
