import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// รอinterface ดีๆ
export type ToolCategory =
  | "men's clothing"
  | "jewelery"
  | "electronics"
  | "women's clothing";
export type ToolStatus = "available" | "unavailable";
export interface Tool {
  id: number;
  url: string;
  title: string;
  description: string;
  available: number;
  quatity: number;
  assetId: string | undefined;
  category: ToolCategory;
}
export interface Transaction {
  id: string;
  user_id: string;
  create_at: string;
  approve_at: string;
  loan_at: string;
  recieve_at: string;
  status: ToolStatus;
  message: string[]
  update_at: string
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  tagTypes: ["Tool", "Transaction"],
  endpoints: (builder) => ({
    getTools: builder.query<Tool[], void>({
      query: () => "/products",
      providesTags: (result = [], error, arg) => [
        "Tool",
        ...result.map(({ id }) => ({ type: "Tool", id } as const)),
      ],
    }),
    getTool: builder.query<Tool, string>({
      query: (toolId) => `/products/${toolId}`,
      providesTags: (result, error, arg) => [{ type: "Tool", id: arg }],
    }),
    addTool: builder.mutation<Tool, Tool>({
      query: (tool) => ({ url: "/products", method: "POST", body: tool }),
      invalidatesTags: ["Tool"],
    }),
    editTool: builder.mutation<Tool[], Tool>({
      query: (tool) => ({ url: "/products", method: "PATCH", body: tool }),
      invalidatesTags: ["Tool"],
    }),
    deleteTool: builder.mutation<Tool, string>({
      query: (toolId) => ({ url: "/products", method: "DELETE", body: toolId }),
      invalidatesTags: ["Tool"],
    }),

    // getTransactions: builder.query<Transaction[], void>({
    //     query: () => "/transactions",
    //     providesTags: (result = [], error, arg) => [
    //     "Tool",
    //     ...result.map(({ id }) => ({ type: "Transaction", id } as const)),
    //   ],
    // }),
    // getTransaction: builder.query<Transaction, string>({
    //   query: (transactionId) => `/transactions/${transactionId}`,
    //   providesTags: (result, error, arg) => [{ type: "Transaction", id: arg }],
    // }),
  }),
});

export const {
  useGetToolsQuery,
  useGetToolQuery,
  useEditToolMutation,
  useAddToolMutation,
  useDeleteToolMutation,
} = apiSlice;
// keepUnusedDataFor  -> for set catch time , default 60s
