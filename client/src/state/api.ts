import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Boilerplate so we can make API calls. Making API calls with next.js and redux toolkit.

// interface: Create the type that represents what we get back form the backend.

export interface Product {
    productId: string;
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
  }
  
  export interface NewProduct {
    name: string;
    price: number;
    rating?: number;
    stockQuantity: number;
  }
  
  export interface SalesSummary {
    salesSummaryId: string;
    totalValue: number;
    changePercentage?: number;
    date: string;
  }
  
  export interface PurchaseSummary {
    purchaseSummaryId: string;
    totalPurchased: number;
    changePercentage?: number;
    date: string;
  }
  
  export interface ExpenseSummary {
    expenseSummarId: string;
    totalExpenses: number;
    date: string;
  }
  
  export interface ExpenseByCategorySummary {
    expenseByCategorySummaryId: string;
    category: string;
    amount: string;
    date: string;
  }
  
  export interface DashboardMetrics {
    popularProducts: Product[];
    salesSummary: SalesSummary[];
    purchaseSummary: PurchaseSummary[];
    expenseSummary: ExpenseSummary[];
    expenseByCategorySummary: ExpenseByCategorySummary[];
  }
  
  export interface User {
    userId: string;
    name: string;
    email: string;
  }

// Any time we make the api call, we are going to use the 'baseURL' which is set to youe environment variable.

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: 'api',
    tagTypes: ["DashboardMetrics","Products", "Users", "Expenses"],
    endpoints: (build) => ({
      // DashboardMetrics is the value and type that we're getting from the backend and 'void' is what we're supposed to send to the query but in this case it's a GET request so its always going to be void.
        getDashboardMetrics: build.query<DashboardMetrics, void>({
          // Respresents the route that we want.
          // providersTags: When you're getting a request and grabbing the dashboard API  (res.json in dashboardController file), it get saved to the tag, in this case DashboardMetrics.
          // You specify the tag because later on we can invalidate if we want this to refresh (refetch) or update tag.  
           query: () => "/dashboard",
           providesTags: ["DashboardMetrics"]
        }),
        getProducts: build.query<Product[], string | void>({
            query: (search) => ({
              url: "/products",
              params: search ? { search } : {},
            }),
            providesTags: ["Products"],
          }),
          createProduct: build.mutation<Product, NewProduct>({
            query: (newProduct) => ({
              url: "/products",
              method: "POST",
              body: newProduct,
            }),
            invalidatesTags: ["Products"],
          }),
          getUsers: build.query<User[], void>({
            query: () => "/users",
            providesTags: ["Users"],
          }),
          getExpensesByCategory: build.query<ExpenseByCategorySummary[], void>({
            query: () => "/expenses",
            providesTags: ["Expenses"],
          }),
    }),
});

export const {
    useGetDashboardMetricsQuery,
    useGetProductsQuery,
    useCreateProductMutation,
    useGetUsersQuery,
    useGetExpensesByCategoryQuery,
} = api;