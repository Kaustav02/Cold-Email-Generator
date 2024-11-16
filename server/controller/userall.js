import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";

import { setcookie } from "../utils/feature.js";
import errorhandler from "../middleware/error.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users_exist = await User.findOne({ email });

    if (!users_exist) {
      const hash = await bcrypt.hash(password, 8);
      const newuser = await User.create({ email, password: hash });
      setcookie(newuser, res, "registered successfully");
      console.log("New user created successfully");
    } else {
      return next(new errorhandler("user already exist", 404));
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
