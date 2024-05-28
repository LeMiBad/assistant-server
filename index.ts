import { errorHandlerMiddleware } from "./src/middlewares/errorHandlerMiddleware";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import routes from "./src/routes/routes";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Подключаем маршруты
app.use("/api", routes);

// Обработчик ошибок 404 должен быть после маршрутов
// app.use(errorHandlerMiddleware);

app.listen(3000, () => console.log("Server is running on port 3000"));

export default app;
