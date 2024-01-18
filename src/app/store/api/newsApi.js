import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const newsApi = createApi({
  reducerPath: "newsApi",
  tagTypes: ["category", "post"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),

  endpoints: (builder) => ({
    // user login api
    getPosts: builder.query({
      query: () => ({
        url: "/news/",
        method: "get",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      providesTags: ["post"],
    }),
    getPostById: builder.query({
      query: (id) => ({
        url: `/news/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      // providesTags: [""],
    }),
    addPost: builder.mutation({
      query: (data) => {
        const { title, description, author, category, image } = data;
        let formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("author", author);
        formData.append("category", category);
        formData.append("image", image);
        return {
          url: "/news/",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
            // "Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: ["post"],
    }),
    updatePostById: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/news/${id}/`,
          method: "PUT",
          body: data,
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
            // "Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: ["post"],
    }),
    deletePostById: builder.mutation({
      query: (id) => {
        return {
          url: `/news/${id}/`,
          method: "DELETE",
          body: {},
          headers: {
            Authorization: `Bearer ${Cookies.get("auth_token")}`,
            // "Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: ["post"],
    }),
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
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useAddPostMutation,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useDeletePostByIdMutation,
  useUpdatePostByIdMutation,
} = newsApi;
