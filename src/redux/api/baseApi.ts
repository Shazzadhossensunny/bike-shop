import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { logout, setUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://bike-store-livid.vercel.app/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 400) {
    const errorData = result.error.data as { message: string };
    toast.error(errorData.message);
  }
  if (result?.error?.status === 401) {
    const errorData = result.error.data as { message: string };
    toast.error(errorData.message);
  }
  if (result?.error?.status === 404) {
    const errorData = result.error.data as { message: string };
    toast.error(errorData.message);
  }
  if (result?.error?.status === 403) {
    const errorData = result.error.data as { message: string };
    console.log(errorData);
    toast.error(errorData.message);
  }
  //* Check if the request was unauthorized
  if (result?.error && result?.error?.status === 401) {
    const res = await fetch(
      "https://bike-store-livid.vercel.app/api/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );
    const refreshData: {
      data?: { accessToken: string };
      error?: string;
    } = await res.json();
    if (refreshData.data?.accessToken) {
      const currentState = api.getState() as RootState;
      const { name, email } = currentState.auth as any;
      api.dispatch(
        setUser({
          user: name,
          email,
          token: refreshData.data.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: ["Users", "Products", "Orders", "Payments"],
});
