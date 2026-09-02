"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  ArrowLeft,
  Search,
  MapPin,
  BarChart3,
  Lightbulb,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const factores = [
  {
    icon: Search,
    titulo: "Análisis de propiedades",
    descripcion:
      "Evaluamos las características de una propiedad para ayudarte a conocer mejor la oportunidad que estás considerando.",
  },
  {
    icon: MapPin,
    titulo: "Ubicación",
    descripcion:
      "Analizamos la zona, su entorno y los factores que pueden influir en el potencial de una propiedad.",
  },
  {
    icon: BarChart3,
    titulo: "Potencial de inversión",
    descripcion:
      "Consideramos diferentes aspectos del inmueble para ayudarte a tomar una decisión con mayor información.",
  },
  {
    icon: Lightbulb,
    titulo: "Planeación",
    descripcion:
      "Te orientamos para definir una estrategia de acuerdo con tus objetivos y las características de la oportunidad.",
  },
];

const proceso = [
  {
    numero: "01",
    titulo: "Conocemos tus objetivos",
    descripcion:
      "Primero entendemos qué buscas y qué tipo de inversión tienes en mente.",
  },
  {
    numero: "02",
    titulo: "Analizamos oportunidades",
    descripcion:
      "Revisamos propiedades y factores relevantes de acuerdo con tus objetivos.",
  },
  {
    numero: "03",
    titulo: "Evaluamos alternativas",
    descripcion:
      "Comparamos las opciones disponibles para que puedas conocer mejor sus características.",
  },
  {
    numero: "04",
    titulo: "Tomamos una decisión",
    descripcion:
      "Con la información reunida, te orientamos para que puedas tomar una decisión más informada.",
  },
];

export default function InversionesPage() {
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
              <TrendingUp size={32} />
            </div>

            <p className="font-semibold uppercase tracking-[0.3em] text-white/70">
              SERVICIOS INHOM
            </p>

            <h1 className="mt-4 text-5xl font-black md:text-6xl">
              Asesoría para Inversiones
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              Te ayudamos a analizar oportunidades inmobiliarias para que
              puedas tomar decisiones de inversión con mayor información
              y claridad.
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
                INVERSIÓN INMOBILIARIA
              </span>

              <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
                No se trata solamente
                <br />
                de comprar una propiedad.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Una inversión inmobiliaria comienza mucho antes de
                realizar una compra. Es importante conocer la propiedad,
                su ubicación, sus características y los objetivos que
                buscas alcanzar.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                En INHOM te ayudamos a analizar diferentes aspectos de
                una oportunidad inmobiliaria para que puedas tomar
                decisiones con mayor claridad.
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

              <TrendingUp
                size={120}
                strokeWidth={1}
                className="absolute -right-8 -top-8 text-white/10"
              />

              <p className="relative text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                INHOM INVERSIONES
              </p>

              <h3 className="relative mt-6 text-4xl font-black leading-tight">
                Encuentra oportunidades.
                <br />
                Analiza antes de decidir.
              </h3>

              <p className="relative mt-6 max-w-md leading-7 text-white/75">
                Nuestro objetivo es brindarte información y orientación
                para que conozcas mejor las oportunidades que estás
                considerando.
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
              ¿QUÉ ANALIZAMOS?
            </span>

            <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
              Una visión más completa
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Cada oportunidad tiene características diferentes.
              Por eso consideramos distintos factores antes de tomar
              una decisión.
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
              Invierte con mayor claridad
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

      {/* CONFIANZA */}
      <section className="bg-white py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#17495B]/10">
            <ShieldCheck
              size={30}
              className="text-[#17495B]"
            />
          </div>

          <h2 className="text-3xl font-black text-gray-900 md:text-4xl">
            Información antes de tomar decisiones.
          </h2>

          <p className="max-w-2xl text-lg leading-8 text-gray-600">
            Nuestro acompañamiento busca ayudarte a conocer mejor una
            oportunidad inmobiliaria y entender sus características
            antes de avanzar.
          </p>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#17495B] py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="text-4xl font-black md:text-5xl">
            ¿Estás pensando en invertir?
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/80">
            Cuéntanos qué tipo de oportunidad estás buscando y
            conversemos sobre tus objetivos.
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