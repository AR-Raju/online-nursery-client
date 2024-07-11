/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),

    // addRating: builder.mutation({
    //   query: ({ data, slug }) => ({
    //     url: `/products/${slug}/review`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["products"],
    // }),

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

export const { useGetProductsQuery, useGetSingleProductQuery } = baseApi;
