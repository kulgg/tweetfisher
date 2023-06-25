import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import SiteHeader from "./SiteHeader";
import { cn } from "@/lib/utils";
import StatusBar from "@/components/StatusBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const clash = localFont({
  src: "./ClashDisplay-Semibold.otf",
  variable: "--font-clash",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <div className="container">
            <SiteHeader />
            {children}
            <StatusBar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
