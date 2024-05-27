import { Request, Response } from "express";
import { v4 } from "uuid";
import { AssistantSetting } from "@prisma/client";
import prisma from "../../config/prisma";
import { getAssistantProps } from "./utils/constants";

type Data = AssistantSetting | { message: string };

export const createAssistant = async (req: Request, res: Response<Data>) => {
  try {
    const { setting } = req.body;
    const file = req.body.file;
    const { id: user_id } = (req as any).user;

    const assistantPromt = getAssistantProps(setting);

    const newAssistantId = v4();

    const newAssistant = await prisma.assistantSetting.create({
      data: {
        ...setting,
        id: newAssistantId,
        created_at: new Date(),
        user_id,
        model: assistantPromt.model,
      },
    });

    await prisma.user.update({
      data: {
        assistant_id: newAssistantId,
      },
      where: {
        id: user_id,
      },
    });

    if (file) {
      await prisma.files.create({
        data: {
          id: file.id,
          created_at: new Date(file.created_at),
          name: file.filename,
          assistant_id: newAssistantId,
        },
      });
    }

    res.status(200).json(newAssistant);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Не удалось создать ассистента" });
  }
};
