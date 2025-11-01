import Navbar from "~/components/Navbar/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black min-h-screen w-[100vw] overflow-x-hidden">
      <Navbar />
      {children}
    </div>
  );
}
