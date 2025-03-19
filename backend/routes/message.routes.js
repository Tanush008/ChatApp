import express from "express";
import auth from "../middlewares/auth.js";
import { getMessage, sendMessage } from "../controllers/messageControllers.js";
const router = express.Router();
router.route("/send/:id").post(auth, sendMessage);
router.route("/get/:id").get(auth, getMessage);
export default router;
