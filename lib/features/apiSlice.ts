import { 
  BaseQueryFn, 
  createApi, FetchArgs, 
  fetchBaseQuery, 
  FetchBaseQueryError 
} from "@reduxjs/toolkit/query/react";
import HttpStatus from "http-status";
import { prefix } from "@/app/utils/prefix";

const baseQuery = fetchBaseQuery({ 
  baseUrl: `${prefix}/api/v1`, 
  credentials: "include" 
});

// สร้าง Custom Base Query เพื่อดัก Error
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    if (result.error.status === HttpStatus.UNAUTHORIZED) {
      console.warn("Session หมดอายุ ไปหน้า Login");
      window.location.href = '/login'; 
    } else if (result.error.status === HttpStatus.FORBIDDEN) {
      console.warn("ไม่มีสิทธิ์เข้าถึง");
      window.location.href = '/forbidden'; 
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth, 
  tagTypes: ["Tools", "Transaction"],
  endpoints: () => ({}),
});
