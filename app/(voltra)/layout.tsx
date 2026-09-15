import Navbar from "@/components/websitecommon/navbar";
import Footer from "@/components/websitecommon/footer";

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