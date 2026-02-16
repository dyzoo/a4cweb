import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ScrollingTicker from "@/app/components/Marquee";
import RouteChangeLoader from "@/app/RouteChangeLoader";

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RouteChangeLoader />
      <Navbar />
      <ScrollingTicker />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
