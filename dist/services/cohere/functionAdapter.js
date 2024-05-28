"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionsAdapter = void 0;
const cohere_1 = require("./cohere");
const setUserInfo_1 = require("./callFunctions/setUserInfo");
const setTarget_1 = require("./callFunctions/setTarget");
const functionsAdapter = async (chat, cohereAnswer, cohereBody) => {
    const toolResults = [];
    if (cohereAnswer.tool_calls) {
        for (let call of cohereAnswer.tool_calls) {
            if (call.name === "setUserInfo") {
                await (0, setUserInfo_1.setUserInfo)(chat, call.parameters);
            }
            else if (call.name === "setTarget") {
                await (0, setTarget_1.setTarget)(chat, call.parameters);
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
    const finishAnswer = await (0, cohere_1.makeCohereRequest)({
        ...cohereBody,
        tool_results: toolResults,
    });
    console.log(finishAnswer, finishAnswer.tool_calls);
    return finishAnswer;
};
exports.functionsAdapter = functionsAdapter;
