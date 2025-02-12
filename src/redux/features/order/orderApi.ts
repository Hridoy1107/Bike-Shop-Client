import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderInfo) => ({
        url: "/orders",
        method: "POST",
        body: orderInfo,
      }),
    }),
    verifyPayment: builder.query({
      query: (order_id) => ({
        url: "/orders/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
    getOrders: builder.query({
      query: () => "/orders",
    }),
    getOrdersByUserId: builder.query({
      query: (userId) => ({
        url: `/orders/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyPaymentQuery,
  useGetOrdersByUserIdQuery,
} = orderApi;
