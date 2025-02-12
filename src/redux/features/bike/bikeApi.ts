import { baseApi } from "../../api/baseApi";

const bikeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBike: builder.mutation({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Bikes"],
    }),
    updateBike: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: formData,
      }),
    }),
    getAllBikes: builder.query({
      query: () => "/products",
      providesTags: ["Bikes"],
    }),
    getBikeById: builder.query({
      query: (productId) => `/products/${productId}`,
    }),
    deleteBike: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBikeMutation,
  useUpdateBikeMutation,
  useGetAllBikesQuery,
  useGetBikeByIdQuery,
  useDeleteBikeMutation,
} = bikeApi;
