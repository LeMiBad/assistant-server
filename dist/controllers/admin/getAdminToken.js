"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminToken = void 0;
const constants_1 = require("../../constants");
const getAdminToken = async (req, res) => {
    try {
        const { secret } = req.body;
        if (secret === constants_1.ADMIN_SECRET) {
            return res.status(200).json(constants_1.ADMIN_SERVER_SECRET);
        }
        res.status(403).json({ message: "Неверный секрет" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Не удалось получить токен для админки" });
    }
};
exports.getAdminToken = getAdminToken;
