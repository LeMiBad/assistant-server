"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const sendToBot_1 = require("../utils/sendToBot");
const errorHandlerMiddleware = (err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    const errorInfo = {
        message: err?.message,
        method: req?.method,
        url: req?.originalUrl,
        headers: req?.headers,
        ip: req?.ip,
        user: req?.user,
    };
    const errorInfoLines = Object.entries(errorInfo).map(([key, value]) => `${key}: ${JSON.stringify(value, null, 2)}`);
    const formattedMessage = `*Error Occurred:*\n\n${errorInfoLines.join("\n\n")}`;
    (0, sendToBot_1.sendToBot)(formattedMessage);
    res.status(err.status || 500).json({ error: err.message });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
