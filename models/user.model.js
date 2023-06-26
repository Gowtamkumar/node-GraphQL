import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// import "dotenv/config";
import dotenvConfig from "../config/config.js";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter your  name"],
  },
  username: {
    type: String,
    unique: true,
    required: [true, "please Enter Your username"],
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "please Enter Your password"],
  },
  role: {
    type: String,
    required: [true, "please Add a role"],
    enum: ["Admin", "Employee"],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

// encript is LockManager, passorid bcrypt
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt by token
userSchema.methods.getSignJwtToken = function () {
  return jwt.sign({ _id: this._id }, dotenvConfig.JWT_SECRET, {
    expiresIn: dotenvConfig.JWT_EXPIRE,
  });
};

// hash password by conpare
userSchema.methods.mathchPassword = async function (enterPassword) {
  return bcrypt.compare(enterPassword, this.password);
};

const UserModel = model("users", userSchema);
export default UserModel;
