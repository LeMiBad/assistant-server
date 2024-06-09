import { Request, Response } from "express";
import { User } from "@prisma/client";
import { ADMIN_SERVER_SECRET } from "../../constants";
import prisma from "../../config/prisma";
import { checkSubscriptionStatuses } from "./subscriptions/checkSubscriptionStatuses";

type Data = User[] | { message: string };

export const getAllUsers = async (req: Request, res: Response<Data>) => {
  try {
    const { secret } = req.body;

    if (secret !== ADMIN_SERVER_SECRET) {
      return res.status(403).json({ message: "Неверный секрет" });
    }

    let users = await prisma.user.findMany();

    users = await checkSubscriptionStatuses(users)

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось получить пользователей" });
  }
};
