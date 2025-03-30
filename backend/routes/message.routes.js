import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";
import { getMessage, sendMessage } from "../controllers/messageControllers.js";
router.route("/send/:id").post(auth, sendMessage);
router.route("/get/:id").get(auth, getMessage);
export default router;
