import mongoose, { Document } from "mongoose";

import { Category } from "../misc/type";

export type CategoryDocument = Document & Category;

export const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },

  image: {
    type: String,
    require: true,
  },

  isValid: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<CategoryDocument>("Category", CategorySchema);
