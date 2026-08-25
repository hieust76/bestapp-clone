import { Header3D } from "@/components/layout/Header3D";
import { Footer3D } from "@/components/layout/Footer3D";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header3D />
      <main className="flex-1">{children}</main>
      <Footer3D />
    </div>
  );
}
