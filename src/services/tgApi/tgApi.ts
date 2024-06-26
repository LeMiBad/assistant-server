import axios from "axios";

const host = "http://213.171.10.159/api/";
// const host = "http://localhost:8000/api/";

export interface SendTgMessageProps {
  bot_id: string;
  chat_id: string;
  content: string;
}

export const TgApi = {
  init: async ({
    assistant_id,
    tg_token,
  }: {
    assistant_id: string;
    tg_token: string;
  }) => {
    return await (
      await axios.post(`${host}init`, { assistant_id, tg_token })
    ).data;
  },
  stop: async (tg_token: string) => {
    return await (
      await axios.post(`${host}stop`, { tg_token })
    ).data;
  },
  send: async ({ bot_id, chat_id, content }: SendTgMessageProps) => {
    try {
      return await (
        await axios.post(`${host}send`, { bot_id, chat_id, content })
      ).data;
    } catch {}
  },
};
