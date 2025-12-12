import BaseLayout from "@/components/layout/BaseLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "知晓",
  description: "喵喵喵~",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="font-chat-default" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="antialiased text-font-color flex flex-col min-h-dvh bg-background-color-body">
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
