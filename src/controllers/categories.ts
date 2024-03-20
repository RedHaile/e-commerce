import express, { Request, Response } from "express";

import categoriesService from "../services/categories";
import Category, { CategoryDocument } from "../model/Category";

export async function getAllCategories(_: Request, response: Response) {
  const categories = await categoriesService.getAllCategories();
  response.status(200).json(categories);
}

export async function createCategory(request: Request, response: Response) {
  const newData = new Category(request.body);
  const newCategory = await categoriesService.createCategory(newData);
  response.status(201).json(newCategory);
}

export async function getCategoryById(request: Request, response: Response) {
  const foundCategory = await categoriesService.getCategoryById(
    request.params.categoryId
  );
  response.status(201).json(foundCategory);
}

export async function updateCategory(request: Request, response: Response) {
  const categoryId = request.params.categoryId;
  const newInformation = request.body as Partial<CategoryDocument>;
  const updatedCategory = await categoriesService.updateCategory(
    categoryId,
    newInformation
  );
  response.status(200).json(updatedCategory);
}

export async function deleteCategoryById(request: Request, response: Response) {
  const foundCategory = await categoriesService.deleteCategoryById(
    request.params.categoryId
  );
  response.status(204).json();
}
