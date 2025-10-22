import { ReactNode } from "react";

export default function RobotronLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Prefetch critical resources */}
      <link
        rel="preload"
        href="/robotron/tron_ares_bike.webp"
        as="image"
        type="image/webp"
      />
      <link
        rel="preload"
        href="/robotron/bg_robotron.webp"
        as="image"
        type="image/webp"
      />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      {children}
    </>
  );
}
