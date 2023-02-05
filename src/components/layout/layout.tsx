import React from "react";
import Header from "./header";
import Meta from "./meta";

export type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Meta />
      <Header />
      <main className="flex min-h-screen flex-col overflow-x-hidden px-2 pt-32 font-default sm:px-0">
        {children}
      </main>
    </>
  );
}

export default Layout;
