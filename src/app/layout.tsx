import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import MusicButton from "~/components/MusicButton";
import BgmButton from "~/components/BgmButton";

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
      <body className="min-h-screen flex flex-col no-scrollbar overflow-x-hidden">
        {children}
        <BgmButton/>
      </body>
    </html>
  );
}
