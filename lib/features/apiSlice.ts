import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { prefix } from "@/app/utils/prefix";

const baseQuery = fetchBaseQuery({ 
  baseUrl: `${prefix}/api/v1`, 
  credentials: "include" 
});

// สร้าง Custom Base Query เพื่อดัก Error
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // ถ้า Backend ตอบกลับมาว่า 401 (Unauthorized / ไม่มีคุกกี้ หรือ คุกกี้หมดอายุ)
  if (result.error && result.error.status === 401) {
    console.warn("Cookie หมดอายุ หรือยังไม่ได้ Login");    
    // บังคับเปลี่ยนหน้าไปที่ /login
    window.location.href = '/login'; 
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth, 
  tagTypes: ["Tools", "Transaction"],
  endpoints: () => ({}),
});
