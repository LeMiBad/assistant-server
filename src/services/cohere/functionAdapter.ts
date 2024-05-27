import { ToolResult } from "cohere-ai/api";
import { makeCohereRequest } from "./cohere";
import { setUserInfo } from "./callFunctions/setUserInfo";
import { Chats } from "@prisma/client";
import { setTarget } from "./callFunctions/setTarget";

export const functionsAdapter = async (
  chat: Chats,
  cohereAnswer: any,
  cohereBody: any
) => {
  const toolResults: ToolResult[] = [];

  if (cohereAnswer.tool_calls) {
    for (let call of cohereAnswer.tool_calls) {
      if (call.name === "setUserInfo") {
        await setUserInfo(chat, call.parameters as any);
      } else if (call.name === "setTarget") {
        await setTarget(chat, call.parameters as any);
      }

      toolResults.push({
        call,
        outputs: [
          {
            status: "ok",
          },
        ],
      });
    }
  }

  const finishAnswer = await makeCohereRequest({
    ...cohereBody,
    tool_results: toolResults,
  });

  console.log(finishAnswer, finishAnswer.tool_calls);

  return finishAnswer;
};
