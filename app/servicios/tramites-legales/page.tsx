"use client";

import { motion } from "framer-motion";
import {
  Scale,
  MessageCircle,
  ArrowLeft,
  FileCheck,
  ShieldCheck,
  ClipboardCheck,
} from "lucide-react";
import Link from "next/link";

export default function TramitesLegalesPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#17495B] py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.12),_transparent_40%)]" />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">

          {/* VOLVER */}
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

            {/* ICONO */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <Scale size={32} />
            </div>

            <p className="font-semibold uppercase tracking-[0.3em] text-white/70">
              SERVICIOS INHOM
            </p>

            <h1 className="mt-4 text-5xl font-black md:text-6xl">
              Trámites Legales Inmobiliarios
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/80 md:text-xl">
              Te acompañamos en la gestión y seguimiento de los procesos
              legales relacionados con tus operaciones inmobiliarias,
              buscando que cada etapa sea clara y ordenada.
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
                SEGURIDAD Y CONFIANZA
              </span>

              <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
                Una operación inmobiliaria
                <br />
                debe hacerse con claridad.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Comprar, vender o realizar cualquier operación sobre una
                propiedad implica revisar documentos y cumplir diferentes
                procesos. En INHOM te orientamos y damos seguimiento para
                que conozcas cada etapa de tu operación.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Nuestro objetivo es ayudarte a llevar el proceso de manera
                organizada, con información clara y el acompañamiento
                adecuado.
              </p>

            </motion.div>

            {/* TARJETA */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl bg-white p-8 shadow-xl"
            >

              <h3 className="text-2xl font-bold text-[#17495B]">
                Podemos ayudarte con:
              </h3>

              <div className="mt-8 space-y-6">

                {/* REVISION */}
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#17495B]/10">
                    <FileCheck
                      size={22}
                      className="text-[#17495B]"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900">
                      Revisión documental
                    </h4>

                    <p className="mt-1 leading-6 text-gray-600">
                      Revisión y seguimiento de la documentación necesaria
                      para la operación.
                    </p>
                  </div>
                </div>

                {/* CONTRATOS */}
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#17495B]/10">
                    <ClipboardCheck
                      size={22}
                      className="text-[#17495B]"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900">
                      Contratos y documentación
                    </h4>

                    <p className="mt-1 leading-6 text-gray-600">
                      Orientación durante la preparación y revisión de
                      documentos relacionados con la operación.
                    </p>
                  </div>
                </div>

                {/* ESCRITURACION */}
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#17495B]/10">
                    <ShieldCheck
                      size={22}
                      className="text-[#17495B]"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900">
                      Escrituración
                    </h4>

                    <p className="mt-1 leading-6 text-gray-600">
                      Acompañamiento y seguimiento durante el proceso
                      correspondiente.
                    </p>
                  </div>
                </div>

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
              Te acompañamos paso a paso
            </h2>

          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            {/* PASO 1 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-gray-200 p-8 shadow-sm transition hover:shadow-lg"
            >
              <span className="text-5xl font-black text-[#17495B]/20">
                01
              </span>

              <h3 className="mt-4 text-2xl font-bold text-gray-900">
                Revisamos
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Analizamos tu situación y conocemos los documentos y
                procesos necesarios.
              </p>
            </motion.div>

            {/* PASO 2 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-gray-200 p-8 shadow-sm transition hover:shadow-lg"
            >
              <span className="text-5xl font-black text-[#17495B]/20">
                02
              </span>

              <h3 className="mt-4 text-2xl font-bold text-gray-900">
                Gestionamos
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Te orientamos durante la gestión y damos seguimiento
                a cada etapa.
              </p>
            </motion.div>

            {/* PASO 3 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="rounded-3xl border border-gray-200 p-8 shadow-sm transition hover:shadow-lg"
            >
              <span className="text-5xl font-black text-[#17495B]/20">
                03
              </span>

              <h3 className="mt-4 text-2xl font-bold text-gray-900">
                Acompañamos
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                Mantenemos comunicación contigo hasta concluir el
                proceso correspondiente.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#17495B] py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">

          <h2 className="text-4xl font-black md:text-5xl">
            ¿Necesitas orientación?
          </h2>

          <p className="mt-5 text-lg leading-8 text-white/80">
            Cuéntanos qué trámite necesitas realizar y nuestro equipo
            te orientará sobre el proceso.
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