import { NotFoundError } from "../errors/ApiError";
import Product, { ProductDocument } from "../model/Product";

const getAllProducts = async (
  limit: number,
  offset: number,
  searchQuery: string,
  minPrice: number,
  maxPrice: number
): Promise<ProductDocument[]> => {
  try { 
    const totalCount = await Product.countDocuments();
    return await Product.find({
      title: { $regex: searchQuery },
      price: { $gte: minPrice, $lte: maxPrice },
    })
      // .sort({ title: 1 })
      .populate({
        path: "categoryId",
        select: { name: 1 },
      })
      .limit(limit)
      .skip(offset)
      .exec();
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

const getCategoryProducts = async (
  categoryId: string,
  limit: number,
  offset: number,
  searchQuery: string,
  minPrice: number,
  maxPrice: number
): Promise<ProductDocument[]> => {
  try { 
    const totalCount = await Product.countDocuments({ categoryId });
    return await Product.find({
      categoryId,
      title: { $regex: searchQuery },
      price: { $gte: minPrice, $lte: maxPrice },
    })
      .populate({
        path: "categoryId",
        select: { name: 1 },
      })
      .limit(limit)
      .skip(offset)
      .exec();

    // fetch category by id
    //return Product.find({ categoryId: "65f95cbfd2728827cf3a49f3" });

  // sort: default by id
  // sort({ title: -1 })

  // return {}
  // 2 queries: find()
  // fetch category by id
  // return Product.find({ categoryId: "65f95cbfd2728827cf3a49f3" });
  // return Order.find({userId: "65f95cbfd2728827cf3a49f3"})

  // get all product by categoryId
  // categoryId from endpoint
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
};

const createProduct = async (Product: ProductDocument): Promise<ProductDocument> => {
  try {
    return await Product.save();
  } catch (error) {
    throw new Error("Failed to create product");
  }
};

const getProductById = async (id: string): Promise<ProductDocument | undefined> => {
  const foundProduct = await Product.findById(id);
  if (foundProduct) {
    return foundProduct;
  }
  throw new NotFoundError();
};

const deleteProductById = async (id: string) => {
  const foundProduct = await Product.findByIdAndDelete(id);
  if (foundProduct) {
    return foundProduct;
  }
  throw new NotFoundError();
};

const updateProduct = async (id: string, newInformation: Partial<ProductDocument>) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, newInformation, {
    new: true,
  });
  if (updatedProduct) {
    return updatedProduct;
  }
  throw new NotFoundError();
};

export default {
  getAllProducts,
  getCategoryProducts,
  createProduct,
  getProductById,
  deleteProductById,
  updateProduct,
};