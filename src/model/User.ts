import mongoose, { Document, Model } from "mongoose";
import { User } from "../misc/type";

const Schema = mongoose.Schema;

export type UserDocument = Document & User;

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["customer", "admin"]
  },
  avatar: {
    type: String,
    default: "https://picsum.photos/seed/picsum/600/400"
  },
});

export default mongoose.model<UserDocument>("Users", UserSchema);