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
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      prefix="og: https://ogp.me/ns#"
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
        <meta
          property="og:website"
          content="https://tecnoesis25.pages.dev/"
        />
        <meta property="og:type" content="website" />
      </head>
      <body className="min-h-screen flex flex-col no-scrollbar overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}