import { AssistantSetting } from "@prisma/client";

export type AssistantType = "recruiter" | "service" | "salesman";

export type AssistantSettings = Omit<
  AssistantSetting,
  "id" | "user_id" | "created_at" | "model"
>;

const getInstruction = ({
  name,
  role,
  org_info,
  answer_length,
  target,
  faq,
}: AssistantSettings) => {
  return `Тебя зовут ${name} и ты работаешь в должности ${role}. Твоя цель - ${target}. Используй информацию о компании "${org_info}".
  Отвечай кратко, сдержанно и в человеческой манере,${
    !!answer_length ? ` не более ${answer_length} символов на ответ` : ``
  }.
  Не повторяйся в вопросах и предложениях и веди пользователя к цели, задавая наводящие вопросы если он ещё не достиг цели.
  Если пользователь задаст вопрос не относящийся к сфере твоей компании, не отвечай на вопрос и намекни что это не в твоих компетенциях
  Не говори что ты читаешь какие-то файлы, и не рассказывай о том что ты имеешь к каим то файлам доступ, просто предоставляй информацию оттуда и всё
  Не говори что ты записываешь какие-либо данные о пользователе
  Так же, типичных вопросов-ответов в твоей должности: \n ${faq}`;
};

export const getAssistantProps = (common: AssistantSettings) => {
  return {
    model: "gpt-4-turbo-preview",
    instructions: getInstruction(common),
  };
};
