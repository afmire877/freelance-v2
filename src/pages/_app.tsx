import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import LogRocket from "logrocket";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
    },
  },
});

const MyApp: AppType = ({ Component, pageProps }) => {
  if (typeof window !== "undefined") {
    const sessionStoragePersister = createSyncStoragePersister({
      storage: window.sessionStorage,
    });

    persistQueryClient({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      queryClient,
      persister: sessionStoragePersister,
    });
  }

  useEffect(() => {
    LogRocket.init("dolg54/ggh-freelance");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default api.withTRPC(MyApp);
