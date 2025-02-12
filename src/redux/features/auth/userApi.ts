import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users",
        method: "POST",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/users/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    passwordChange: builder.mutation({
      query: ({ userId, oldPassword, newPassword }) => ({
        url: `/users/${userId}/password`,
        method: "PATCH",
        body: { oldPassword, newPassword },
      }),
    }),
    getUsers: builder.query({
      query: () => "/users",
    }),
    getUserById: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    blockUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/${userId}/block`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  usePasswordChangeMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useBlockUserMutation,
} = userApi;
