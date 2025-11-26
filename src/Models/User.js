const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
        message:
          "Password is not strong enough (8 chars, uppercase, lowercase, number, symbol required)",
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender must be male, female, or other");
        }
      },
    },
    skills: {
      type: [String],
      lowercase: true,
      trim: true,
    },
    photoURL: {
      type: String,
      trim: true,
      default: "https://example.com/default-photo.jpg",
      validate: {
        validator: (value) => {
          validator.isURL(value);
        },
        message: "Invalid URL format",
      },
    },
    about: {
      type: String,
      trim: true,
    },
    githubURL: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => {
          validator.isURL(value);
        },
        message: "Invalid URL format",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
