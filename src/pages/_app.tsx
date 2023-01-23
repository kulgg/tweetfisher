import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";

import "../styles/globals.css";

const queryClient = new QueryClient()

const MyApp: AppType = ({ Component, pageProps }) => {
  return (<QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>)
};

export default MyApp;
