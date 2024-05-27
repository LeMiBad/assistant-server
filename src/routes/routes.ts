import { Router } from "express";
import { loginController } from "../controllers/users/loginController";
import { signupController } from "../controllers/users/signupController";
import { unsetTgTokenController } from "../controllers/users/unsetTgTokenController";
import { setTgTokenController } from "../controllers/users/setTgTokenController";
import { getAssistantSettings } from "../controllers/assistant/getAssistantSettings";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.use("/users/tg/setTgToken", setTgTokenController);
router.use("/users/tg/unsetTgToken", unsetTgTokenController);
router.post("/users/login", loginController);
router.post("/users/signup", signupController);

router.get("/assistant", authMiddleware, getAssistantSettings);

export default router;
