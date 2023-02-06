import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type AppType } from "next/dist/shared/lib/utils";

import "../styles/globals.css";

import { Inter } from "@next/font/google";
import localFont from "@next/font/local";
import cx from "classnames";

const clash = localFont({
  src: "../styles/ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={cx(clash.variable, inter.variable)}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
};

export default MyApp;
