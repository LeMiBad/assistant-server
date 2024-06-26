import express from "express";
import logger from "morgan";
import cors from "cors";
import routes from "./routes/routes";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Подключаем маршруты
app.use("/api", routes);

// Обработчик ошибок 404 должен быть после маршрутов
// app.use(errorHandlerMiddleware);

// const PORT = 3000
const PORT = 80

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
