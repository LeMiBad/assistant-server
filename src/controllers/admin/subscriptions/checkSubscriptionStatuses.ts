import { User } from "@prisma/client";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import prisma from "../../../config/prisma";

dayjs.extend(duration);

export const checkSubscriptionStatuses = async (users: User[]) => {
  const updatedUsers = await Promise.all(
    users.map(async user => {
      const { subscription, id } = user;

      //@ts-expect-error
      const { lastActivateDate, duration, isActive } = subscription;

      const now = dayjs();
      const endDate = dayjs(lastActivateDate).add(duration, "millisecond");
      const remaining = endDate.diff(now);

      if (remaining <= 0) {
        if(isActive === true) {
          return await prisma.user.update({
            where: {
              id
            },
            data: {
              subscription: {
                ...subscription as any,
                isActive: false
              }
            }
          })
        }
      }

      return user
    }),
  );

  return updatedUsers
};
