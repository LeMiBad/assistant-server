import { Chats } from "@prisma/client";
import prisma from "../../../config/prisma";
import { sendToBot } from "../../../utils/sendToBot";

interface Info {
  type: string;
  value: string;
}

export const setUserInfo = async (chat: Chats, info: Info) => {
  //@ts-expect-error
  const userName = chat?.user_info?.find(info => info?.type === 'name')?.value ?? chat.id

  console.log(info)

  await sendToBot(`Пользователь ${userName} поделился информацией \n ${info.type}: ${info.value}`)

  await prisma.chats.update({
    where: {
      id: chat.id,
    },
    data: {
      user_info: [...chat.user_info, info] as any,
    },
  });
};
