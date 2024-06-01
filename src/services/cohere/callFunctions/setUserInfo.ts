import { Chats } from "@prisma/client";
import prisma from "../../../config/prisma";
import { sendToBot } from "../../../utils/sendToBot";

interface Info {
  user_info: {
    type: string;
    value: string;
  }[];
}

export const setUserInfo = async (chat: Chats, info: Info) => {

  //@ts-expect-error
  const userName = chat?.user_info?.find(info => info?.type === 'name').value ?? chat.id

  const infosString = info.user_info.map(target => `${target.type}: ${target.value}`)

  await sendToBot(`Пользователь ${userName} поделился информацией \n ${infosString.join('\n\n')}`)

  await prisma.chats.update({
    where: {
      id: chat.id,
    },
    data: {
      user_info: [...chat.user_info, info] as any,
    },
  });
};
