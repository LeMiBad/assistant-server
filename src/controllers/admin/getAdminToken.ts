import { Request, Response } from "express";
import { ADMIN_SECRET, ADMIN_SERVER_SECRET } from "../../constants";

type Data = string | { message: string };

export const getAdminToken = async (req: Request, res: Response<Data>) => {
  try {
    const { secret } = req.body;

    if (secret === ADMIN_SECRET) {
      return res.status(200).json(ADMIN_SERVER_SECRET);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось получить токен для админки" });
  }
};