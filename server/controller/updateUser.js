import { User } from "../models/userSchema.js";
import errorhandler from "../middleware/error.js";

export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user._id; // Extract `_id` from authenticated user object
    const updates = req.body; // Extract fields to update from the request body

    // Helper function to validate non-empty values in objects
    const isValidValue = (value) => {
      if (Array.isArray(value)) {
        return value.some((item) => isValidValue(item)); // Validate arrays recursively
      } else if (typeof value === "object" && value !== null) {
        return Object.values(value).some((val) => isValidValue(val)); // Validate objects recursively
      } else {
        return value !== undefined && value !== null && value !== ""; // Validate primitive values
      }
    };

    // Check if at least one field has a valid, non-empty value
    const hasValidField = Object.values(updates).some((value) =>
      isValidValue(value)
    );

    if (!hasValidField) {
      return next(
        new errorhandler("At least one field must have a valid value", 400)
      );
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates }, // Dynamically update fields
      { new: true, runValidators: true } // Return updated document and run validators
    );

    if (!updatedUser) {
      return next(new errorhandler("User not found", 404));
    }

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: updatedUser, // Optionally return the updated user
    });
  } catch (error) {
    next(error);
  }
};


// export const getUserDetails = async (req, res ,next) => {
//   try {
//     // Assuming the authenticated user's _id is available in req.user._id
//     const userId = req.user._id;

//     // Find the user by ID and exclude the password field
//     const user = await User.findById(userId).select("-_id -email -password");

//     if (!user) {
//       return next(new errorhandler("No user found" , 401));
//     }

//     // Return user details
//     res.status(200).json({
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     next(error)
//   }
// };

export const getUserDetailsById = async (req, res, next) => {
  try {
    const { userId } = req.params; // Extract userId from the request parameters
    const user = await User.findById(userId); // Find user by ID
    if (!user) {
      return next(new errorhandler("User not found", 404));
    }
    res.status(200).json({
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};
