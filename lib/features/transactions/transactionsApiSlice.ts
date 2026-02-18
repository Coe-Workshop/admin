import { prefix } from "@/app/utils/prefix";
import { apiSlice } from "../apiSlice";
import {
  ToolTransactionData,
  ToolTransactionResponse,
} from "./transaction.types";
export const apiSliceWithTransactions = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getToolTransaction: builder.query<ToolTransactionData, number>({
      query: (toolId) => `${prefix}/api/v1/transactions?item=${toolId}`,
      keepUnusedDataFor: 300,
      transformResponse(res: ToolTransactionResponse) {
        return res.data;
      },
      // providesTags:
    }),
  }),
  overrideExisting: false,
});

export const { useGetToolTransactionQuery } = apiSliceWithTransactions;
