import express, { Request, Response } from 'express';
import { Category } from '../misc/type';

let categories: Category[] = [
  {
    id: '1',
    name: 'category 1',
    image: 'https://api.lorem.space/image/fashion?w=640&h=480&r=4278',
  },
  {
    id: '2',
    name: 'category 2',
    image: 'https://api.lorem.space/image/furniture?w=640&h=480&r=7358',
  },
];

const router = express.Router();

router.get('/', (request: Request, response: Response) => {
  // query
  const idQuery = request.query.id as string;
  if (idQuery) {
    // Filter category based on id
    const filteredCategories = categories.filter((category) =>
      category.id.includes(idQuery)
    );
    response.status(200).json(filteredCategories);
  } else {
    response.status(200).json(categories);
  }
});

// Create a new category

router.post('/', (request: Request, response: Response) => {
  const newCategory = request.body as Category;

  // Check if the category with the provided ID already exists
  const existingCategoryById = categories.find(
    (category) => category.id === newCategory.id
  );
  if (existingCategoryById) {
    return response
      .status(400)
      .json({ message: 'Category with this ID already exists' });
  }
  // Check if the category with the provided name already exists
  const existingCategoryByName = categories.find(
    (category) => category.name === newCategory.name
  );
  if (existingCategoryByName) {
    return response
      .status(400)
      .json({ message: 'Category with this name already exists' });
  }
  categories.push(newCategory);
  response.status(201).json(newCategory);
});

// Update a category by ID
router.put('/:categoryId', (request: Request, response: Response) => {
  const categoryId: string = request.params.id;
  const category = categories.find((category) => category.id === categoryId);
  if (!category) {
    return response.status(404).json({ message: 'Category not found' });
  }

  const { name, image }: { name: string; image: string } = request.body;
  if (!name) {
    return response.status(400).json({ message: 'Name is required' });
  }

  category.name = name;
  category.image = image;
  response.json(category);
});
// delete category

router.delete('/:categoryId', (request: Request, response: Response) => {
  const categoryId: string = request.params.id;
  const categoryIndex = categories.findIndex(
    (category) => category.id === categoryId
  );
  if (categoryIndex === -1) {
    return response.status(404).json({ message: 'Category not found' });
  }
  categories.splice(categoryIndex, 1);
  response.sendStatus(204);
});

export default router;
