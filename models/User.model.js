const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    languages: {
      type: [String],
      enum: ["JavaScript", "Python", "Java", "C++", "C#"],
    },
    country: { type: String },
    level: { type: [String], enum: ["Learner", "Junior", "Senior"] },
    photo: {
      type: String,
      default:
        "https://digimedia.web.ua.pt/wp-content/uploads/2017/05/default-user-image.png",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;