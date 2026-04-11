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
    if (result.error.status === HttpStatus.UNAUTHORIZED || result.error.status === HttpStatus.FORBIDDEN) {
      console.warn("Session หมดอายุ หรือไม่มีสิทธิ์เข้าถึง - กำลังเคลียร์ session");
      
      try {
        await fetch(`${prefix}/api/v1/auth/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (e) {
        console.log("Logout request failed, proceeding to login anyway");
      }
      
      window.location.href = `${prefix}/login`; 
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
