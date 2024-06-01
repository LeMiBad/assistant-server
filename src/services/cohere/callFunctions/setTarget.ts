import { Chats } from "@prisma/client";
import prisma from "../../../config/prisma";
import { sendToBot } from "../../../utils/sendToBot";

interface Info {
  type: string;
  value: string;
}

export const setTarget = async (chat: Chats, info: Info) => {
  //@ts-expect-error
  const userName = chat?.user_info?.find(info => info?.type === 'name')?.value ?? chat.id

  await sendToBot(`Пользователь ${userName} совершил целевое действие \n ${info.type}: ${info.value}}`)

  await prisma.chats.update({
    where: {
      id: chat.id,
    },
    data: {
      target: [...chat.target, info] as any,
    },
  });
};
