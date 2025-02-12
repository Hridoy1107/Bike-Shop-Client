import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bike-store-server-kappa.vercel.app/api/v1",
    credentials: "include",
  }),
  tagTypes: ["Bikes"],
  endpoints: () => ({}),
});
