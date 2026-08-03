"use client";

import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FeaturedProperties from "../components/FeaturedProperties";
import WhyChooseUs from "../components/WhyChooseUs";
import Link from "next/link";
import { propiedades } from "../data/propiedades";
import { motion } from "framer-motion";

export default function Home() {
  const totalPropiedades = propiedades.length;

  const totalCasas = propiedades.filter(
    (p) => p.tipo === "casa"
  ).length;

  const totalTerrenos = propiedades.filter(
    (p) => p.tipo === "terreno"
  ).length;

  return (
    <>
      <Navbar />

      <section
        id="inicio"
        className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/65" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center text-white">

          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm backdrop-blur"
          >
            🏡 Bienvenido a INHOM Bienes Raíces
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8 text-5xl font-extrabold leading-tight md:text-7xl"
          >
            Encuentra tu próxima
            <br />
            <span className="text-[#6DB7C8]">
              inversión inmobiliaria
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-8 max-w-3xl text-xl text-gray-200"
          >
            Casas, terrenos y oportunidades de inversión en Chetumal,
            Quintana Roo. Encuentra la propiedad ideal con el respaldo de
            INHOM.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link
              href="#propiedades"
              className="rounded-xl bg-[#17495B] px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:bg-[#123847]"
            >
              Ver propiedades
            </Link>

            <a
              href="https://wa.me/529831543460"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black"
            >
              WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid gap-6 md:grid-cols-3"
          >
            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-lg"
            >
              <div className="mb-3 text-4xl">🏠</div>

              <h3 className="text-5xl font-extrabold">
                {totalPropiedades}
              </h3>

              <p className="mt-3 text-gray-200">
                Propiedades disponibles
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-lg"
            >
              <div className="mb-3 text-4xl">🏡</div>

              <h3 className="text-5xl font-extrabold">
                {totalCasas}
              </h3>

              <p className="mt-3 text-gray-200">
                Casas
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -8, scale: 1.03 }}
              className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-lg"
            >
              <div className="mb-3 text-4xl">🌳</div>

              <h3 className="text-5xl font-extrabold">
                {totalTerrenos}
              </h3>

              <p className="mt-3 text-gray-200">
                Terrenos
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      <div id="propiedades">
        <FeaturedProperties />
      </div>

      <WhyChooseUs />

      <ContactSection />

      <Footer />
    </>
  );
}