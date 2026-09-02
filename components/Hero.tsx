"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const slides = [
  {
    image: "/images/hero/hero-1.jpg",
    title: "Construimos",
    highlight: "tu patrimonio.",
    description:
      "Compra, vende o construye con el respaldo de un equipo que te acompaña en cada etapa de tu proyecto.",
  },
  {
    image: "/images/hero/hero-2.jpg",
    title: "Espacios",
    highlight: "para vivir mejor.",
    description:
      "Diseñamos hogares modernos que combinan comodidad, funcionalidad y estilo.",
  },
  {
    image: "/images/hero/hero-3.jpg",
    title: "Cada detalle",
    highlight: "cuenta.",
    description:
      "La calidad en el diseño y la construcción hacen la diferencia en cada proyecto.",
  },
  {
    image: "/images/hero/hero-4.jpg",
    title: "Tu próximo hogar",
    highlight: "comienza aquí.",
    description:
      "Encuentra la propiedad ideal o desarrolla el proyecto que siempre imaginaste.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex h-[80vh] items-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt="INHOM"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-8 pt-10 lg:pt-16">
                <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            

            <h1 className="text-5xl font-extrabold leading-[0.95] text-white md:text-6xl lg:text-7xl">
              {slides[current].title}

              <br />

              <span
                style={{
                  background:
                    "linear-gradient(90deg,#ffffff 0%,#ffffff 18%,#BFE5DB 45%,#5E8F86 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {slides[current].highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200 md:text-xl">
              {slides[current].description}
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
  <Link
    href="/propiedades"
    className="rounded-xl bg-[#17495B] px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-[#123847]"
  >
    Ver propiedades
  </Link>

              <a
  href="https://wa.me/5219831543460?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20una%20propiedad%20de%20INHOM."
  target="_blank"
  rel="noopener noreferrer"
  className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition duration-300 hover:bg-white hover:text-black"
>
  Hablar con un asesor
</a>
            </div>

            <div className="mt-12 flex items-center gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-3 rounded-full transition-all duration-500 ${
                    current === index
                      ? "w-10 bg-white"
                      : "w-3 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
                      </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
} 