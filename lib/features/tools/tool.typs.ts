// handle enum
export enum catagories {}
export const enum ToolCategories {
  MACHINE = "MACHINE",
  HANDTOOL = "HANDTOOL",
  ELECTRONIC = "ELECTRONIC",
  OTHER = "OTHER"
}


export interface Tool {
  id: number;
  name: string;
  description: string | null;
  imageUrl: string | null;
  category: ToolCategories;
  categoryID: number | null;
  assets_id: number[] | null;
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
  imageUrl: string | null;
  category: number[] | null;
}
