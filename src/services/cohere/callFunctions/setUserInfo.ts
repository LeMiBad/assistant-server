import { Chats } from "@prisma/client";
import prisma from "../../../config/prisma";

import { TgApi } from "../../tgApi/tgApi";

interface Info {
  type: string;
  value: string;
}

const sendTgNotification = async (chat: Chats, info: Info) => {
  //@ts-expect-error
  const userName = chat?.user_info?.find(info => info?.type === 'name')?.value ?? chat.id

  const assistant = await prisma.assistantSetting.findFirst({
    where: {
      id: chat.assistant_id
    },
  })

  const ids = assistant?.tg_notifications_chat_ids!

  const user = await prisma.user.findFirst({
    where: {
      id: chat.user_id!
    },
  })

  const message = `Пользователь ${userName} поделился данными \n ${info.type}: ${info.value} \n https://ai-tools-tech.ru/ru/consultant?chat_id=${chat.id}`
  
  for(let tg_chat_id of ids) {
    await TgApi.send({ chat_id: tg_chat_id, content: message, bot_id: user?.tg_token ?? "" })
  }
}

export const setUserInfo = async (chat: Chats, info: Info) => {
  sendTgNotification(chat, info)

  await prisma.chats.update({
    where: {
      id: chat.id,
    },
    data: {
      user_info: [...chat.user_info, info] as any,
    },
  });
};
