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

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const users_exist = await User.findOne({ email }).select("+password");
    if (!users_exist) {
      return next(new errorhandler("Invalid credentials", 404));
    } else {
      const is_matched = await bcrypt.compare(password, users_exist.password);

      if (is_matched) {
        setcookie(users_exist, res, `welcome back ${users_exist.email}`);
        console.log(`login successful ${users_exist.email}`)
        console.log(users_exist._id)
        return users_exist._id
      } else {
        return next(new errorhandler("Invalid credentials", 404));
      }
    }
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
    try {
      
      res
        .status(200)
        .clearCookie("token", {
          httpOnly: true, 
        })
        .json({
          success: true,
          message: "Logged out successfully",
        });
        console.log(`logout successful`)
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };

