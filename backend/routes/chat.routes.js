import express from "express";
import auth from "../middlewares/auth";
import { archiveChat, unarchiveChat } from "../controllers/ChatControllers";
const router = express.Router()
router.route('/archiveChat/:chatId').put(auth, archiveChat)
router.route('/unarchive/:chatId').put(auth, unarchiveChat);
export default router