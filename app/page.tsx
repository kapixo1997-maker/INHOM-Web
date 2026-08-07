"use client";
import ServicesSection from "../components/ServicesSection";
import AboutSection from "../components/AboutSection";
import Hero from "../components/Hero";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FeaturedProperties from "../components/FeaturedProperties";
import WhyChooseUs from "../components/WhyChooseUs";
import Link from "next/link";
import { propiedades } from "../data/propiedades";
import { motion } from "framer-motion";

export default function Home() {
const introFinished = true;
  const totalPropiedades = propiedades.length;

  const totalCasas = propiedades.filter(
    (p) => p.tipo === "casa"
  ).length;

  const totalTerrenos = propiedades.filter(
    (p) => p.tipo === "terreno"
  ).length;

 return (
  <>
    

    <div>
      <Navbar />

      <Hero />

<AboutSection />

<ServicesSection />

<div id="propiedades">
  <FeaturedProperties />
</div>

      <WhyChooseUs />

<ContactSection />

<Footer />

</div>
</>
);
}