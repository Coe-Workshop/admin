import { apiSlice } from "../apiSlice";
import {
  SentTransactionStatus,
  ToolTransactionData,
  ToolTransactionResponse,
  TranactionQueryElement,
  UserTransactionGroups,
} from "./transaction.types";

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
    getAllTransactionsByStatus: builder.query<UserTransactionGroups, { status: string; page?: number }>({
      query: ({ status, page = 1 }) => {
        const params = new URLSearchParams();
        params.set("status", status);
        params.set("page", String(page));
        return `/transactions/by-status?${params.toString()}`;
      },
      keepUnusedDataFor: 300,
      transformResponse(res: { success: boolean; data: UserTransactionGroups }) {
        return res.data;
      },
      providesTags: ["Transaction"],
    }),
    updateTransactionStatus: builder.mutation<
      ToolTransactionResponse,
      SentTransactionStatus
    >({
      query: (body) => ({
        url: `/transactions/${body.transactionId}`,
        method: "PATCH",
        body: {
          isApproved: body.isApproved,
          message: body.message,
        },
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
  overrideExisting: true,
});

export const { 
  useGetToolTransactionQuery, 
  useGetAllTransactionsByStatusQuery,
  useUpdateTransactionStatusMutation,
} = apiSliceWithTransactions;
