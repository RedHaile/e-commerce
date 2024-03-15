import express, { Request, Response } from "express";

type Product = {
  id: string;
  name: string;
  price: number;
};

// fake database
let products: Product[] = [
  { id: "1", name: "product1", price: 1 },
  { id: "2", name: "product2", price: 2 },
  { id: "3", name: "product3", price: 3 },
];

const router = express.Router();

// Query
router.get("/", (request: Request, response: Response) => {
  const nameQuery = request.query.name as string;
  const priceQuery = request.query.price as string;

  let filteredProducts = products;

  // Filtering by name
  if (nameQuery) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(nameQuery.toLowerCase())
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
