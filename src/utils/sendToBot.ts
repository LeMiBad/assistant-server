import axios from "axios";

const NOTIFICATIONS_BOT_TOKEN =
  "6972977244:AAGeOHMEoEKq3May9MyeJcgis5Ej9ZIZBvI";

const sendToBotByChatIdText = async (chat_id: string, text: string) => {
  const sendMessageUrl = `https://api.telegram.org/bot${NOTIFICATIONS_BOT_TOKEN}/sendMessage`;

  await axios.post(sendMessageUrl, {
    chat_id,
    text,
  });
};

export const sendToBot = async (text: string) => {
  try {
    for (const chatId of ["6807066042"]) {
      await sendToBotByChatIdText(chatId, text);
    }
  } catch {
    try {
      for (const chatId of ["6807066042"]) {
        await sendToBotByChatIdText(
          chatId,
          "Произошла ошибка, но с отправкой ее в бота произошли ошибки",
        );
      }
    } catch (e: any) {
      console.log(`Global Error: ${e.message}`);
    }
  }
};
