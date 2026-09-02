"use client";

import { motion } from "framer-motion";
import {
  Home,
  Check,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function BienesRaicesPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="bg-[#17495B] py-24 text-white">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <Link
            href="/servicios"
            className="mb-10 inline-flex items-center gap-2 text-white/80 transition hover:text-white"
          >
            <ArrowLeft size={20} />
            Volver a servicios
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <Home size={32} />
            </div>

            <p className="font-semibold uppercase tracking-[0.3em] text-white/70">
              SERVICIOS INHOM
            </p>

            <h1 className="mt-4 text-5xl font-black md:text-6xl">
              Compra, Venta y Renta
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80">
              Te acompañamos durante todo el proceso inmobiliario,
              ayudándote a encontrar, vender o rentar una propiedad
              de manera clara, segura y profesional.
            </p>
          </motion.div>

        </div>
      </section>

      {/* CONTENIDO */}
      <section className="py-24">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:px-8">

          {/* TEXTO */}
          <div>
            <span className="font-semibold uppercase tracking-[0.25em] text-[#17495B]">
              ¿Qué hacemos?
            </span>

            <h2 className="mt-4 text-4xl font-black text-gray-900">
              Tu operación inmobiliaria,
              <br />
              acompañada de principio a fin.
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              En INHOM entendemos que comprar, vender o rentar
              una propiedad es una decisión importante. Por eso
              ofrecemos acompañamiento personalizado durante
              cada etapa del proceso.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Nuestro objetivo es facilitar la operación y ayudarte
              a tomar decisiones con mayor seguridad y confianza.
            </p>
          </div>

          {/* BENEFICIOS */}
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-[#17495B]">
              Nuestro servicio incluye
            </h3>

            <div className="mt-8 space-y-5">

              {[
                "Compra de propiedades",
                "Venta de inmuebles",
                "Renta de propiedades",
                "Comercialización",
                "Asesoría personalizada",
                "Acompañamiento durante el proceso",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#17495B]/10">
                    <Check
                      size={18}
                      className="text-[#17495B]"
                    />
                  </div>

                  <span className="text-gray-700">
                    {item}
                  </span>
                </div>
              ))}

            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#17495B] py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="text-4xl font-black md:text-5xl">
            ¿Buscas comprar, vender o rentar?
          </h2>

          <p className="mt-5 text-lg text-white/80">
            Habla con nuestro equipo y recibe asesoría
            personalizada para tu operación inmobiliaria.
          </p>

          <a
            href="https://wa.me/529831543460"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-8 py-4 font-bold text-white transition hover:scale-105"
          >
            <MessageCircle size={22} />
            Hablar con un asesor
          </a>

        </div>
      </section>

    </main>
  );
}