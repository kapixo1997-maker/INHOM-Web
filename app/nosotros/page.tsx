"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Home,
  Hammer,
  Ruler,
  FileText,
  MessageCircle,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NosotrosPage() {
  return (
    <>
      <Navbar />

      <main className="bg-white">

        {/* HERO */}
        <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#17495B]">

          <div className="absolute inset-0">
            <Image
              src="/inhom.jpg"
              alt="INHOM"
              fill
              priority
              className="object-cover opacity-30"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-[#17495B] via-[#17495B]/90 to-[#17495B]/40" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >

              <span className="font-semibold uppercase tracking-[0.3em] text-[#BFE5DB]">
                Sobre INHOM
              </span>

              <h1 className="mt-6 text-5xl font-black leading-tight text-white md:text-7xl">
                Construimos confianza.
                <br />
                <span className="text-[#BFE5DB]">
                  Creamos patrimonio.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
                Somos una empresa enfocada en bienes raíces, arquitectura,
                construcción y gestión inmobiliaria, creando soluciones
                integrales para cada proyecto.
              </p>

            </motion.div>

          </div>
        </section>

        {/* QUIÉNES SOMOS */}
        <section className="py-24">

          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >

              <span className="font-semibold uppercase tracking-[0.3em] text-[#17495B]">
                Quiénes somos
              </span>

              <h2 className="mt-4 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
                Más que una inmobiliaria.
              </h2>

              <p className="mt-8 text-lg leading-8 text-gray-600">
                En INHOM entendemos que cada propiedad representa una
                decisión importante y que cada proyecto necesita algo más
                que una simple transacción.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Por eso reunimos diferentes áreas de trabajo para
                acompañar a nuestros clientes desde la idea inicial
                hasta la materialización de su proyecto.
              </p>

              <p className="mt-5 text-lg leading-8 text-gray-600">
                Nuestro objetivo es ofrecer soluciones claras,
                profesionales y personalizadas en cada etapa.
              </p>

            </motion.div>

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
                  alt="Equipo y proyectos INHOM"
                  width={900}
                  height={700}
                  className="h-[500px] w-full object-cover"
                />
              </div>

            </motion.div>

          </div>
        </section>

        {/* ÁREAS */}
        <section className="bg-gray-50 py-24">

          <div className="mx-auto max-w-7xl px-6 lg:px-8">

            <div className="mx-auto max-w-3xl text-center">

              <span className="font-semibold uppercase tracking-[0.3em] text-[#17495B]">
                Lo que hacemos
              </span>

              <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
                Soluciones para cada etapa.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Integramos diferentes áreas para ofrecer una experiencia
                completa y acompañar cada proyecto de principio a fin.
              </p>

            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              {[
                {
                  icon: Home,
                  title: "Bienes Raíces",
                  text: "Compra, venta, renta y comercialización de propiedades.",
                },
                {
                  icon: Ruler,
                  title: "Arquitectura",
                  text: "Diseño de espacios funcionales, modernos y personalizados.",
                },
                {
                  icon: Hammer,
                  title: "Construcción",
                  text: "Desarrollo y ejecución de proyectos residenciales y comerciales.",
                },
                {
                  icon: FileText,
                  title: "Gestión",
                  text: "Trámites, avalúos, escrituración y asesoría inmobiliaria.",
                },
              ].map((item) => {

                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -8 }}
                    className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition"
                  >

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#17495B]/10">
                      <Icon
                        size={28}
                        className="text-[#17495B]"
                      />
                    </div>

                    <h3 className="mt-6 text-2xl font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-4 leading-7 text-gray-600">
                      {item.text}
                    </p>

                  </motion.div>
                );
              })}

            </div>

          </div>
        </section>

        {/* FILOSOFÍA */}
        <section className="py-24">

          <div className="mx-auto max-w-5xl px-6 text-center">

            <Building2
              size={42}
              className="mx-auto text-[#17495B]"
            />

            <h2 className="mt-6 text-4xl font-black text-gray-900 md:text-5xl">
              Cada proyecto merece
              <br />
              atención a cada detalle.
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600">
              Creemos en hacer las cosas correctamente desde el principio:
              escuchar, entender, planear y ejecutar. Porque construir
              patrimonio también significa construir relaciones de confianza.
            </p>

          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#17495B] py-20">

          <div className="mx-auto max-w-5xl px-6 text-center text-white">

            <h2 className="text-4xl font-black md:text-5xl">
              ¿Tienes un proyecto en mente?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Cuéntanos qué necesitas y descubre cómo podemos ayudarte.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              <Link
                href="/propiedades"
                className="rounded-xl bg-white px-8 py-4 font-semibold text-[#17495B] transition duration-300 hover:scale-105"
              >
                Ver propiedades
              </Link>

              <a
                href="https://wa.me/529831543460?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20INHOM."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-white px-8 py-4 font-semibold text-white transition duration-300 hover:bg-white hover:text-[#17495B]"
              >
                <MessageCircle size={20} />
                Hablar con nosotros
              </a>

            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}