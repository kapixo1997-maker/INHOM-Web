"use client";

import { motion } from "framer-motion";
import {
  Hammer,
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  Ruler,
  HardHat,
  Building2,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const servicios = [
  {
    icon: Building2,
    titulo: "Construcción residencial",
    descripcion:
      "Desarrollamos proyectos habitacionales buscando funcionalidad, calidad y una correcta ejecución de cada etapa.",
  },
  {
    icon: Hammer,
    titulo: "Obra nueva",
    descripcion:
      "Llevamos un proyecto desde su planeación hasta su ejecución, coordinando las diferentes etapas de construcción.",
  },
  {
    icon: Ruler,
    titulo: "Remodelaciones",
    descripcion:
      "Transformamos y renovamos espacios existentes para adaptarlos a nuevas necesidades y estilos.",
  },
  {
    icon: HardHat,
    titulo: "Supervisión de obra",
    descripcion:
      "Damos seguimiento al desarrollo de los trabajos para mantener una correcta coordinación durante la ejecución.",
  },
];

const proceso = [
  {
    numero: "01",
    titulo: "Planeación",
    descripcion:
      "Definimos las necesidades, alcances y características generales del proyecto.",
  },
  {
    numero: "02",
    titulo: "Diseño y presupuesto",
    descripcion:
      "Integramos la propuesta de diseño y estimamos los recursos necesarios para llevarla a cabo.",
  },
  {
    numero: "03",
    titulo: "Ejecución",
    descripcion:
      "Comenzamos los trabajos de construcción siguiendo la planeación establecida.",
  },
  {
    numero: "04",
    titulo: "Supervisión",
    descripcion:
      "Damos seguimiento al avance de la obra y a las diferentes etapas del proyecto.",
  },
  {
    numero: "05",
    titulo: "Entrega",
    descripcion:
      "Concluimos el proyecto y revisamos los trabajos realizados antes de su entrega.",
  },
];

export default function ConstruccionPage() {
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
              <Hammer size={32} />
            </div>

            <p className="font-semibold uppercase tracking-[0.3em] text-white/70">
              SERVICIOS INHOM
            </p>

            <h1 className="mt-4 text-5xl font-black md:text-6xl">
              Construcción
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              Convertimos proyectos en espacios reales mediante una
              ejecución organizada, acompañamiento y seguimiento durante
              las diferentes etapas de construcción.
            </p>

          </motion.div>
        </div>
      </section>

      {/* INTRODUCCIÓN */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            {/* TEXTO */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <span className="font-semibold uppercase tracking-[0.25em] text-[#17495B]">
                CONSTRUCCIÓN INHOM
              </span>

              <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
                De la idea
                <br />
                a la realidad.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Construir un espacio requiere planeación, coordinación y
                seguimiento. En INHOM buscamos acompañarte durante las
                diferentes etapas de tu proyecto para que tengas mayor
                claridad sobre su desarrollo.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Desde una obra nueva hasta la transformación de un espacio
                existente, trabajamos de acuerdo con las características y
                necesidades de cada proyecto.
              </p>

            </motion.div>

            {/* TARJETA DESTACADA */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-3xl bg-[#17495B] p-10 text-white shadow-2xl"
            >

              <Hammer
                size={110}
                strokeWidth={1}
                className="absolute -right-6 -top-6 text-white/10"
              />

              <p className="relative text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                INHOM CONSTRUCCIÓN
              </p>

              <h3 className="relative mt-6 text-4xl font-black leading-tight">
                Construimos
                <br />
                pensando en el futuro.
              </h3>

              <p className="relative mt-6 max-w-md leading-7 text-white/75">
                Cada proyecto representa una oportunidad para crear espacios
                funcionales, duraderos y pensados para quienes los utilizarán.
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
              ¿QUÉ HACEMOS?
            </span>

            <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
              Soluciones de construcción
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Adaptamos nuestro trabajo a las características y objetivos
              de cada proyecto.
            </p>

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
                    Atención personalizada
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
              Así llevamos tu proyecto
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Organizamos las principales etapas para mantener una visión
              clara del desarrollo de la obra.
            </p>

          </div>

          <div className="relative mt-16">

            {/* Línea central */}
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
            ¿Tienes un proyecto de construcción?
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/80">
            Cuéntanos qué tienes en mente y hablemos sobre las
            características de tu proyecto.
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