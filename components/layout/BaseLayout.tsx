import "@/app/globals.css";
import "@/styles/base.css"
import ModeToggle from "@/components/features/toggle/ModeToggle";
import { ThemeProvider } from "@/components/provider/theme-provider";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

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
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      <ModeToggle />
    </ThemeProvider>
  );
}
