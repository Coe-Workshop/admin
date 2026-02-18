import { prefix } from "@/app/utils/prefix";
import { apiSlice } from "../apiSlice";
import { loginStart } from "./authSlice";

export const apiSliceWithAuth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `${prefix}/api/v1/auth/login`,
        method: "POST",
        body: credentials,
      }),
      transformResponse: (res) => res.data,
      onQueryStarted: async (arg, { dispatch }) => {
        dispatch(loginStart());
      },
      invalidatesTags: [],
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = apiSliceWithAuth;
