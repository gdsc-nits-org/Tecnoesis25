import LenisProvider from "~/components/LenisProvider";

export default function SparkLayout({ children }: { children: React.ReactNode }) {
  return <LenisProvider>{children}</LenisProvider>;
}
