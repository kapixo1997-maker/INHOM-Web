"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import {
  Home,
  Hammer,
  Ruler,
  FileText,
} from "lucide-react";

export default function AboutSection() {
  return (
    <section id="nosotros" className="bg-white py-24">

      {/* Contenido principal */}
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">

        {/* Texto */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-semibold uppercase tracking-[0.3em] text-[#17495B]">
            Sobre Nosotros
          </span>

          <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
            Construimos confianza
            <br />
            además de patrimonio.
          </h2>

          <p className="mt-8 text-lg leading-8 text-gray-600">
            En INHOM reunimos experiencia en bienes raíces,
            diseño arquitectónico, construcción y gestión
            inmobiliaria para ofrecer soluciones integrales.
            Acompañamos a nuestros clientes desde la búsqueda
            de una propiedad hasta la materialización de su
            proyecto.
          </p>

          {/* Pilares */}
          <div className="mt-10 grid grid-cols-2 gap-6">

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#17495B]/10">
                <Home
                  size={26}
                  className="text-[#17495B]"
                />
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">
                  Bienes Raíces
                </h4>

                <p className="text-sm text-gray-500">
                  Compra • Venta • Renta
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#17495B]/10">
                <Hammer
                  size={26}
                  className="text-[#17495B]"
                />
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">
                  Construcción
                </h4>

                <p className="text-sm text-gray-500">
                  Proyectos de calidad
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#17495B]/10">
                <Ruler
                  size={26}
                  className="text-[#17495B]"
                />
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">
                  Arquitectura
                </h4>

                <p className="text-sm text-gray-500">
                  Diseño personalizado
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#17495B]/10">
                <FileText
                  size={26}
                  className="text-[#17495B]"
                />
              </div>

              <div>
                <h4 className="font-semibold text-gray-900">
                  Tramitología
                </h4>

                <p className="text-sm text-gray-500">
                  Gestión integral
                </p>
              </div>
            </div>

          </div>

          {/* Botón */}
          <Link
            href="/nosotros"
            className="mt-10 inline-flex rounded-xl bg-[#17495B] px-8 py-4 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-[#123847]"
          >
            Conócenos
          </Link>

        </motion.div>

        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/inhom.jpg"
              alt="INHOM"
              width={900}
              height={700}
              className="h-[500px] w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-8 -left-8 rounded-2xl bg-[#17495B] p-8 text-white shadow-xl">
            <h3 className="text-4xl font-black">
              +10
            </h3>

            <p className="mt-2">
              Años creando patrimonio
            </p>
          </div>
        </motion.div>

      </div>

      {/* Estadísticas */}
      <div className="mx-auto mt-24 grid max-w-7xl gap-8 px-6 md:grid-cols-4">

        {[
          ["250+", "Propiedades"],
          ["100+", "Clientes"],
          ["50+", "Proyectos"],
          ["100%", "Compromiso"],
        ].map(([numero, texto]) => (

          <motion.div
            key={texto}
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm transition"
          >
            <h3 className="text-5xl font-black text-[#17495B]">
              {numero}
            </h3>

            <p className="mt-4 text-gray-600">
              {texto}
            </p>
          </motion.div>

        ))}

      </div>

    </section>
  );
}