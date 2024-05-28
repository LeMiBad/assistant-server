"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationsController = void 0;
const prisma_1 = __importDefault(require("../../config/prisma"));
const dayjs_1 = __importDefault(require("dayjs"));
const getNotificationsController = async (req, res) => {
    try {
        const { id } = req.user;
        const notifications = await prisma_1.default.notification.findMany({
            where: { user_id: id },
        });
        const oldNotifications = notifications
            .filter(notification => {
            if (notification.status === "YELLOW") {
                const notificationDate = (0, dayjs_1.default)(notification.created_at);
                const curDate = (0, dayjs_1.default)(new Date());
                const diffInHours = curDate.diff(notificationDate, "hour");
                return diffInHours > 24;
            }
            return false;
        })
            .map(notification => notification.id);
        for (let notificationId of oldNotifications) {
            await prisma_1.default.notification.delete({
                where: {
                    id: notificationId,
                },
            });
        }
        const result = notifications.filter(notification => !oldNotifications.includes(notification.id));
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Не удалось получить ассистентов" });
    }
};
exports.getNotificationsController = getNotificationsController;
