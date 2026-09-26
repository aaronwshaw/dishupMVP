import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DishUp: rate the dish, not just the restaurant",
  description: "Find the best dishes near you and share reviews of what you ordered.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunitoSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line bg-band">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted">
            © 2026 DishUp · A class MVP. Restaurants are fictional, and photos come from TheMealDB.
          </div>
        </footer>
      </body>
    </html>
  );
}
