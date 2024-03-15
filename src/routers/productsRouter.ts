import express, { Request, Response } from "express";
import { Product } from "../misc/type";

// fake database
let products: Product[] = [
  {
    id: "1",
    title: "product1",
    price: 1,
    description: "Description for product 1",
    size: 10,
    images: "product1.jpg",
    categoryId: "category1"
  },
  {
    id: "2",
    title: "product2",
    price: 2,
    description: "Description for product 2",
    size: 20,
    images: "product2.jpg",
    categoryId: "category2"
  },
  {
    id: "3",
    title: "product3",
    price: 3,
    description: "Description for product 3",
    size: 30,
    images: "product3.jpg",
    categoryId: "category3"
  }
];

const router = express.Router();

// Query
router.get("/", (request: Request, response: Response) => {
  const titleQuery = request.query.title as string;
  const priceQuery = request.query.price as string;

  let filteredProducts = products;

  // Filtering by title
  if (titleQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(titleQuery.toLowerCase())
    );
  }

  // Filtering by price (less than or equal)
  if (priceQuery) {
    const price = parseFloat(priceQuery);
    filteredProducts = filteredProducts.filter((product) => product.price <= price);
  }

  response.status(200).json(filteredProducts);
});

// Create a new product
router.post("/", (request: Request, response: Response) => {
  const newProduct = request.body as Product;
  products.push(newProduct);
  response.status(201).json(products);
});

// Delete a product by ID
router.delete("/:productId", (request: Request, response: Response) => {
  const productId = request.params.productId;
  products = products.filter((product) => product.id !== productId);
  response.sendStatus(204);
});

export default router;
