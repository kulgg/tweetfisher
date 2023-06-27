import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import SiteHeader from "./SiteHeader";
import { cn } from "@/lib/utils";
import StatusBar from "@/components/StatusBar";
import Providers from "./Providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const clash = localFont({
  src: "./ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

export const metadata = {
  title: "TweetFisher - Find deleted tweets",
  description:
    "Easily retrieve deleted tweets that have been archived by the wayback machine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("font-sans", inter.variable, clash.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <div className="container">
              <SiteHeader />
              {children}
              <StatusBar />
            </div>
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
