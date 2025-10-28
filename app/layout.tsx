import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub — Manage your notes easily",
  description: "Create, organize and manage your notes with NoteHub.",
  openGraph: {
    title: "NoteHub — Manage your notes easily",
    description: "Create, organize and manage your notes with NoteHub.",
    url: "https://your-vercel-app.vercel.app/",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
