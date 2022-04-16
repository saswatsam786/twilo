const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
      maxlength: 25,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide valid email"],
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
    },
    avatar: {
      type: String,
      default:
        "https://www.gettyimages.ca/gi-resources/images/500px/983794168.jpg",
    },
    gender: {
      type: String,
      default: "male",
    },
    phonenumber: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    story: {
      type: String,
      maxlength: 220,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
