import express, { NextFunction, Request, Response } from "express";

import categoriesService from "../services/categories";
import Category, { CategoryDocument } from "../model/Category";
import { InternalServerError, NotFoundError } from "../errors/ApiError";
import mongoose from "mongoose";

export async function getAllCategories(
  _: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const categories = await categoriesService.getAllCategories();
    response.status(200).json(categories);
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}

export async function createCategory(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const newData = new Category(request.body);
    const newCategory = await categoriesService.createCategory(newData);
    response.status(201).json(newCategory);
  } catch (error) {
    next(new InternalServerError("Internal error"));
  }
}

export async function getCategoryById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const foundCategory = await categoriesService.getCategoryById(
      request.params.categoryId
    );
    console.log(foundCategory, "found");
    response.status(201).json(foundCategory);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Cant find category with id ${request.params.categoryId}`,
      });
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

export async function updateCategory(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const categoryId = request.params.categoryId;
    const newInformation = request.body as Partial<CategoryDocument>;
    const updatedCategory = await categoriesService.updateCategory(
      categoryId,
      newInformation
    );
    response.status(200).json(updatedCategory);
  } catch (error) {
    if (error instanceof NotFoundError) {
      response.status(404).json({
        message: `Category with id ${request.params.categoryId} not found`,
      });
    }
    if (error instanceof mongoose.Error.CastError) {
      response.status(400).json({
        message: `Invalid category id format`,
      });
      return;
    }

    next(new InternalServerError());
  }
}

export async function deleteCategoryById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const deletedCategory = categoriesService.deleteCategoryById(
      request.params.id
    );
    response.status(200).json(deletedCategory);
  } catch (error) {
    // handle error
    if (error instanceof NotFoundError) {
      response
        .status(404)
        .json({ message: `Cant find category with id ${request.params.id}` });
      return;
    }
    next(new InternalServerError());
  }
}
