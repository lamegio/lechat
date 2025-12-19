"use client";
import "@/app/globals.css";
import "@/styles/base.css";
import ModeToggle from "@/components/features/toggle/ModeToggle";
import { ThemeProvider } from "@/components/provider/theme-provider";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import TopLoader from "@/components/TopLoader";
import { Suspense } from "react";
import FullPageLoading from "@/components/FullPageLoading";
import SWRProvider from "@/components/provider/swr-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Suspense fallback={<FullPageLoading />}>
        <TopLoader />
        <SWRProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <ModeToggle />
        </SWRProvider>
      </Suspense>
    </ThemeProvider>
  );
}
