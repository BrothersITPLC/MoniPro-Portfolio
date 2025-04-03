import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../BaseUrl";

export const zabbixApi = createApi({
  reducerPath: "zabbixApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, credentials: "include" }),
  tagTypes: ["Profile", "Infrastructures"],
  endpoints: (builder) => ({

    zabbixLogin: builder.mutation({
      query: () => ({
        url: "https://zx.brothersit.dev/api_jsonrpc.php",
        method: "POST",
        headers: {
          "Content-Type": "application/json-rpc",
        },
        credentials: "omit",
        body: {
          jsonrpc: "2.0",
          method: "user.login",
          params: {
            username: "Admin",
            password: "zabbix"
          },
          id: 1
        },
      }),
      transformResponse: (response: { result: string }) => {
        return response.result;
      },
    }),

    zabbixGetItems: builder.query({
      query: ({ authToken, hostids }) => ({
        url: "https://zx.brothersit.dev/api_jsonrpc.php",
        method: "POST",
        headers: {
          "Content-Type": "application/json-rpc",
          "Authorization": `Bearer ${authToken}`
        },
        credentials: "omit",
        body: {
          jsonrpc: "2.0",
          method: "item.get",
          params: {
            output: ["itemid", "name", "key_"],
            hostids: hostids,
            search: {
              name: "CPU"  // Example search for CPU items
            },
            sortfield: "name"
          },
          id: 2
        },
      }),
      transformResponse: (response: { result: any[] }) => {
        return response.result;
      },
    }),

    zabbixGetRealTimeData: builder.query({
      query: ({ authToken, itemids }) => ({
        url: "https://zx.brothersit.dev/api_jsonrpc.php",
        method: "POST",
        headers: {
          "Content-Type": "application/json-rpc",
          "Authorization": `Bearer ${authToken}`
        },
        credentials: "omit",
        body: {
          jsonrpc: "2.0",
          method: "history.get",
          params: {
            output: "extend",
            history: 0,  // Assuming we're fetching numeric data
            itemids: itemids,
            limit: 100,  // Fetch the last 100 data points for historical data
            sortfield: "clock",
            sortorder: "DESC"
          },
          id: 3
        },
      }),
      transformResponse: (response: { result: any[] }) => {
        return response.result;
      },
    }),
  //for geting host data
    zabbixGetHosts: builder.query({
      query: (authToken: string) => ({
        url: "https://zx.brothersit.dev/api_jsonrpc.php",
        method: "POST",
        headers: {
          "Content-Type": "application/json-rpc",
          "Authorization": `Bearer ${authToken}`
        },
        credentials: "omit",
        body: {
          jsonrpc: "2.0",
          method: "host.get",
          params: {
            output: ["hostid", "name", "status", "available"],
            selectInterfaces: ["ip", "dns", "useip", "type"],
            selectGroups: "extend",
            filter: {
              host: [
                  "Uemis",
              ]
          }
          },
          id: 2
        },
      }),
      transformResponse: (response: { result: any[] }) => {
        return response.result;
      },
    }),

    zabbixGetGraphImage: builder.query({
      query: ({ authToken, itemid, timeFrom, timeTill }) => ({
        url: "https://zx.brothersit.dev/api_jsonrpc.php",
        method: "POST",
        headers: {
          "Content-Type": "application/json-rpc",
          "Authorization": `Bearer ${authToken}`
        },
        credentials: "omit",
        body: {
          jsonrpc: "2.0",
          method: "history.get",
          params: {
            output: "extend",
            history: 0, // Assuming we're fetching numeric data
            itemids: [itemid],
            time_from: timeFrom,
            time_till: timeTill,
            sortfield: "clock",
            sortorder: "ASC"
          },
          auth: authToken,
          id: 5
        },
      }),
      transformResponse: (response: { result: any[] }) => {
        if (!response.result || response.result.length === 0) {
          return null;
        }
        return response.result;
      },
    }),
  }),
});

export const {
  useZabbixGetHostsQuery,
  useZabbixGetGraphImageQuery,
} = zabbixApi;
