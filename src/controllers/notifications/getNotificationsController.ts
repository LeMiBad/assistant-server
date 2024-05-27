import { Request, Response } from "express";
import { Notification } from "@prisma/client";
import prisma from "../../config/prisma";
import dayjs from "dayjs";

type Data = Notification[] | { message: string };

export const getNotificationsController = async (
  req: Request,
  res: Response<Data>,
) => {
  try {
    const { config } = req.body;
    const { id } = (req as any).user;

    const notifications = await prisma.notification.findMany({
      where: { user_id: id, ...config },
    });

    const oldNotifications = notifications
      .filter(notification => {
        if (notification.status === "YELLOW") {
          const notificationDate = dayjs(notification.created_at);
          const curDate = dayjs(new Date());

          const diffInHours = curDate.diff(notificationDate, "hour");

          return diffInHours > 24;
        }
        return false;
      })
      .map(notification => notification.id);

    for (let notificationId of oldNotifications) {
      await prisma.notification.delete({
        where: {
          id: notificationId,
        },
      });
    }

    const result = notifications.filter(
      notification => !oldNotifications.includes(notification.id),
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Не удалось получить ассистентов" });
  }
};
