import { Chats } from "@prisma/client";
import prisma from "../../../config/prisma";
import { TgApi } from "../../tgApi/tgApi";

interface Info {
  type: string;
  value: string;
}

const sendTgNotification = async (chat: Chats, info: Info[]) => {
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

  const infosString = info.map(({type, value}) => `${type}: ${value}`).join('\n')

  const message = `Пользователь совершил целевое действие ✅ \n\n${infosString}\n\nВ чате: https://ai-tools-tech.ru/ru/consultant?chat_id=${chat.id}`
  
  for(let tg_chat_id of ids) {
    TgApi.send({ chat_id: tg_chat_id, content: message, bot_id: user?.tg_token ?? "" })
  }
}

export const setTarget = async (chat: Chats, info: Info[]) => {
  sendTgNotification(chat, info)

  await prisma.chats.update({
    where: {
      id: chat.id,
    },
    data: {
      target: [...chat.target, ...info] as any,
    },
  });
};
