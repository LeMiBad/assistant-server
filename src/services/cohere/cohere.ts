import { getCohereInstructuion, getCohereTools } from "./getCohereInstructuion";
import { Chats } from "@prisma/client";
import { v4 } from "uuid";
import { functionsAdapter } from "./functionAdapter";
import axios from "axios";
import prisma from "../../config/prisma";
import { MessageItem, Role } from "../../types";

export const makeCohereRequest = async (body: any) => {
  const result = await (
    await axios.post("http://45.93.201.73/chat", body)
  ).data;

  return result;
};

interface CohereSendMessageProps extends Chats {
  message: {
    role: Role;
    message: string;
  };
}

export const cohereSendMessage = async ({
  message,
  assistant_id,
  id,
  chat_history,
}: CohereSendMessageProps) => {
  const { message: content, role } = message;

  const chat = await prisma.chats.findUnique({
    where: {
      id,
    },
  });

  if (chat?.is_blocked) {
    const updatedChat = await prisma.chats.update({
      where: {
        id,
      },
      data: {
        chat_history: [
          //@ts-expect-error
          ...(chat_history as MessageItem[]),
          { ...message, role, position: chat_history.length },
        ],
      },
    });

    return updatedChat;
  }

  const assistant = await prisma.assistantSetting.findFirst({
    where: {
      id: assistant_id,
    },
  });

  const assistantInstruction = getCohereInstructuion(assistant!);

  const cohereBody = {
    preamble: assistantInstruction,
    chat_history: chat?.chat_history.filter(
      //@ts-expect-error
      (item: MessageItem) => !!item.message && !!message.role,
    ),
    message: content,
    model: "command-r-plus",
    tools: getCohereTools(),
  };

  let cohereAnswer: any = await makeCohereRequest(cohereBody);

  if (cohereAnswer.tool_calls) {
    cohereAnswer = {
      ...(await functionsAdapter(chat as Chats, cohereAnswer, cohereBody)),
    };
  }

  const answer: MessageItem = {
    message: cohereAnswer.text,
    role: "CHATBOT",
    created_at: new Date(),
    id: v4(),
  };

  const updatedChat = await prisma.chats.update({
    where: {
      id,
    },
    data: {
      chat_history: [
        ...chat_history,
        { ...message, role: "USER", position: chat_history.length },
        { ...(answer as any), position: chat_history.length + 1 },
      ],
    },
  });

  return { ...updatedChat, text: cohereAnswer.text };
};
