import express from "express";
// import userController from '../controllers/user.controller.js'
// import { register } from "../controllers/user.controller.js";
import {
  getOthers,
  login,
  logout,
  register,
} from "../controllers/userControllers.js";
import auth from "../middlewares/auth.js";
const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(auth, getOthers);
export default router;
