"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-sm"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-4xl font-black tracking-tight text-[#17495B] transition hover:scale-105"
        >
          INHOM
        </Link>

        {/* Menú */}
        <nav className="hidden items-center gap-10 md:flex">

          <a
            href="#inicio"
            className="relative font-medium text-gray-700 transition hover:text-[#17495B] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#17495B] after:transition-all hover:after:w-full"
          >
            Inicio
          </a>

          <a
            href="#propiedades"
            className="relative font-medium text-gray-700 transition hover:text-[#17495B] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#17495B] after:transition-all hover:after:w-full"
          >
            Propiedades
          </a>

          <a
            href="#contacto"
            className="relative font-medium text-gray-700 transition hover:text-[#17495B] after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-[#17495B] after:transition-all hover:after:w-full"
          >
            Contacto
          </a>

        </nav>

        {/* Botón WhatsApp */}
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          href="https://wa.me/529831543460"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-green-700"
        >
          WhatsApp
        </motion.a>

      </div>
    </motion.header>
  );
}