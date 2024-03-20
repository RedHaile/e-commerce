import express, { Request, Response } from "express";

import ProductsService from "../services/products";
import Product, { ProductDocument } from "../model/Product";

// GET PRODUCTS
export async function getAllProducts(_: Request, response: Response) {
  const Products = await ProductsService.getAllProducts();
  response.status(200).json(Products);
}

// CREATE A PRODUCT
export async function createProduct(request: Request, response: Response) {
  const newData = new Product(request.body);
  const newProduct = await ProductsService.createProduct(newData);
  response.status(201).json(newProduct);
}

// GET A PRODUCT
export async function getProduct(request: Request, response: Response) {
  const foundProduct = await ProductsService.getProductById(
    request.params.productId
  );
  response.status(200).json(foundProduct);
}

// UPDATE A PRODUCT
export async function updateProduct(request: Request, response: Response) {
  const newData = request.body as Partial<ProductDocument>;
  const foundProduct = await ProductsService.updateProduct(
    request.params.productId, newData
  );
  response.status(200).json(foundProduct);
}

// DELETE A PRODUCT
export async function deleteProduct(request: Request, response: Response) {
  const foundProduct = await ProductsService.deleteProductById(
    request.params.productId
  );
  response.sendStatus(204);
}