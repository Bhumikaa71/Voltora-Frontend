import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function VoltoraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}