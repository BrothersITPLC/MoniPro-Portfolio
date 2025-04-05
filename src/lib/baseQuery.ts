import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "@/BaseUrl";
import { handleUnauthorized } from "./handleUnauthorized";

export const baseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,
  credentials: "include",
});

export const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    handleUnauthorized();
  }

  return result;
};
