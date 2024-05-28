import express from "express";
import { sendToBot } from "../utils/sendToBot";
import createError from "http-errors";

const handlerFor404 = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  next(createError(404));
};

export const errorHandlerMiddleware = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const errorInfo = {
    message: err?.message,
    stack: err?.stack,
    method: req?.method,
    url: req?.originalUrl,
    headers: req?.headers,
    ip: req?.ip,
    user: (req as any)?.user,
  };

  const errorInfoLines = Object.entries(errorInfo).map(
    ([key, value]) => `${key}: ${JSON.stringify(value, null, 2)}`,
  );

  const formattedMessage = `*Error Occurred:*\n\n${errorInfoLines.join(
    "\n\n",
  )}`;

  sendToBot(formattedMessage);
  res.status(err.status || 500);
  res.json({ error: err.message });
};
