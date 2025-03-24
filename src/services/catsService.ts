import { BaseQueryFn, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CatModel } from "../types/cat";

const baseQuery: BaseQueryFn = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set("x-api-key", import.meta.env.VITE_API_KEY);
    return headers;
  },
});

const baseQueryWithRetry: BaseQueryFn = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    result = await baseQuery(args, api, extraOptions);
  }
  return result;
};

export const catsApi = createApi({
  reducerPath: "catsApi",
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    getBreeds: builder.query<CatModel[], void>({
      query: () => ({
        url: "/breeds",
        params: { limit: 10, page: 0 },
      }),
    }),
  }),
});

export const { useGetBreedsQuery } = catsApi;
