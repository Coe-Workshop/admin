import { apiSlice } from "../apiSlice";
import { createSelector } from "@reduxjs/toolkit";

// handle enum
export enum catagories {}
export interface Tool {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  category_ids: number[] | null;
}
export type Tools = Tool[];
export interface ToolsResponse {
  data: Tools;
  success: boolean;
  error: string | null;
}
export interface ToolResponse {
  data: Tool;
  success: boolean;
  error: string | null;
}
export interface ToolRequest {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  category_ids: number[] | null;
}
const mock = {
  name: "postpost pose",
  description: "string",
  category_ids: "the hell",
  image_url: "string",
};

export const initialState: Tools = [];
export const apiSliceWithTools = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTools: builder.query<Tools, void>({
      query: () => "/v1/items",
      transformResponse(res: ToolsResponse) {
        return res.data;
      },
      providesTags: (result = [], error, arg) => [
        "Tools",
        ...result.map((id) => ({ type: "Tools", id } as const)),
      ],
    }),

    getTool: builder.query<Tool, number>({
      query: (toolId) => ({ url: `/v1/items/${toolId}`, method: "GET" }),
      providesTags: (result, error, arg) => [{ type: "Post", id: arg }],
    }),

    deleteTool: builder.mutation<{}, { toolId: number }>({
      query: ({ toolId }) => ({
        url: `/v1/items/${0}`,
        method: "DELETE",
      }),
      transformResponse(res: ToolResponse) {
        if (!res.success) {
          throw {
            status: 200,
            data: { message: res.data },
          };
        }
        return res.data;
      },
      invalidatesTags: ["Tools"],
    }),

    createTool: builder.mutation<Tool, Omit<Tool, "id">>({
      query: (tool) => ({
        url: `/v1/items`,
        method: "POST",
        body: tool,
      }),
      transformResponse(res: ToolResponse) {
        if (!res.success) {
          throw {
            status: 200,
            data: { message: res.data },
          };
        }
        return res.data;
      },
      invalidatesTags: ["Tools"],
    }),

    updateTool: builder.mutation<Tool, { tool: ToolRequest }>({
      query: ({ tool }) => ({
        url: `/v1/items/${tool.id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Tools"],
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
} = apiSliceWithTools;

export const selectToolsResult =
  apiSliceWithTools.endpoints.getTools.select(undefined);

const selectToolsData = createSelector(
  selectToolsResult,
  (result) => result.data ?? initialState
);

export const selectAllTools = selectToolsData;
