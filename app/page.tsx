"use client";

import AboutSection from "../components/AboutSection";
import Hero from "../components/Hero";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FeaturedProperties from "../components/FeaturedProperties";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* INICIO */}
        <Hero />

        {/* SOBRE NOSOTROS */}
        <AboutSection />

        {/* PROPIEDADES DESTACADAS */}
        <section id="propiedades">
          <FeaturedProperties />
        </section>

        {/* ¿POR QUÉ INHOM? */}
        <WhyChooseUs />

        {/* CONTACTO */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}