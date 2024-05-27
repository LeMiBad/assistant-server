import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface DecodedToken {
  email: string;
  id: string;
  time: number;
  iat: number;
  exp: number;
}

const secret = "secret";

export function verifyToken(
  token: string,
  res: Response,
): Promise<DecodedToken> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.status(401).json({ message: "Токен истек" });
          reject(new Error("Токен истек"));
        } else {
          res.status(401).json({ message: "Неверный токен" });
          reject(new Error("Неверный токен"));
        }
      } else {
        if (typeof decoded === "object" && decoded !== null) {
          resolve(decoded as DecodedToken);
        } else {
          reject(new Error("Декодированные данные не являются объектом"));
        }
      }
    });
  });
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Токен не предоставлен" });
  }

  try {
    const decoded = await verifyToken(token, res);
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error(error);
  }
};
