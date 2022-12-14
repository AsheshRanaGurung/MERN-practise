import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./Toast";
import { AxiosError } from "axios";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: async (error, query) => {
      const err = error as AxiosError;

      if (err.request?.status === 401) {
        // await api.get("/api/refresh-token");
        // queryClient.refetchQueries(query.queryKey);
        // queryClient.setQueryData(authTokenKey, () => false);
        // setTimeout(() => {
        //   TokenService.clearToken();
        //   queryClient.clear();
        //   toastFail("Session Expired! Please login again!");
        // }, 500);
      }
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 1000 * 60 * 0.5, // 30 seconds
    },
  },
});

const Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Toaster
            position="top-right"
            containerStyle={{ wordBreak: "break-word" }}
          />
          <HelmetProvider>{children}</HelmetProvider>

          <ReactQueryDevtools />
        </QueryClientProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default Provider;
