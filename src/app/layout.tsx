import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import Link from "next/link";
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
            © 2026 DishUp · A BYU class MVP, not affiliated with any restaurant listed. Sample reviews are
            placeholders, and dish photos are representative images from Wikimedia Commons{" "}
            (<Link href="/credits" className="underline-offset-2 hover:text-brand hover:underline">photo credits</Link>).
          </div>
        </footer>
      </body>
    </html>
  );
}
