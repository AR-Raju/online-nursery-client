/* eslint-disable @typescript-eslint/no-explicit-any */
export type TMovie = {
  _id: string;
  title: string;
  description: string;
  releaseDate: Date;
  genre: string;
  director: string;
  cast: string;
  slug: string;
  viewCount: number;
  totalRating: number;
  isDeleted: boolean;
  image: string;
};

export interface ICategory {
  _id: string;
  name: string;
  cover_img: string;
}

export interface CategorieState {
  categories: ICategory[];
  open: boolean;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  rating: number;
  image_url: string;
}

export interface IFilter {
  minPrice: number;
  maxPrice: number;
  categories: string[];
  minRating: number;
}

export interface ProductState {
  products: IProduct[];
  open: boolean;
  error: null | string;
  loading: boolean;
  searchQuery: string;
  sortTerm: string;
  sortOrder: string;
  currentPage: number;
  totalPages: number;
  filters: IFilter;
}

export interface ReloadWarningState {
  isModalOpen: boolean;
}

export interface CartItem extends IProduct {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export interface Order {
  id: string;
  customer: {
    name: string;
    phoneNumber: string;
    address: string;
  };
  products: {
    productId: string;
    quantity: number;
  }[];
  totalAmount: number;
  status: string;
}
