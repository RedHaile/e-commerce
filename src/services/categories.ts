import { NotFoundError } from "../errors/ApiError";
import Category, { CategoryDocument } from "../model/Category";

const getAllCategories = async (): Promise<CategoryDocument[]> => {
  try {
    return await Category.find();
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};

const createCategory = async (
  category: CategoryDocument
): Promise<CategoryDocument> => {
  try {
    return await category.save();
  } catch (error) {
    throw new Error("Failed to create category");
  }
};

// To do: handle error
const getCategoryById = async (
  id: string
): Promise<CategoryDocument> => {
  try {
    const foundCategory = await Category.findById(id);
    if (foundCategory) {
      return foundCategory;
    }
    throw new NotFoundError();
  } catch (error) {
    throw new Error("Failed to get category by ID");
  }
};

const deleteCategoryById = async (id: string) => {
  try {
    const foundCategory = await Category.findByIdAndDelete(id);
    if (foundCategory) {
      return foundCategory;
    }
    throw new NotFoundError();
  } catch (error) {
    throw new Error("Failed to delete category by ID");
  }
};
  
const updateCategory = async (
  id: string,
  newInformation: Partial<CategoryDocument>
) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, newInformation, {
      new: true,
    });
    if (updatedCategory) {
      return updatedCategory;
    }
    throw new NotFoundError();
  } catch (error) {
    throw new Error("Failed to update category");
  }
};
export default {
  getAllCategories,
  createCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategory,
};
