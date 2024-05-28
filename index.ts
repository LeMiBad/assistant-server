import { errorHandlerMiddleware } from "./src/middlewares/errorHandlerMiddleware";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import createError from "http-errors";
import routes from "./src/routes/routes";
import { sendToBot } from "./src/utils/sendToBot";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Подключаем маршруты
app.use("/api", routes);

// Обработчик ошибок 404 должен быть после маршрутов
app.use((req, res, next) => {
  next(createError(404));
});

// Обработчик ошибок 404 должен быть после маршрутов
app.use(errorHandlerMiddleware);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
