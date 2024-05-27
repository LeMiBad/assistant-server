import { Chats } from "@prisma/client";
import prisma from "../../../config/prisma";

interface Info {
  user_info: {
    type: string;
    value: string;
  }[];
}

export const setUserInfo = async (chat: Chats, info: Info) => {
  await prisma.chats.update({
    where: {
      id: chat.id,
    },
    data: {
      user_info: [...chat.user_info, info] as any,
    },
  });
};
