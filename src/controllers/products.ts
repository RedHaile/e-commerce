// controller
// async function
// request and response
// endpoint, method + data
// data: request.params (id), request.body, request. query
// response: status code + data

import express, { Request, Response } from "express";

import { Product } from "../misc/type";

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

// TO DO: async function + try catch
// query
// ?offset=0&limit=10
// search
// filter

// http://localhost:8080/api/v1/products?title=""
// query then pagination

export function getAllProducts(request: Request, response: Response) {
  // query
  const titleQuery = request.query.title as string;
  console.log(request.query, "query");
  const priceQuery = request.query.price as string;

  products = products.filter((product) =>
    product.title.toLowerCase().includes(titleQuery.toLowerCase())
  );
  // get product with less than priceQuery
  response.status(200).json(products);
}

export function createProduct(request: Request, response: Response) {
  const newProduct = request.body;
  products.push(newProduct);
  response.status(201).json(products);
}

export function deleteProduct(request: Request, response: Response) {
  const productId = request.params.productId;
  products = products.filter((item) => item.id !== productId);
  response.sendStatus(204);
}
