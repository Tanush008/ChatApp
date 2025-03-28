import { User } from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getDatauri from "../utils/datauri.js";
import { log } from "node:console";

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
    let user = await User.findOne({ username });
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
        avatar: user.avatar,
        Bio: user.Bio,
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

export const setProfile = async (req, res) => {
  try {
    const avatar = req.file;
    const { Bio } = req.body
    // console.log(Bio);
    const avatarUri = getDatauri(avatar)
    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: "Please provide a profile picture"
      });
    }

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }
    // Upload to cloudinary
    const cloudResponse = await cloudinary.uploader.upload(avatarUri.content)
    // Update user avatar
    user.avatar = cloudResponse.secure_url;
    user.Bio = Bio;
    await user.save();
    console.log(user);
    return res.status(200).json({
      success: true,
      user: {
        avatar: user.avatar,
        Bio: user.Bio
      },
      user,
      message: "Profile updated successfully"
    });

  } catch (error) {
    console.error("Profile update error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;
    const avatar = req.file;
    const userId = req.id; // Assuming this comes from auth middleware

    // Find user first
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
   

    // Add fields if they exist
    if (name) user.name = name;
    if (email) user.email = email;
    if (bio) user.Bio = bio;

    // Handle password update
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Handle avatar upload
    if (avatar) {
      try {
        // Convert buffer to base64
        const b64 = Buffer.from(avatar.buffer).toString('base64');
        const dataURI = "data:" + avatar.mimetype + ";base64," + b64;

        // Upload to cloudinary
        const cloudResponse = await cloudinary.uploader.upload(dataURI, {
          folder: 'avatars',
          resource_type: 'auto'
        });

        user.avatar = cloudResponse.secure_url;
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        return res.status(500).json({
          success: false,
          message: "Error uploading profile picture"
        });
      }
    }

    // If email is being updated, check if it's already in use
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already in use"
        });
      }
    }
    await user.save();
    // Update user
    user = {
      id: user._id,
      name: user.name,
      email: user.email,
      Bio: user.Bio,
      avatar: user.avatar,
      password: user.password
    }

    // Send response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user
    });

  } catch (error) {
    console.error("Profile update error:", error);

    // Handle specific errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map(err => err.message).join(', ')
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
