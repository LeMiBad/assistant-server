import { Request, Response } from "express";
import { AssistantSetting } from "@prisma/client";
import prisma from "../../config/prisma";

type Data = AssistantSetting | { message: string };

export const updateAssistant = async (req: Request, res: Response<Data>) => {
  try {
    const { assistant_id, updates } = req.body;

    if (!assistant_id) {
      return res.status(400).json({ message: "Требуется ID ассистента" });
    }

    const updatedAssistant = await prisma.assistantSetting.update({
      where: { id: assistant_id },
      data: updates,
    });

    res.status(200).json(updatedAssistant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось обновить данные ассистента" });
  }
};
