import { AssistantSetting } from "@prisma/client";

export type AssistantType = "recruiter" | "service" | "salesman";

export type AssistantSettings = Omit<
  AssistantSetting,
  "id" | "user_id" | "created_at" | "model"
>;

export const getCohereInstructuion = ({
  name,
  role,
  org_info,
  target,
  faq,
}: AssistantSettings) => {
  return `Тебя зовут ${name} и ты работаешь в должности ${role}. Твоя цель - ${target}. Используй информацию о компании "${org_info}".
  Отвечай кратко, сдержанно и в человеческой манере
  Старайся собрать информацию о пользователе прежде чем совершать целевое действие
  Не повторяйся в вопросах и предложениях и веди пользователя к цели, задавая наводящие вопросы если он ещё не достиг цели.
  Если пользователь задаст вопрос не относящийся к сфере твоей компании, не отвечай на вопрос и намекни что это не в твоих компетенциях
  Не говори что ты читаешь какие-то файлы, и не рассказывай о том что ты имеешь к каим то файлам доступ, просто предоставляй информацию оттуда и всё
  Не говори что ты записываешь какие-либо данные о пользователе
  Так же список типичных вопросов-ответов: \n ${faq}`;
};

export const getCohereTools = () => [
  {
    name: "setUserInfo",
    description:
      "Если в сообщении пользователя будет следующая информация: имя, номер телефона, почта, сайт, ник в телеграмме, ссылка на инстаграмм, ссылка на вк. Вызывать только в случае если до этого пользователь не упоминал эти данные",
    parameter_definitions: {
      type: {
        description: "name or phone or email or website or tgNickname or instagram or vk",
        type: "str",
        required: true,
      },
      value: {
        description: "the information itself",
        type: "str",
        required: true,
      },
    },
  },
  {
    name: "setTarget",
    description:
      "Фиксирует событие в случае достижения цели общения. Цели следующие: 1) Назначение встречи с клиентом 2) Похвала от клиента сторону нашего сервиса",
    parameter_definitions: {
      type: {
        description: "Описания достигнутой цели в двух словах (Обязательно должно быть)",
        type: "str",
        required: true,
      },
      value: {
        description:
          "Сообщение от пользователя которое указывает на достижение цели (Обязательно должно быть)",
        type: "str",
        required: true,
      },
    },
  },
];
