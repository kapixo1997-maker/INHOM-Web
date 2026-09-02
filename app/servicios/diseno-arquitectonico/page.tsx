"use client";

import { motion } from "framer-motion";
import {
  PencilRuler,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  Ruler,
  Box,
  Eye,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const servicios = [
  {
    icon: PencilRuler,
    titulo: "Diseño arquitectónico",
    descripcion:
      "Desarrollamos propuestas de diseño pensadas para aprovechar los espacios y responder a las necesidades de cada proyecto.",
  },
  {
    icon: Ruler,
    titulo: "Planos",
    descripcion:
      "Representamos tu proyecto mediante planos que permiten visualizar y desarrollar cada espacio de manera ordenada.",
  },
  {
    icon: Box,
    titulo: "Renderizados 3D",
    descripcion:
      "Creamos representaciones tridimensionales para ayudarte a visualizar cómo puede verse tu proyecto antes de construirlo.",
  },
  {
    icon: Eye,
    titulo: "Propuestas de diseño",
    descripcion:
      "Exploramos diferentes alternativas de distribución, materiales y estilo para encontrar una propuesta adecuada a tu proyecto.",
  },
];

const proceso = [
  {
    numero: "01",
    titulo: "Idea",
    descripcion:
      "Conocemos tus necesidades, gustos y objetivos para entender qué quieres construir.",
  },
  {
    numero: "02",
    titulo: "Diseño",
    descripcion:
      "Desarrollamos una propuesta arquitectónica buscando funcionalidad y aprovechamiento del espacio.",
  },
  {
    numero: "03",
    titulo: "Planos",
    descripcion:
      "Convertimos la propuesta en documentación gráfica que permite comprender el proyecto.",
  },
  {
    numero: "04",
    titulo: "Visualización",
    descripcion:
      "Utilizamos herramientas de visualización para que puedas apreciar el resultado antes de construir.",
  },
  {
    numero: "05",
    titulo: "Proyecto",
    descripcion:
      "Integramos el trabajo desarrollado para avanzar hacia la materialización de tu proyecto.",
  },
];

export default function DisenoArquitectonicoPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#17495B] py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_40%)]" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">

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
              <PencilRuler size={32} />
            </div>

            <p className="font-semibold uppercase tracking-[0.3em] text-white/70">
              SERVICIOS INHOM
            </p>

            <h1 className="mt-4 text-5xl font-black md:text-6xl">
              Diseño Arquitectónico
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              Transformamos ideas en espacios funcionales mediante
              propuestas arquitectónicas pensadas para cada proyecto,
              necesidad y estilo de vida.
            </p>

          </motion.div>
        </div>
      </section>

      {/* INTRODUCCIÓN */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <span className="font-semibold uppercase tracking-[0.25em] text-[#17495B]">
                DISEÑO Y CREATIVIDAD
              </span>

              <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
                De una idea
                <br />
                a un espacio.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Cada proyecto comienza con una idea. Nuestro trabajo es
                convertir esa idea en una propuesta que combine
                funcionalidad, estética y las necesidades de quienes
                utilizarán el espacio.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Trabajamos desde las primeras propuestas hasta la
                representación del proyecto, buscando que puedas
                visualizar y comprender el resultado antes de llevarlo
                a la construcción.
              </p>

            </motion.div>

            {/* FRASE VISUAL */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-3xl bg-[#17495B] p-10 text-white shadow-2xl"
            >

              <Lightbulb
                size={70}
                strokeWidth={1.2}
                className="absolute -right-4 -top-4 text-white/10"
              />

              <p className="relative text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                INHOM ARQUITECTURA
              </p>

              <h3 className="relative mt-6 text-4xl font-black leading-tight">
                Diseñamos espacios
                <br />
                que tienen sentido.
              </h3>

              <p className="relative mt-6 max-w-md leading-7 text-white/75">
                Porque un buen diseño no solamente debe verse bien.
                También debe funcionar para las personas que lo
                habitarán.
              </p>

            </motion.div>

          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="text-center">

            <span className="font-semibold uppercase tracking-[0.25em] text-[#17495B]">
              ¿QUÉ INCLUYE?
            </span>

            <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
              Soluciones para tu proyecto
            </h2>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">

            {servicios.map((servicio, index) => {
              const Icon = servicio.icon;

              return (
                <motion.div
                  key={servicio.titulo}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl border border-gray-200 bg-gray-50 p-8 transition hover:border-[#17495B] hover:shadow-xl"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#17495B] text-white">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-gray-900">
                    {servicio.titulo}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {servicio.descripcion}
                  </p>

                  <div className="mt-6 flex items-center gap-2 font-semibold text-[#17495B]">
                    <CheckCircle2 size={18} />
                    Servicio personalizado
                  </div>

                </motion.div>
              );
            })}

          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="text-center">

            <span className="font-semibold uppercase tracking-[0.25em] text-[#17495B]">
              NUESTRO PROCESO
            </span>

            <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
              De la idea al proyecto
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Desarrollamos cada etapa de manera ordenada para que
              puedas visualizar cómo evoluciona tu proyecto.
            </p>

          </div>

          <div className="relative mt-16">

            {/* Línea */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#17495B]/20 md:block" />

            <div className="space-y-12">

              {proceso.map((paso, index) => (
                <motion.div
                  key={paso.numero}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -30 : 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex ${
                    index % 2 === 0
                      ? "md:justify-start"
                      : "md:justify-end"
                  }`}
                >

                  <div className="w-full md:w-[45%]">

                    <div className="rounded-3xl bg-white p-8 shadow-sm transition hover:shadow-xl">

                      <span className="text-5xl font-black text-[#17495B]/20">
                        {paso.numero}
                      </span>

                      <h3 className="mt-4 text-2xl font-bold text-gray-900">
                        {paso.titulo}
                      </h3>

                      <p className="mt-4 leading-7 text-gray-600">
                        {paso.descripcion}
                      </p>

                    </div>

                  </div>

                </motion.div>
              ))}

            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#17495B] py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="text-4xl font-black md:text-5xl">
            ¿Tienes una idea en mente?
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/80">
            Cuéntanos qué tienes en mente y descubre cómo podemos
            ayudarte a convertirlo en un proyecto.
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