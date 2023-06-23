import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter your  name"],
  },
  userName: {
    type: String,
    unique: true,
    required: [true, "please Enter Your user Name"],
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
});

const UserModel = model("users", userSchema);
export default UserModel;
