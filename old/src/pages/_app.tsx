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

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={cx(clash.variable, inter.variable)}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
