"use client";

import { FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  ArrowRight,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactoPage() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const nombre = formData.get("nombre")?.toString().trim() || "";
    const telefono = formData.get("telefono")?.toString().trim() || "";
    const correo = formData.get("correo")?.toString().trim() || "";
    const servicio = formData.get("servicio")?.toString().trim() || "";
    const mensaje = formData.get("mensaje")?.toString().trim() || "";

    const servicioSelect = form.elements.namedItem(
      "servicio"
    ) as HTMLSelectElement;

    const servicioTexto =
      servicioSelect.options[servicioSelect.selectedIndex]?.text ||
      "No especificado";

    const mensajeWhatsApp = [
      "Hola INHOM, me gustaría solicitar información.",
      "",
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      `Correo: ${correo || "No proporcionado"}`,
      `Servicio de interés: ${servicioTexto}`,
      "",
      "Mensaje:",
      mensaje,
    ].join("\n");

    const whatsappUrl = `https://wa.me/529831543460?text=${encodeURIComponent(
      mensajeWhatsApp
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Navbar />

      <main className="bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#17495B] py-24 md:py-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(191,229,219,0.18),transparent_40%)]" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <span className="font-semibold uppercase tracking-[0.3em] text-[#BFE5DB]">
                Contacto
              </span>

              <h1 className="mt-6 text-5xl font-black leading-tight text-white md:text-7xl">
                Hablemos de
                <br />

                <span className="text-[#BFE5DB]">
                  tu próximo proyecto.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
                Ya sea que estés buscando una propiedad, quieras vender,
                construir o desarrollar un proyecto, estamos aquí para
                ayudarte.
              </p>
            </motion.div>
          </div>
        </section>

        {/* INFORMACIÓN + FORMULARIO */}
        <section className="py-24">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            {/* INFORMACIÓN */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="font-semibold uppercase tracking-[0.3em] text-[#17495B]">
                Estamos para ayudarte
              </span>

              <h2 className="mt-4 text-4xl font-black text-gray-900 md:text-5xl">
                Ponte en contacto.
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Cuéntanos qué necesitas y uno de nuestros asesores podrá
                orientarte sobre el servicio o proyecto que tienes en mente.
              </p>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/529831543460?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20INHOM."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 flex items-center gap-5 rounded-3xl bg-[#25D366] p-6 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20">
                  <MessageCircle size={30} />
                </div>

                <div>
                  <p className="text-sm font-medium text-white/80">
                    WhatsApp
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    Hablar con un asesor
                  </p>
                </div>

                <ArrowRight className="ml-auto" size={24} />
              </a>

              {/* DATOS */}
              <div className="mt-10 space-y-6">
                {/* TELÉFONO */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#17495B]/10">
                    <Phone
                      size={22}
                      className="text-[#17495B]"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Teléfono
                    </p>

                    <a
                      href="tel:+529831543460"
                      className="mt-1 block text-gray-600 transition hover:text-[#17495B]"
                    >
                      +52 983 154 3460
                    </a>
                  </div>
                </div>

                {/* CORREO */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#17495B]/10">
                    <Mail
                      size={22}
                      className="text-[#17495B]"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Correo electrónico
                    </p>

                    <a
                      href="mailto:jnava@outlook.es"
                      className="mt-1 block text-gray-600 transition hover:text-[#17495B]"
                    >
                      jnava@outlook.es
                    </a>
                  </div>
                </div>

                {/* UBICACIÓN */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#17495B]/10">
                    <MapPin
                      size={22}
                      className="text-[#17495B]"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
                      Nuestra oficina
                    </p>

                    <p className="mt-1 leading-6 text-gray-600">
                      Av. Héroes #308
                      <br />
                      Chetumal, Quintana Roo
                    </p>

                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Av.+Héroes+308,+Chetumal,+Quintana+Roo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 font-semibold text-[#17495B] transition hover:gap-3 hover:underline"
                    >
                      Ver ubicación
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>

                {/* ATENCIÓN */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#17495B]/10">
                    <Clock
                      size={22}
                      className="text-[#17495B]"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-900">
  Horario de atención
</p>

<div className="mt-1 space-y-1 text-gray-600">
  <p>
    Lunes a viernes: 9:00 - 19:00
  </p>

  <p>
    Sábado: Cerrado
  </p>

  <p>
    Domingo: Cerrado
  </p>
</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FORMULARIO */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl border border-gray-200 bg-gray-50 p-8 shadow-sm md:p-10"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-900">
                  Envíanos un mensaje
                </h2>

                <p className="mt-3 text-gray-600">
                  Déjanos tus datos y cuéntanos brevemente qué necesitas.
                  Prepararemos tu solicitud para enviarla directamente por
                  WhatsApp.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* NOMBRE */}
                <div>
                  <label
                    htmlFor="nombre"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Nombre
                  </label>

                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Tu nombre"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                  />
                </div>

                {/* TELÉFONO + CORREO */}
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="telefono"
                      className="mb-2 block text-sm font-semibold text-gray-800"
                    >
                      Teléfono
                    </label>

                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      inputMode="tel"
                      required
                      autoComplete="tel"
                      placeholder="Tu teléfono"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="correo"
                      className="mb-2 block text-sm font-semibold text-gray-800"
                    >
                      Correo
                      <span className="ml-1 font-normal text-gray-400">
                        (opcional)
                      </span>
                    </label>

                    <input
                      id="correo"
                      name="correo"
                      type="email"
                      autoComplete="email"
                      placeholder="tu@email.com"
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                    />
                  </div>
                </div>

                {/* SERVICIO */}
                <div>
                  <label
                    htmlFor="servicio"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    ¿Qué necesitas?
                  </label>

                  <select
                    id="servicio"
                    name="servicio"
                    defaultValue=""
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-600 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                  >
                    <option
                      value=""
                      disabled
                    >
                      Selecciona una opción
                    </option>

                    <option value="comprar-propiedad">
                      Comprar una propiedad
                    </option>

                    <option value="vender-propiedad">
                      Vender una propiedad
                    </option>

                    <option value="rentar-propiedad">
                      Rentar una propiedad
                    </option>

                    <option value="arquitectura">
                      Diseño Arquitectónico
                    </option>

                    <option value="construccion">
                      Construcción
                    </option>

                    <option value="tramites">
                      Trámites y Gestión
                    </option>

                    <option value="avaluos">
                      Avalúos y Opinión de Valor
                    </option>

                    <option value="inversiones">
                      Asesoría para Inversiones
                    </option>

                    <option value="otro">
                      Otro
                    </option>
                  </select>
                </div>

                {/* MENSAJE */}
                <div>
                  <label
                    htmlFor="mensaje"
                    className="mb-2 block text-sm font-semibold text-gray-800"
                  >
                    Mensaje
                  </label>

                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    required
                    placeholder="Cuéntanos qué proyecto tienes en mente..."
                    className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3.5 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                  />
                </div>

                {/* BOTÓN */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#17495B] px-6 py-4 font-semibold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:bg-[#123B4A] hover:shadow-lg"
                >
                  <MessageCircle size={20} />
                  Enviar solicitud por WhatsApp
                </button>

                <p className="text-center text-sm leading-6 text-gray-500">
                  Al continuar se abrirá WhatsApp con tu solicitud preparada.
                  Tú decides cuándo enviarla.
                </p>
              </form>
            </motion.div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="text-4xl font-black text-gray-900 md:text-5xl">
              ¿Aún no encuentras lo que buscas?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Explora nuestras propiedades o conoce todos los servicios
              que tenemos disponibles.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/propiedades"
                className="rounded-xl bg-[#17495B] px-8 py-4 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Ver propiedades
              </Link>

              <Link
                href="/servicios"
                className="rounded-xl border border-[#17495B] px-8 py-4 font-semibold text-[#17495B] transition duration-300 hover:bg-[#17495B] hover:text-white"
              >
                Ver servicios
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}