import { ResponseStatus } from "@/app/components/ui/adminTransaction/adminTransaction.type";
import { apiSlice } from "../apiSlice";
import {
  ISODateString,
  SentTransactionStatus,
  ToolTransactionData,
  ToolTransactionResponse,
  TranactionQueryElement,
} from "./transaction.types";
import { prefix } from "@/app/utils/prefix";

function querySent(query: TranactionQueryElement) {
    const params = new URLSearchParams();

    if (query.toolId) params.set("item", String(query.toolId));
    if (query.userId) params.set("user", query.userId);
    if (query.date) params.set("date", query.date);
    if (query.page) params.set("page", String(query.page));

    return `/transactions?${params.toString()}`;
}

export const apiSliceWithTransactions = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getToolTransaction: builder.query<ToolTransactionData, TranactionQueryElement>({
      query: (args) => querySent(args),
      keepUnusedDataFor: 300,
      transformResponse(res: ToolTransactionResponse) {
        return res.data;
      },
      // providesTags:
    }),
    // ทำเผื่อ
    getAllTransactions: builder.query<ToolTransactionData, void>({
      query: () => `/transactions`,
      keepUnusedDataFor: 300,
      transformResponse(res: ToolTransactionResponse) {
        return res.data;
      },
      providesTags: ["Transaction"],
    }),
    // wait to complete and adjust it
    updateTransactionStatus: builder.mutation<
      ToolTransactionResponse, 
      SentTransactionStatus
    >(
      {
      query: (body) => ({
        url: `/transactions/status`, // THIS will update later (wait back)
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Transaction"], 
      }
    ),
  }),
  overrideExisting: true,
});

export const { 
  useGetToolTransactionQuery, 
  useGetAllTransactionsQuery,
  useUpdateTransactionStatusMutation,
} = apiSliceWithTransactions;
