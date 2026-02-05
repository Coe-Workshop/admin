import { apiSlice } from "../apiSlice";
import { createSelector } from "@reduxjs/toolkit";
import type {
  Tool,
  Tools,
  ToolsResponse,
  ToolResponse,
  ToolRequest,
} from "@/lib/features/tools/tool.typs";
export const initialState: Tools = [];
export const apiSliceWithTools = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTools: builder.query<Tools, void>({
      query: () => "/v1/items",
      transformResponse(res: ToolsResponse) {
        return res.data;
      },
      providesTags: (result = []) =>
        result
          ? [
              { type: "Tools" as const, id: "LIST" },
              ...result.map(
                (tool) => ({ type: "Tools" as const, id: tool.id })
              ),
            ]
          : [{ type: "Tools" as const, id: "LIST" }],
    }),

    getTool: builder.query<Tool, number>({
      query: (toolId) => ({ url: `/v1/items/${toolId}`, method: "GET" }),
      transformResponse(res:ToolResponse) {
        return res.data;
      },
      providesTags: (result, error, arg) => [{ type: "Tools" as const, id: arg }],
    }),

    deleteTool: builder.mutation<object, { toolId: number }>({
      query: ({ toolId }) => ({
        url: `/v1/items/${toolId}`,
        method: "DELETE",
      }),
      // transformResponse(res: ToolResponse) {
      //   return res.data;
      // }, เตอบอกreturnเผื่อไว้
      invalidatesTags: (res, eror, arg) => [
        { type: "Tools" as const, id: "LIST" },
        { type: "Tools" as const, id: arg.toolId },
      ],
    }),

    createTool: builder.mutation<Tool, Omit<Tool, "id">>({
      query: (tool) => ({
        url: `/v1/items`,
        method: "POST",
        body: tool,
      }),
      transformResponse(res: ToolResponse) {
        return res.data;
      },
      invalidatesTags: [{ type: "Tools" as const, id: "LIST" }],
    }),

    updateTool: builder.mutation<Tool, { tool: ToolRequest }>({
      query: ({ tool }) => ({
        url: `/v1/items/${tool.id}`,
        method: "PATCH",
        body: tool,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Tools" as const, id: "LIST" },
        { type: "Tools" as const, id: arg.tool.id },
      ],
    }),

    updateToolAssets: builder.mutation<Tool, { tool: ToolRequest; assets_id: number[] | null }>({
      query: ({ tool, assets_id }) => ({
        url: `/v1/items/${tool.id}/assets`,
        method: "PATCH",
        body: { assets_id },
      }),
      transformResponse(res: ToolResponse) {
        return res.data;
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Tools" as const, id: "LIST" },
        { type: "Tools" as const, id: arg.tool.id },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetToolsQuery,
  useDeleteToolMutation,
  useCreateToolMutation,
  useGetToolQuery,
  useUpdateToolMutation,
} = apiSliceWithTools;

export const selectToolsResult =
  apiSliceWithTools.endpoints.getTools.select(undefined);

const selectToolsData = createSelector(
  selectToolsResult,
  (result) => result.data ?? initialState
);

export const selectAllTools = selectToolsData;
