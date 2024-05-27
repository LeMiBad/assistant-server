import { Chats } from "@prisma/client";
import prisma from "../../../config/prisma";

interface Info {
  targets: {
    type: string;
    value: string;
  }[];
}

export const setTarget = async (chat: Chats, info: Info) => {
  await prisma.chats.update({
    where: {
      id: chat.id,
    },
    data: {
      target: [...chat.target, info] as any,
    },
  });
};
