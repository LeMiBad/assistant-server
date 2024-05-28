import { Request, Response, NextFunction } from "express";
import { ADMIN_SECRET } from "../../constants";
import prisma from "../../config/prisma";
import { User } from "@prisma/client";

type Data = User[] | { message: string };

export const getTgTokens = async (
  req: Request,
  res: Response<Data>,
  next: NextFunction,
) => {
  try {
    const { secret } = req.body;

    if (secret === ADMIN_SECRET) {
      const allTokens = await (
        await prisma.user.findMany({
          where: {
            NOT: {
              tg_token: null,
            },
          },
        })
      ).filter(user => !!user.tg_token);

      res.status(200).json(allTokens);
    } else {
      throw new Error("Неверная сикрет фраза");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
