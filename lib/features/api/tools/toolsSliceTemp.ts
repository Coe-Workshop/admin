import { apiSlice } from "../apiSlice";
import {
  createSelector,
  createEntityAdapter,
  EntityState
} from '@reduxjs/toolkit'

// fix interface
export enum catagories {
  
}

export interface Tool {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  category_ids:  number[]| null;
}

const mock = {
    name: "postpost pose",
    description: "string",
    category_ids: [2],
    image_url: "string"
}

export type Tools = Tool[];

export interface ToolsResponse {
    data: Tools
    success: boolean
}

export interface ToolResponse {
  data: Tool
  success: boolean
}

export interface ToolsState extends EntityState<Tool, number> {
}
export const toolsAdapter = createEntityAdapter<Tool>({
  selectId: (tool)=> tool.id,
});

export const initialState: ToolsState = toolsAdapter.getInitialState();

export const apiSliceWithTools = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTools: builder.query<ToolsState, void>({
      query: () => "/v1/items",
      transformResponse(res: ToolsResponse) {
        return toolsAdapter.setAll(initialState, res.data);
      }
    }),

    getTool: builder.query<Tool, number>({
      query: (toolId) => ({ url: `/v1/items/${toolId}`, method: "GET" }),
    }),

    deleteTool: builder.mutation<{}, {toolId: number }>({
      query: ({ toolId }) => ({
        url: `/v1/items/${toolId}`,
        method: "DELETE",
      }),

      async onQueryStarted({ toolId }, lifecycleApi) {
        const getToolsPatchResult = lifecycleApi.dispatch(
          apiSlice.util.updateQueryData("getTools", undefined, (draft: ToolsState) => {
            toolsAdapter.removeOne(draft, toolId);
          })
        );
        try {
          await lifecycleApi.queryFulfilled;
          console.log("yeah it done")
        } catch {
          console.log("not dune")
          getToolsPatchResult.undo();
        }
      },
    }),

    createTool: builder.mutation<Tool, Omit<Tool, 'id'>>({
      query: (tool) => ({
        url: `/v1/items`,
        method: "POST",
        body: (tool),
      }),
      async onQueryStarted( tool , lifecycleApi) {
        const tempId = -Math.floor(Math.random() * 1000000);
        // const tempTool = {...tool, id:tempId}
        const getToolsPatchResult = lifecycleApi.dispatch(
          apiSlice.util.updateQueryData("getTools", undefined, (draft: ToolsState) => {
            // toolsAdapter.addOne(draft, tempTool);
          })
        );
        try {
          await lifecycleApi.queryFulfilled;
          console.log("yeah it done")
        } catch {
          console.log("not dune")
          getToolsPatchResult.undo();
        }
      },
    })
  }),
});

export const { useGetToolsQuery, useDeleteToolMutation, useCreateToolMutation } = apiSliceWithTools;
export const selectToolsResult = apiSliceWithTools.endpoints.getTools.select()
const selectToolsData = createSelector(
  selectToolsResult,
  result => result.data ?? initialState
)
export const {selectAll: selectAllTools} = toolsAdapter.getSelectors(selectToolsData);