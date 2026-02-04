import { apiSlice } from "../apiSlice";
import { createSelector } from "@reduxjs/toolkit";
import type {
  Tool,
  Tools,
  ToolsResponse,
  ToolResponse,
  ToolRequest,
} from "@/lib/features/tools/tool.typs";
// const mock = {
//   name: "postpost pose",
//   description: "string",
//   category_ids: "the hell",
//   image_url: "string",
// };

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
              { type: "Tools", id: "LIST" },
              ...result.map(
                (tool) => ({ type: "Tools", id: tool.id } as const)
              ),
            ]
          : [{ type: "Tools", id: "LIST" }],
    }),

    getTool: builder.query<Tool, number>({
      query: (toolId) => ({ url: `/v1/items/${toolId}`, method: "GET" }),
      providesTags: (result, error, arg) => [{ type: "Tools", id: arg }],
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
        { type: "Tools", id: "LIST" },
        { type: "Tools", id: arg.toolId },
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
      invalidatesTags: [{ type: "Tools", id: "LIST" }],
    }),

    updateTool: builder.mutation<Tool, { tool: ToolRequest }>({
      query: ({ tool }) => ({
        url: `/v1/items/${tool.id}`,
        method: "PATCH",
        body: tool,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Tools", id: "LIST" },
        { type: "Tools", id: arg.tool.id },
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
