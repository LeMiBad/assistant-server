import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import prisma from "../../config/prisma";
import { User } from "@prisma/client";

interface Resp extends User {
  token: string;
}

type Data = Resp | { message: string };

const secret = "secret";

export const loginController = async (req: Request, res: Response<Data>) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(500).json({ message: "Пользователь не найден" });
      return;
    }

    const isValid = await compare(password, user.password);
    if (!isValid) {
      res.status(500).json({ message: "Неверный пароль" });
      return;
    }

    const token = sign(
      { email: user.email, id: user.id, time: Date.now() },
      secret,
      {
        expiresIn: "8h",
      },
    );

    res.status(200).json({ ...user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Не удалось авторизоватся" });
  }
};
