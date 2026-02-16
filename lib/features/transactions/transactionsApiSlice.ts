import { apiSlice } from "../apiSlice";
import {
  ToolTransactionData,
  ToolTransactionResponse,
} from "./transaction.types";
export const apiSliceWithTransactions = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getToolTransaction: builder.query<ToolTransactionData, number>({
      query: (toolId) => `/transactions?item=${toolId}`,
      keepUnusedDataFor: 300,
      transformResponse(res: ToolTransactionResponse) {
        return res.data;
      },
      // providesTags:
    }),
    // ทำเผื่อ
    getAllTransactions: builder.query<ToolTransactionData, void>({
      query: () => `/transactions`, // ตรวจสอบ path กับ Backend อีกที (เช่น /transactions หรือ /admin/transactions)
      keepUnusedDataFor: 300,
      transformResponse(res: ToolTransactionResponse) {
        return res.data;
      },
      providesTags: ["Transaction"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetToolTransactionQuery, useGetAllTransactionsQuery } = apiSliceWithTransactions;
