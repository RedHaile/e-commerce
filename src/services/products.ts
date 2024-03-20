import Product, { ProductDocument } from "../model/Product";

const getAllProducts = async (): Promise<ProductDocument[]> => {
  return await Product.find();
};

const createProduct = async (Product: ProductDocument): Promise<ProductDocument> => {
  return await Product.save();
};

const getProductById = async (id: string): Promise<ProductDocument | undefined> => {
  const foundProduct = await Product.findById(id);
  if (foundProduct) {
    return foundProduct;
  }
};

const deleteProductById = async (id: string) => {
  const foundProduct = await Product.findByIdAndDelete(id);
  if (foundProduct) {
    return foundProduct;
  }
};

const updateProduct = async (id: string, newInformation: Partial<ProductDocument>) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, newInformation, {
    new: true,
  });
  return updatedProduct;
};

export default {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProductById,
  updateProduct,
};