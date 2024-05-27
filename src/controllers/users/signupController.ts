// src/controllers/users/signup.ts
import { Request, Response } from "express";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import prisma from "../../config/prisma";
import { v4 } from "uuid";

type Data =
  | {
      token: string;
      email: string;
    }
  | { message: string };

const secret = "secret";

export const signupController = async (req: Request, res: Response<Data>) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const id = v4();

    const user = await prisma.user.create({
      data: {
        id,
        email,
        password: hashedPassword,
        created_at: new Date(),
        permits: [],
      },
    });

    const token = sign({ email: user.email, id, time: Date.now() }, secret, {
      expiresIn: "8h",
    });

    res.status(200).json({ token, email: user.email });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Пользователь с таким email уже зарегистрирован" });
  }
};
