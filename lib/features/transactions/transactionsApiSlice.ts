import { apiSlice } from "../apiSlice";
import {
  ISODateString,
  ToolTransactionData,
  ToolTransactionResponse,
} from "./transaction.types";

function querySent(
  toolId?: number|null, 
  userId?: string|null, 
  date?: ISODateString|null, 
  page?: number|null) {
    const params = new URLSearchParams();

    if (toolId) params.set("item", String(toolId));
    if (userId) params.set("user", userId);
    if (date) params.set("date", date);
    if (page) params.set("page", String(page));

    return `/admin/api/v1/transactions?${params.toString()}`;
}

export const apiSliceWithTransactions = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getToolTransaction: builder.query<ToolTransactionData, { toolId:number; userId:string; date:ISODateString; page:number}>({
      query: ({toolId, userId, date, page}) => querySent(toolId, userId, date, page),
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
  overrideExisting: true,
});

export const { useGetToolTransactionQuery, useGetAllTransactionsQuery } = apiSliceWithTransactions;
