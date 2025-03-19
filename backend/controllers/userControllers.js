import { User } from "../models/userModels.js";
import bcrypt from "bcrypt";
import { log } from "console";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { name, username, email, password, gender } = req.body;
    if (!name || !username || !email || !password || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // later write the code for avatar(profile photo upload)
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      gender,
    });
    res
      .status(200)
      .json({ success: true, message: "Register successfully", user });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Login successfully",
        _id: user._id,
        name: user.name,
        username: user.username,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
      })
      .json({ success: true, message: "Logout successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const getOthers = async (req, res) => {
  try {
    const loggedId = req.id;
    const user = await User.find({ _id: { $ne: loggedId } }).select(
      "-password"
    );
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
  }
};
