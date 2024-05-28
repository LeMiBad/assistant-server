"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "secret";
function verifyToken(token, res) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    res.status(401).json({ message: "Токен истек" });
                    reject(new Error("Токен истек"));
                }
                else {
                    res.status(401).json({ message: "Неверный токен" });
                    reject(new Error("Неверный токен"));
                }
            }
            else {
                if (typeof decoded === "object" && decoded !== null) {
                    resolve(decoded);
                }
                else {
                    reject(new Error("Декодированные данные не являются объектом"));
                }
            }
        });
    });
}
exports.verifyToken = verifyToken;
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Токен не предоставлен" });
    }
    try {
        const decoded = await verifyToken(token, res);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error(error);
    }
};
exports.authMiddleware = authMiddleware;
