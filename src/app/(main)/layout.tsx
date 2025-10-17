import Navbar from "~/components/Navbar/Navbar";
import ScrollbarColorController from "~/components/ScrollbarColorController";
import CustomCursor from "~/components/CustomCursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-hidden">
      <ScrollbarColorController />
      <CustomCursor />
      <Navbar />
      {children}
    </div>
  );
}
