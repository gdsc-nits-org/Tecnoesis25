import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";


export const metadata: Metadata = {
  title: "Tecnoesis 2025",
  description: "The Official Website of Tecnoesis 2025",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="no-scrollbar">{children}</body>
    </html>
  );
}
