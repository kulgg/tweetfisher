import React from "react";
import useScroll from "../../lib/hooks/use-scroll";
import ScrollToTop from "../scroll-to-top";
import Header from "./header";
import Meta from "./meta";

export type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const isScrollToTopVisible = useScroll(1500);

  return (
    <>
      <Meta />
      <Header />
      <main className="container mx-auto flex min-h-screen flex-col overflow-x-hidden py-32 px-2 font-default sm:px-0">
        {children}
      </main>
      {isScrollToTopVisible && <ScrollToTop />}
    </>
  );
}

export default Layout;
