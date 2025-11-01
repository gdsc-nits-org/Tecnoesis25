import LenisProvider from "~/components/LenisProvider";

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <LenisProvider>{children}</LenisProvider>;
}
