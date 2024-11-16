import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  description: { type: String },
});

// Schema for user education
const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year_of_passing: { type: Number, required: true },
});

// Schema for user achievements
const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
});

// Main user schema

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Use hashed passwords
    name: { type: String }, // Optional initially
    skills: { type: [String], default: [] },
    experience: { type: [experienceSchema], default: [] },
    education: { type: [educationSchema], default: [] },
    extra_achievement: { type: [achievementSchema], default: [] },
    isProfileComplete: { type: Boolean, default: false }, // Indicates if profile is completed
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the User model
export const User = mongoose.model("User", userSchema);

