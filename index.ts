import express from "express";
import logger from "morgan";
import cors from "cors";
import routes from "./src/routes/routes";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Подключаем маршруты
app.use("/api", routes);

// Обработчик ошибок 404 должен быть после маршрутов
// app.use(errorHandlerMiddleware);

app.listen(3000, () => console.log("Server is running on port 3000"));

export default app;
