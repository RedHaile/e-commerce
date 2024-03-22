import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import ProductsService from "../services/products";
import Product, { ProductDocument } from "../model/Product";
import { InternalServerError, NotFoundError } from "../errors/ApiError";


// GET PRODUCTS
export async function getAllProducts(request: Request, response: Response) {
  const { limit = 2e64, offset = 0, searchQuery = "", minPrice = 0, maxPrice = 2e64 } = request.query;

  const Products = await ProductsService.getAllProducts(
    Number(limit),
    Number(offset),
    searchQuery as string,
    Number(minPrice),
    Number(maxPrice)
  );
  const count = Products.length;
  response.status(200).json({ totalCount: count, products: Products });
}

// GET PRODUCTS BASED ON CATEGORY
export async function getCategoryProducts(request: Request, response: Response) {
  const { limit = 2e64, offset = 0, searchQuery = "", minPrice = 0, maxPrice = 2e64 } = request.query;

  const Products = await ProductsService.getCategoryProducts(
    request.params.categoryId as string,
    Number(limit),
    Number(offset),
    searchQuery as string,
    Number(minPrice),
    Number(maxPrice)
  );
  const count = Products.length;
  response.status(200).json({ totalCount: count, products: Products });
}

// CREATE A PRODUCT
export async function createProduct(request: Request, response: Response) {
  const newData = new Product(request.body);
  const newProduct = await ProductsService.createProduct(newData);
  response.status(201).json(newProduct);
}

// GET A PRODUCT
export async function getProduct(request: Request, response: Response, next: NextFunction) {
  try {
    const foundProduct = await ProductsService.getProductById(
      request.params.productId
    );
    response.status(200).json(foundProduct);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Cannot find product with id ${request.params.productId}`,
      });
      return;
    }
    
    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: `wrong id format`,
      });
      return;
    }

    next(new InternalServerError());
  }

}

// UPDATE A PRODUCT
export async function updateProduct(request: Request, response: Response, next: NextFunction) {
  try {
    const newData = request.body as Partial<ProductDocument>;
    const foundProduct = await ProductsService.updateProduct(
      request.params.productId, newData
    );
    response.status(200).json(foundProduct);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Cannot find product with id ${request.params.productId}`,
      });
      return;
    }
    
    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: `wrong id format`,
      });
      return;
    }

    next(new InternalServerError());
  }

}

// DELETE A PRODUCT
export async function deleteProduct(request: Request, response: Response, next: NextFunction) {
  try {
    const foundProduct = await ProductsService.deleteProductById(
      request.params.productId
    );
    response.sendStatus(204);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Cannot find product with id ${request.params.productId}`,
      });
      return;
    }
    
    if (error instanceof mongoose.Error.CastError) {
      response.status(404).json({
        message: `wrong id format`,
      });
      return;
    }

    next(new InternalServerError());
  }
}