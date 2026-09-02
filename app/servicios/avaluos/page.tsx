"use client";

import { motion } from "framer-motion";
import {
  BadgeDollarSign,
  ArrowLeft,
  MapPin,
  Home,
  Ruler,
  BarChart3,
  FileSearch,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const factores = [
  {
    icon: MapPin,
    titulo: "Ubicación",
    descripcion:
      "Consideramos la ubicación del inmueble, su entorno y las características de la zona.",
  },
  {
    icon: Home,
    titulo: "Características del inmueble",
    descripcion:
      "Analizamos el tipo de propiedad, distribución, estado y características que pueden influir en su valor.",
  },
  {
    icon: Ruler,
    titulo: "Superficie",
    descripcion:
      "Tomamos en cuenta las dimensiones del terreno y, cuando corresponde, de la construcción.",
  },
  {
    icon: BarChart3,
    titulo: "Mercado",
    descripcion:
      "Consideramos las condiciones y referencias del mercado inmobiliario de la zona.",
  },
];

const proceso = [
  {
    numero: "01",
    titulo: "Conocemos la propiedad",
    descripcion:
      "Recopilamos la información necesaria para conocer las características principales del inmueble.",
  },
  {
    numero: "02",
    titulo: "Analizamos",
    descripcion:
      "Revisamos diferentes factores que pueden influir en el valor de la propiedad.",
  },
  {
    numero: "03",
    titulo: "Comparamos",
    descripcion:
      "Consideramos referencias y condiciones del mercado para obtener una perspectiva más completa.",
  },
  {
    numero: "04",
    titulo: "Te orientamos",
    descripcion:
      "Presentamos la información obtenida para ayudarte a tomar una decisión sobre tu propiedad.",
  },
];

export default function AvaluosPage() {
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
              <BadgeDollarSign size={32} />
            </div>

            <p className="font-semibold uppercase tracking-[0.3em] text-white/70">
              SERVICIOS INHOM
            </p>

            <h1 className="mt-4 text-5xl font-black md:text-6xl">
              Avalúos y Opinión de Valor
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              Conoce mejor el valor de tu propiedad mediante un análisis
              de sus características y de las condiciones del mercado
              inmobiliario.
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
                VALOR INMOBILIARIO
              </span>

              <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
                ¿Cuánto vale
                <br />
                realmente tu propiedad?
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Conocer el valor de una propiedad puede ser importante
                antes de vender, comprar, invertir o tomar decisiones
                relacionadas con un inmueble.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                En INHOM analizamos diferentes características del
                inmueble y factores del mercado para ofrecerte una
                referencia que te ayude a comprender mejor su valor.
              </p>

            </motion.div>

            {/* TARJETA */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-3xl bg-[#17495B] p-10 text-white shadow-2xl"
            >

              <BadgeDollarSign
                size={120}
                strokeWidth={1}
                className="absolute -right-8 -top-8 text-white/10"
              />

              <p className="relative text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                INHOM VALORACIÓN
              </p>

              <h3 className="relative mt-6 text-4xl font-black leading-tight">
                Información para
                <br />
                tomar mejores decisiones.
              </h3>

              <p className="relative mt-6 max-w-md leading-7 text-white/75">
                Una referencia de valor puede ayudarte a conocer mejor
                tu propiedad y tener una base para analizar diferentes
                alternativas.
              </p>

            </motion.div>

          </div>
        </div>
      </section>

      {/* FACTORES */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="text-center">

            <span className="font-semibold uppercase tracking-[0.25em] text-[#17495B]">
              ¿QUÉ CONSIDERAMOS?
            </span>

            <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
              Factores que influyen en el valor
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              El valor de una propiedad depende de diferentes
              características. Por eso analizamos el inmueble desde
              distintos puntos de vista.
            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">

            {factores.map((factor, index) => {
              const Icon = factor.icon;

              return (
                <motion.div
                  key={factor.titulo}
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
                    {factor.titulo}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {factor.descripcion}
                  </p>

                  <div className="mt-6 flex items-center gap-2 font-semibold text-[#17495B]">
                    <CheckCircle2 size={18} />
                    Análisis personalizado
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
              Conoce el proceso
            </h2>

          </div>

          <div className="relative mt-16">

            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#17495B]/20 md:block" />

            <div className="space-y-10">

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
            ¿Quieres conocer el valor de tu propiedad?
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/80">
            Cuéntanos sobre tu inmueble y te orientaremos sobre el
            proceso de valoración.
          </p>

          <a
            href="https://wa.me/529831543460"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-8 py-4 font-bold text-white transition hover:scale-105"
          >
            <MessageCircle size={22} />
            Solicitar información
          </a>

        </div>
      </section>

    </main>
  );
}