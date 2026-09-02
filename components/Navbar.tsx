"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";

const menu = [
  { name: "Inicio", href: "/" },
  { name: "Nosotros", href: "/nosotros" },
  { name: "Servicios", href: "/servicios" },
  { name: "Propiedades", href: "/propiedades" },
 { name: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* LOGO */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/logo/inhom-logo.png"
            alt="INHOM Bienes Raíces"
            width={180}
            height={60}
            priority
          />
        </Link>

        {/* MENÚ ESCRITORIO */}
        <nav className="hidden items-center gap-10 lg:flex">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative text-[16px] font-medium text-gray-700 transition-colors duration-300 hover:text-[#17495B]"
            >
              {item.name}

              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#17495B] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* LADO DERECHO */}
        <div className="flex items-center gap-4">

          {/* WHATSAPP */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="https://wa.me/529831543460"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#20BE5C] lg:flex"
          >
            <MessageCircle size={20} />
            Hablar con un asesor
          </motion.a>

          {/* BOTÓN MÓVIL */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="rounded-xl p-2 transition hover:bg-gray-100 lg:hidden"
          >
            {open ? <X size={30} /> : <Menu size={30} />}
          </button>

          {/* MENÚ MÓVIL */}
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 top-full w-full border-t border-gray-200 bg-white shadow-xl lg:hidden"
            >
              <nav className="flex flex-col px-6 py-6">

                {menu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-4 text-lg font-medium text-gray-700 transition hover:bg-[#17495B]/10 hover:text-[#17495B]"
                  >
                    {item.name}
                  </Link>
                ))}

                {/* WHATSAPP MÓVIL */}
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://wa.me/529831543460"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 font-semibold text-white shadow-md"
                >
                  <MessageCircle size={22} />
                  Hablar con un asesor
                </motion.a>

              </nav>
            </motion.div>
          )}

        </div>
      </div>
    </header>
  );
}