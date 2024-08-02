import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/api";
import cartReducer from "./feature/cartSlice";
import categoryReducer from "./feature/categorySlice";
import productReducer from "./feature/productSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
