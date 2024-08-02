/* eslint-disable @typescript-eslint/no-explicit-any */
import { IFilter, IProduct, ProductState } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ProductState = {
  products: [],
  open: false,
  loading: false,
  error: null,
  searchQuery: "",
  sortTerm: "createdAt",
  sortOrder: "asc",
  currentPage: 1,
  totalPages: 1,
  filters: {
    minPrice: 0,
    maxPrice: 1000,
    categories: [],
    minRating: 0,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.open = !state.open;
    },
    setAllProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = [...action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortTerm: (state, action: PayloadAction<string>) => {
      state.sortTerm = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setFilters: (state, action: PayloadAction<IFilter>) => {
      state.filters = action.payload;
    },
    applyFilters: (state: ProductState) => {
      state.products = state.products.filter((product) => {
        if (state.filters.minPrice && product.price < state.filters.minPrice)
          return false;
        if (state.filters.maxPrice && product.price > state.filters.maxPrice)
          return false;
        if (
          state.filters.categories &&
          !state.filters.categories.includes(product.category)
        )
          return false;
        if (state.filters.minRating && product.rating < state.filters.minRating)
          return false;
        // Add other filter conditions as needed
        return true;
      });
    },
    sortProducts: (state) => {
      state.products = state.products.sort((a, b) => {
        if (state.sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
    },
  },
});

export const {
  toggleModal,
  setAllProducts,
  setLoading,
  setError,
  setSearchQuery,
  setSortTerm,
  setSortOrder,
  setCurrentPage,
  setTotalPages,
  setFilters,
  applyFilters,
  sortProducts,
} = productSlice.actions;

export default productSlice.reducer;
