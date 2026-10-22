import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import ScrollingTicker from "@/app/components/Marquee";
import RouteChangeLoader from "@/app/RouteChangeLoader";
import { ContentProvider } from "@/app/components/ContentProvider";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getSiteContent();

  return (
    <ContentProvider content={content}>
      <RouteChangeLoader />
      <Navbar />
      <ScrollingTicker />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </ContentProvider>
  );
}
