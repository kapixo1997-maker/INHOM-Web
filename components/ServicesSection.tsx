"use client";

import { motion } from "framer-motion";
import {
  Home,
  Scale,
  FileText,
  PencilRuler,
  Hammer,
  TrendingUp,
  BadgeDollarSign,
  UserRound,
} from "lucide-react";

import ServiceCard from "./ServiceCard";

const services = [
  {
    icon: Home,
    title: "Compra, Venta y Renta",
    description:
      "Te ayudamos a encontrar, vender o rentar la propiedad ideal con acompañamiento durante todo el proceso.",
    items: [
      "Compra de propiedades",
      "Venta de inmuebles",
      "Renta",
      "Comercialización",
    ],
    href: "/servicios/bienes-raices",
  },

  {
    icon: Scale,
    title: "Trámites Legales Inmobiliarios",
    description:
      "Gestionamos los procesos legales necesarios para que tus operaciones inmobiliarias se realicen con mayor seguridad.",
    items: [
      "Contratos",
      "Escrituración",
      "Revisión documental",
      "Asesoría legal inmobiliaria",
    ],
    href: "/servicios/tramites-legales",
  },

  {
    icon: FileText,
    title: "Gestión y Tramitología",
    description:
      "Nos encargamos de la gestión y seguimiento de trámites relacionados con tu propiedad o proyecto.",
    items: [
      "Gestión de documentos",
      "Trámites inmobiliarios",
      "Seguimiento",
      "Asesoría",
    ],
    href: "/servicios/gestion-tramitologia",
  },

  {
    icon: PencilRuler,
    title: "Diseño Arquitectónico",
    description:
      "Diseñamos espacios funcionales y personalizados de acuerdo con tus necesidades y objetivos.",
    items: [
      "Diseño arquitectónico",
      "Planos",
      "Renderizados 3D",
      "Propuestas de diseño",
    ],
    href: "/servicios/diseno-arquitectonico",
  },

  {
    icon: Hammer,
    title: "Construcción",
    description:
      "Llevamos tus proyectos de la idea a la realidad mediante soluciones de construcción pensadas para cada necesidad.",
    items: [
      "Construcción residencial",
      "Obra nueva",
      "Remodelaciones",
      "Supervisión",
    ],
    href: "/servicios/construccion",
  },

  {
    icon: TrendingUp,
    title: "Asesoría para Inversiones",
    description:
      "Te orientamos para identificar oportunidades inmobiliarias de acuerdo con tus objetivos de inversión.",
    items: [
      "Análisis de propiedades",
      "Oportunidades de inversión",
      "Orientación inmobiliaria",
      "Planeación",
    ],
    href: "/servicios/inversiones",
  },

  {
    icon: BadgeDollarSign,
    title: "Avalúos y Opinión de Valor",
    description:
      "Obtén una referencia profesional del valor de tu propiedad para tomar mejores decisiones.",
    items: [
      "Avalúos",
      "Opinión de valor",
      "Análisis de mercado",
      "Valoración inmobiliaria",
    ],
    href: "/servicios/avaluos",
  },

  {
    icon: UserRound,
    title: "Asesoría Personalizada",
    description:
      "Te acompañamos de manera cercana para encontrar la solución inmobiliaria que mejor se adapte a tus necesidades.",
    items: [
      "Atención personalizada",
      "Orientación",
      "Seguimiento",
      "Acompañamiento",
    ],
    href: "/servicios/asesoria-personalizada",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-gray-50 py-24">
      {/* ENCABEZADO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-16 max-w-4xl px-6 text-center"
      >
        <span className="font-semibold uppercase tracking-[0.3em] text-[#17495B]">
          ¿QUÉ HACEMOS?
        </span>

        <h1 className="mt-4 text-5xl font-black text-gray-900 md:text-6xl">
          Nuestros servicios
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          En INHOM ofrecemos soluciones integrales para acompañarte
          en cada etapa de tu proyecto inmobiliario, desde la búsqueda
          de una propiedad hasta su diseño, construcción y gestión.
        </p>
      </motion.div>

      {/* SERVICIOS */}
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-2">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.05,
            }}
          >
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
              items={service.items}
              href={service.href}
            />
          </motion.div>
        ))}
      </div>

      {/* FRANJA INFERIOR */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-16 grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          "Atención Integral",
          "Equipo Profesional",
          "Seguridad y Confianza",
          "Compromiso",
        ].map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-[#17495B] px-6 py-5 text-center font-semibold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </section>
  );
}