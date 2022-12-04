const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  full_name: {
    type: String,
    required: [true, "Enter first name"],
    min: [4, "first_name should be more then 3 characters"],
    max: [30, "first_name should be less then 30 characters"],
  },
  phone_number: {
    type: Number,
    required: [true, "Enter your phone number"],
  },
  email: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: [true, "Enter password"],
    min: [8, "first_name should be more then 8 characters"],
    max: [30, "first_name should be less then 30 characters"],
  },
  role: {
    type: String,
    default: "Normal",
  },
  // token: { type: String },
});

module.exports = mongoose.model("User", userSchema);
