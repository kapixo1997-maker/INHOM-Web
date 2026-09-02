"use client";

import { motion } from "framer-motion";
import {
  FileText,
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  SearchCheck,
  FolderCheck,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const pasos = [
  {
    numero: "01",
    icon: SearchCheck,
    titulo: "Analizamos",
    descripcion:
      "Conocemos tu situación y revisamos qué documentos, trámites o gestiones son necesarios para avanzar.",
  },
  {
    numero: "02",
    icon: ClipboardList,
    titulo: "Preparamos",
    descripcion:
      "Organizamos la documentación y definimos los pasos necesarios para llevar el proceso de manera ordenada.",
  },
  {
    numero: "03",
    icon: FolderCheck,
    titulo: "Gestionamos",
    descripcion:
      "Damos seguimiento a las gestiones correspondientes y mantenemos comunicación durante el proceso.",
  },
  {
    numero: "04",
    icon: CheckCircle2,
    titulo: "Damos seguimiento",
    descripcion:
      "Te mantenemos informado sobre el avance hasta concluir las gestiones correspondientes.",
  },
];

const servicios = [
  "Gestión de documentos",
  "Trámites inmobiliarios",
  "Seguimiento de procesos",
  "Organización documental",
  "Orientación personalizada",
  "Acompañamiento durante el proceso",
];

export default function GestionTramitologiaPage() {
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
              <FileText size={32} />
            </div>

            <p className="font-semibold uppercase tracking-[0.3em] text-white/70">
              SERVICIOS INHOM
            </p>

            <h1 className="mt-4 text-5xl font-black md:text-6xl">
              Gestión y Tramitología
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              Facilitamos la gestión y seguimiento de los procesos
              relacionados con tu propiedad o proyecto, ayudándote a
              mantener cada etapa organizada y clara.
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
                GESTIÓN INTEGRAL
              </span>

              <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
                Menos complicaciones.
                <br />
                Más orden en tu proceso.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Sabemos que una operación inmobiliaria puede involucrar
                diferentes documentos, gestiones y etapas. Por eso,
                nuestro objetivo es ayudarte a mantener el proceso
                organizado y darte seguimiento durante su desarrollo.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Te orientamos sobre los pasos correspondientes y
                mantenemos comunicación contigo para que tengas mayor
                claridad sobre el avance de tu gestión.
              </p>
            </motion.div>

            {/* LISTA */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl bg-white p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-[#17495B]">
                ¿En qué podemos ayudarte?
              </h3>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {servicios.map((servicio) => (
                  <div
                    key={servicio}
                    className="flex items-start gap-3 rounded-xl bg-gray-50 p-4"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-[#17495B]"
                    />

                    <span className="text-gray-700">
                      {servicio}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* PROCESO */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="text-center">
            <span className="font-semibold uppercase tracking-[0.25em] text-[#17495B]">
              NUESTRO PROCESO
            </span>

            <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
              Así trabajamos contigo
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
              Organizamos cada etapa para que tengas mayor claridad
              sobre el proceso y puedas avanzar con confianza.
            </p>
          </div>

          <div className="relative mt-16 grid gap-8 md:grid-cols-4">

            {/* Línea */}
            <div className="absolute left-[12%] right-[12%] top-10 hidden h-px bg-[#17495B]/20 md:block" />

            {pasos.map((paso) => {
              const Icon = paso.icon;

              return (
                <motion.div
                  key={paso.numero}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -6 }}
                  className="relative z-10 text-center"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#17495B] text-white shadow-lg">
                    <Icon size={30} />
                  </div>

                  <span className="mt-5 block text-sm font-bold tracking-[0.2em] text-[#17495B]">
                    {paso.numero}
                  </span>

                  <h3 className="mt-2 text-xl font-bold text-gray-900">
                    {paso.titulo}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-600">
                    {paso.descripcion}
                  </p>
                </motion.div>
              );
            })}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#17495B] py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="text-4xl font-black md:text-5xl">
            ¿Necesitas ayuda con una gestión?
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/80">
            Cuéntanos qué necesitas y te orientaremos sobre los
            pasos que corresponden a tu proceso.
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