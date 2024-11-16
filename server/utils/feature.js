import jwt from "jsonwebtoken";
import {config } from "dotenv"

config()

export const setcookie = (newuser, res, message) => {
  const token = jwt.sign({ _id: newuser._id }, process.env.JWT_SECRET);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message,
    });
};
