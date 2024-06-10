import express from "express";
import logger from "morgan";
import cors from "cors";
import routes from "./src/routes/routes";

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

app.listen(80, () => console.log("Сервер запущен на порту 80"));

export default app;
