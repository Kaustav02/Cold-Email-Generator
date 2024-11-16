import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import {config } from "dotenv"

config()

export const isauthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: " login first",
    });
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decode._id);
  req.user = { _id: user._id };
  console.log(user._id)

  next();
};