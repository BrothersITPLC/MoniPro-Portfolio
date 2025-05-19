import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithReauth } from "@/lib/baseQuery";

export const AlertApi = createApi({
  reducerPath: "AlertApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAlertList: builder.query<[], void>({
      query: () => ({
        url: "/get-zabbix-alerts/",
        method: "GET",
      }),
    }),
    getAiExplanation: builder.mutation<{}, void>({
      query: (item_id) => ({
        url: "/get-ai-explanation/",
        method: "POST",
        body: { triggerid: item_id },
      }),
    }),
  }),
});

export const { useGetAlertListQuery, useGetAiExplanationMutation } = AlertApi;
