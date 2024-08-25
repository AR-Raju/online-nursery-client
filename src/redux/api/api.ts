/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["products", "categories", "orders"],
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: ({ data }) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    getProducts: builder.query({
      query: ({ searchQuery, filters, sortTerm, sortOrder }) => {
        let query = "products";
        const params = new URLSearchParams();

        if (searchQuery) params.append("searchTerm", searchQuery);
        if (sortTerm) params.append("sortTerm", sortTerm);
        if (sortOrder) params.append("sortOrder", sortOrder);

        if (filters) {
          Object.keys(filters).forEach((key) => {
            params.append(key, filters[key]);
          });
        }

        if (params.toString()) query += `?${params.toString()}`;

        return query;
      },
      providesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
    addCategory: builder.mutation({
      query: ({ data }) => ({
        url: `/categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
    placeOrder: builder.mutation({
      query: ({ order }) => ({
        url: `/orders`,
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["products"],
    }),
    addRating: builder.mutation({
      query: ({ data }) => ({
        url: `/products/review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),

    // getMovieReviews: builder.query({
    //   query: (slug) => ({
    //     url: `/products/${slug}/reviews`,
    //     method: "GET",
    //   }),
    // }),

    // getMovieDetailsAndReviews: builder.query({
    //   queryFn: async (slug: string): Promise<any> => {
    //     try {
    //       const [movieResponse, reviewsResponse] = await Promise.all([
    //         fetch(`http://localhost:5000/api/products/${slug}`),
    //         fetch(`http://localhost:5000/api/products/${slug}/reviews`),
    //       ]);

    //       if (!movieResponse.ok || !reviewsResponse.ok) {
    //         throw new Error("Network response was not ok.");
    //       }
    //       const [movieData, reviewsData] = await Promise.all([
    //         movieResponse.json(),
    //         reviewsResponse.json(),
    //       ]);

    //       // Combine results
    //       return {
    //         data: {
    //           movie: movieData,
    //           reviews: reviewsData,
    //         },
    //       };
    //     } catch (error) {
    //       return error;
    //     }
    //   },
    // }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetSingleProductQuery,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  usePlaceOrderMutation,
  useAddRatingMutation,
  useDeleteProductMutation,
  useDeleteCategoryMutation,
  useUpdateProductMutation,
  useUpdateCategoryMutation,
} = baseApi;
