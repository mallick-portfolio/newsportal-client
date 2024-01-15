import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const newsApi = createApi({
  reducerPath: "newsApi",
  tagTypes: ["category"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),

  endpoints: (builder) => ({
    // user login api
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/news/category/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      invalidatesTags: ["category"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: "/news/category/",
        method: "get",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      providesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/news/category/${id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      invalidatesTags: ["category"],
    }),

    // user login api
    userLogin: builder.mutation({
      query: (logindata) => ({
        url: "/account/login/",
        method: "POST",
        body: logindata,
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = newsApi;
