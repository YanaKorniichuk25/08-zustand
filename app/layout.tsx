import type { Metadata } from "next";
import "./globals.css";
import "modern-normalize";
import { Footer } from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { TanStackProvider } from "../components/TanStackProvider/TanStackProvider";
import { Toaster } from "react-hot-toast";
import React from "react";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Simple note management app",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
  modal?: React.ReactNode;
}>;

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
          {modal}
          <Footer />
          <Toaster position="top-right" />
        </TanStackProvider>
      </body>
    </html>
  );
}
