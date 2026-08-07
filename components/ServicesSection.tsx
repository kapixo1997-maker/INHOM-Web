"use client";

import { motion } from "framer-motion";
import {
  Home,
  PencilRuler,
  Hammer,
  FileText,
} from "lucide-react";

import ServiceCard from "./ServiceCard";

const services = [
  {
    icon: Home,
    title: "Bienes Raíces",
    description:
      "Compra, venta, renta y comercialización de propiedades con asesoría personalizada.",
    items: [
      "Compra de propiedades",
      "Venta de inmuebles",
      "Renta",
      "Comercialización",
    ],
  },
  {
    icon: PencilRuler,
    title: "Arquitectura",
    description:
      "Diseñamos espacios modernos, funcionales y adaptados a cada proyecto.",
    items: [
      "Diseño Arquitectónico",
      "Planos",
      "Renderizados 3D",
      "Supervisión",
    ],
  },
  {
    icon: Hammer,
    title: "Construcción",
    description:
      "Construimos proyectos residenciales y comerciales con altos estándares de calidad.",
    items: [
      "Casas",
      "Locales",
      "Remodelaciones",
      "Obra nueva",
    ],
  },
  {
    icon: FileText,
    title: "Gestión Integral",
    description:
      "Te ayudamos con todos los trámites para que tu proyecto avance sin complicaciones.",
    items: [
      "Tramitología",
      "Avalúos",
      "Escrituración",
      "Asesoría",
    ],
  },
];

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      className="bg-[#F8FAFC] py-24"
    >
      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="font-semibold uppercase tracking-[0.3em] text-[#17495B]">
            NUESTROS SERVICIOS
          </span>

          <h2 className="mt-4 text-5xl font-black text-gray-900">
            Soluciones integrales
            <br />
            para tu patrimonio.
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            En INHOM reunimos bienes raíces, arquitectura,
            construcción y gestión para ofrecer un servicio
            completo en cada etapa de tu proyecto.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              items={service.items}
            />
          ))}
        </div>

      </div>
    </section>
  );
}