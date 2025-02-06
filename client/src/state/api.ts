import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

// Any time we make the api call, we are going to use the 'baseURL' which is set to youe environment variable.

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: 'api',
    tagTypes: [],
    endpoints: (build) => ({}),
});

export const {} = api;