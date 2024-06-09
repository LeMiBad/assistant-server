import { Request, Response, NextFunction } from "express";
import { ADMIN_SERVER_SECRET } from "../../../constants";
import { User } from "@prisma/client";
import prisma from '../../../config/prisma';
import { Subscription } from "../../../types";

type Data = User | { message: string };

const subscriptionTarifsMap = {
  1: { label: "AI-Free", price: 0, value: 1 },
  2: { label: "AI-Старт", price: 7_999, value: 2 },
  3: { label: "AI-Специалист", price: 15_999, value: 3 },
  4: { label: "AI-Профессионал", price: 42_300, value: 4 },
};

export const activateSubscription = async (
  req: Request,
  res: Response<Data>,
  next: NextFunction,
) => {
  try {
    let { secret, subscription, user_id } = req.body;

    if (secret !== ADMIN_SERVER_SECRET) {
      res.status(403).json({ message: "Нету доступа" });
    }
    
    const user = await prisma.user.findFirst({
      where: {
        id: user_id
      }
    })

    const {value: tarif, price, duration} = subscription

    const millisecondsInAMonth = 30 * 24 * 60 * 60 * 1000;

    
    //@ts-expect-error
    const pickedSubscriptionTarif = subscriptionTarifsMap[tarif]

    //@ts-expect-error
    if(user?.check < pickedSubscriptionTarif.price) {
      res.status(500).json({message: 'Недостаточно средств'})
    }

    const newSubscriptionBody: Subscription = {
      tarif,
      isActive: true,
      lastActivateDate: new Date(),
      duration: duration ?? millisecondsInAMonth
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        subscription: newSubscriptionBody,
        check: user?.check! - price
      }
    })

    res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error);
    next(error);
  }
};
