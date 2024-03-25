export type Product = {
  title: string;
  price: number;
  description: string;
  size: number;
  images: string;
  categoryId: string;
};

export type CategoryProductsQuery = {
  limit?: number;
  offset?: number;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
}

export type User = {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  role: string;
  avatar: string;
  orders?: Order[]
};

export type Order = {
  products: Product[];
  totalPrice: number;
  createAt: string;
};

export type Category = {
  name: string;
  image: string;
};

export type OrderProduct = {
  productId: string;
  quantity: number;
};
