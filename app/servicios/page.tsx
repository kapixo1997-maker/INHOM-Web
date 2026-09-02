import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";

export default function ServiciosPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <ServicesSection />
      </main>

      <Footer />
    </>
  );
}