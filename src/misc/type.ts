type ProductOrder = {
  id: string;
  title: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  size: number;
  images: string;
  categoryId: string;
};

export type User = {
  id: string;
  password: string;
  email: string;
  fullname: string;
  role: string;
  avatar: string;
};

export type Order = {
  orderId: string;
  userId: string;
  products: ProductOrder[];
  totalPrice: number;
  createAt: string;
};

export type Category = {
  id: string;
  name: string;
  image: string;
};
