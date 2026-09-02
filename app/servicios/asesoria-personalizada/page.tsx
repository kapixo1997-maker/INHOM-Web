"use client";

import { motion } from "framer-motion";
import {
  UserRound,
  ArrowLeft,
  Home,
  KeyRound,
  Hammer,
  PencilRuler,
  TrendingUp,
  FileText,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const necesidades = [
  {
    icon: Home,
    titulo: "Quiero comprar",
    descripcion:
      "Te ayudamos a identificar propiedades de acuerdo con tus necesidades, presupuesto y objetivos.",
  },
  {
    icon: KeyRound,
    titulo: "Quiero vender o rentar",
    descripcion:
      "Te orientamos durante el proceso de comercialización de tu propiedad.",
  },
  {
    icon: Hammer,
    titulo: "Quiero construir",
    descripcion:
      "Te ayudamos a conocer las opciones disponibles para desarrollar tu proyecto.",
  },
  {
    icon: PencilRuler,
    titulo: "Quiero diseñar",
    descripcion:
      "Podemos orientarte sobre las alternativas de diseño arquitectónico para tu proyecto.",
  },
  {
    icon: TrendingUp,
    titulo: "Quiero invertir",
    descripcion:
      "Analizamos contigo las características de las oportunidades inmobiliarias que estás considerando.",
  },
  {
    icon: FileText,
    titulo: "Necesito realizar un trámite",
    descripcion:
      "Te orientamos sobre los procesos y gestiones relacionados con tu propiedad.",
  },
];

const pasos = [
  {
    numero: "01",
    titulo: "Cuéntanos qué necesitas",
    descripcion:
      "Explícanos qué estás buscando, qué quieres realizar o cuál es tu situación.",
  },
  {
    numero: "02",
    titulo: "Analizamos tu situación",
    descripcion:
      "Conocemos tus necesidades y buscamos identificar la mejor manera de ayudarte.",
  },
  {
    numero: "03",
    titulo: "Te orientamos",
    descripcion:
      "Te presentamos las opciones y el camino que puede seguir tu proyecto.",
  },
  {
    numero: "04",
    titulo: "Te acompañamos",
    descripcion:
      "Una vez definido el siguiente paso, seguimos contigo durante el proceso.",
  },
];

export default function AsesoriaPersonalizadaPage() {
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
              <UserRound size={32} />
            </div>

            <p className="font-semibold uppercase tracking-[0.3em] text-white/70">
              SERVICIOS INHOM
            </p>

            <h1 className="mt-4 text-5xl font-black md:text-6xl">
              Asesoría Personalizada
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              No tienes que saber por dónde empezar. Cuéntanos qué
              necesitas y te orientamos para encontrar el camino adecuado
              para tu proyecto inmobiliario.
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
                ESTAMOS PARA AYUDARTE
              </span>

              <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
                No necesitas tener
                <br />
                todo resuelto.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Sabemos que cada persona llega con una necesidad diferente.
                Algunos buscan comprar una propiedad, otros quieren vender,
                construir, invertir o simplemente necesitan orientación
                para saber cuál es el siguiente paso.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                En INHOM escuchamos tu situación y te orientamos de acuerdo
                con tus necesidades, buscando que puedas tomar decisiones
                con mayor claridad.
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

              <UserRound
                size={120}
                strokeWidth={1}
                className="absolute -right-8 -top-8 text-white/10"
              />

              <p className="relative text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                ASESORÍA INHOM
              </p>

              <h3 className="relative mt-6 text-4xl font-black leading-tight">
                Tu proyecto.
                <br />
                Tus necesidades.
                <br />
                Nuestro acompañamiento.
              </h3>

              <p className="relative mt-6 max-w-md leading-7 text-white/75">
                Queremos entender lo que buscas antes de decirte cuál puede
                ser el siguiente paso.
              </p>

            </motion.div>

          </div>
        </div>
      </section>

      {/* NECESIDADES */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="text-center">

            <span className="font-semibold uppercase tracking-[0.25em] text-[#17495B]">
              ¿QUÉ NECESITAS?
            </span>

            <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
              Podemos orientarte
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Cuéntanos cuál de estas situaciones se parece más a lo que
              estás buscando.
            </p>

          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {necesidades.map((necesidad, index) => {
              const Icon = necesidad.icon;

              return (
                <motion.div
                  key={necesidad.titulo}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                  }}
                  whileHover={{ y: -6 }}
                  className="rounded-3xl border border-gray-200 bg-gray-50 p-7 transition hover:border-[#17495B] hover:shadow-xl"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#17495B] text-white">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {necesidad.titulo}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {necesidad.descripcion}
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
              ASÍ COMENZAMOS
            </span>

            <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
              Primero te escuchamos
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Nuestro acompañamiento comienza entendiendo exactamente
              qué necesitas.
            </p>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-4">

            {pasos.map((paso, index) => (
              <motion.div
                key={paso.numero}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="relative rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >

                <span className="text-5xl font-black text-[#17495B]/20">
                  {paso.numero}
                </span>

                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  {paso.titulo}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {paso.descripcion}
                </p>

              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#17495B] py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
            <MessageCircle size={30} />
          </div>

          <h2 className="mt-6 text-4xl font-black md:text-5xl">
            ¿No sabes por dónde empezar?
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/80">
            Escríbenos. Cuéntanos qué necesitas y nuestro equipo te
            ayudará a identificar el siguiente paso.
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