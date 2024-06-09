import { ToolResult } from "cohere-ai/api";
import { makeCohereRequest } from "./cohere";
import { setUserInfo } from "./callFunctions/setUserInfo";
import { Chats } from "@prisma/client";
import { setTarget } from "./callFunctions/setTarget";

export const functionsAdapter = async (
  chat: Chats,
  cohereAnswer: any,
  cohereBody: any,
) => {
  const userInfoParametrs = cohereAnswer.tool_calls
    .filter((call: any) => call.name === "setUserInfo")
    .map((call: any) => call.parameters);

  const userTargetParametrs = cohereAnswer.tool_calls
    .filter((call: any) => call.name === "setTarget")
    .map((call: any) => call.parameters);


  if(userTargetParametrs.length) {
    await setTarget(chat, userTargetParametrs as any);

  } else if (userInfoParametrs.length) {
    await setUserInfo(chat, userInfoParametrs as any);
  }
    
  const toolResults: ToolResult[] = cohereAnswer.tool_calls.map(
    (call: any) => ({
      call,
      outputs: [{ status: "ok" }],
    }),
  );

  const finishAnswer = await makeCohereRequest({
    ...cohereBody,
    tool_results: toolResults,
  });

  console.log(finishAnswer, finishAnswer.tool_calls);

  return finishAnswer;
};
