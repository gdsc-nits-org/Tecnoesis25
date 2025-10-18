import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Orbitron } from "next/font/google";
import CustomCursor from "~/components/CustomCursor";
import ScrollbarColorController from "~/components/ScrollbarColorController";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

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
    <html
      lang="en"
      className={`${GeistSans.variable} ${orbitron.variable}`}
      prefix="og: https://ogp.me/ns#"
      suppressHydrationWarning
    >
      <head>
        <meta property="og:title" content="Tecnoesis 2025" />
        <meta
          property="og:description"
          content="The Official Website of Tecnoesis 2025"
        />
        <meta
          property="og:image"
          content="https://tecnoesis25.pages.dev/tecnoesis25.png"
        />
        <meta property="og:image:width" content="300" />
        <meta property="og:image:height" content="300" />
        <meta property="og:website" content="https://tecnoesis25.pages.dev/" />
        <meta property="og:type" content="website" />
      </head>
      <body className="no-scrollbar flex min-h-screen flex-col overflow-x-hidden bg-black">
        {/* Global UI helpers mounted once for entire app, including top-level pages and error boundaries */}
        <ScrollbarColorController />
        <CustomCursor />
        {children}
      </body>
      {process.env.NODE_ENV == "production" && (
        <GoogleAnalytics gaId="G-69XDYH0DYC" />
      )}
    </html>
  );
}
