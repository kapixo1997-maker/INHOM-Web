import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Car,
  Ruler,
  MapPin,
  House,
} from "lucide-react";

import { Propiedad } from "../data/propiedades";
import WhatsAppCard from "./WhatsAppCard";

type Props = {
  propiedad: Propiedad;
};

export default function PropertyInfo({ propiedad }: Props) {
  return (
    <div>

      {/* Volver a propiedades */}
      <Link
        href="/propiedades"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#17495B]"
      >
        <ArrowLeft size={18} />
        Volver a propiedades
      </Link>

      {/* Nombre */}
      <h1 className="text-5xl font-bold text-gray-900">
        {propiedad.nombre}
      </h1>

      {/* Precio */}
      <p className="mt-4 text-3xl font-bold text-[#17495B]">
        ${propiedad.precio.toLocaleString("es-MX")} MXN
      </p>

      {/* Características */}
      <div className="mt-8 grid grid-cols-2 gap-4">

        {propiedad.tipo === "casa" && (
          <>
            {/* Habitaciones */}
            <div className="rounded-xl bg-gray-100 p-4">
              <p className="text-sm text-gray-500">
                Habitaciones
              </p>

              <p className="flex items-center gap-2 text-xl font-semibold">
                <BedDouble
                  size={22}
                  className="text-[#17495B]"
                />
                {propiedad.caracteristicas.habitaciones}
              </p>
            </div>

            {/* Baños */}
            <div className="rounded-xl bg-gray-100 p-4">
              <p className="text-sm text-gray-500">
                Baños
              </p>

              <p className="flex items-center gap-2 text-xl font-semibold">
                <Bath
                  size={22}
                  className="text-[#17495B]"
                />
                {propiedad.caracteristicas.banos}
              </p>
            </div>

            {/* Estacionamiento */}
            <div className="rounded-xl bg-gray-100 p-4">
              <p className="text-sm text-gray-500">
                Estacionamiento
              </p>

              <p className="flex items-center gap-2 text-xl font-semibold">
                <Car
                  size={22}
                  className="text-[#17495B]"
                />
                {propiedad.caracteristicas.estacionamiento
                  ? "Sí"
                  : "No"}
              </p>
            </div>

            {/* Construcción */}
            <div className="rounded-xl bg-gray-100 p-4">
              <p className="text-sm text-gray-500">
                Construcción
              </p>

              <p className="flex items-center gap-2 text-xl font-semibold">
                <House
                  size={22}
                  className="text-[#17495B]"
                />
                {propiedad.caracteristicas.construccion} m²
              </p>
            </div>
          </>
        )}

        {/* Terreno */}
        <div className="rounded-xl bg-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Terreno
          </p>

          <p className="flex items-center gap-2 text-xl font-semibold">
            <Ruler
              size={22}
              className="text-[#17495B]"
            />
            {propiedad.caracteristicas.terreno} m²
          </p>
        </div>

        {/* Ubicación */}
        <div className="rounded-xl bg-gray-100 p-4">
          <p className="text-sm text-gray-500">
            Ubicación
          </p>

          <p className="flex items-center gap-2 text-xl font-semibold">
            <MapPin
              size={22}
              className="text-[#17495B]"
            />
            {propiedad.ubicacion}
          </p>
        </div>

      </div>

      {/* Descripción */}
      <div className="mt-10">

        <h2 className="mb-4 text-2xl font-bold text-[#17495B]">
          Descripción
        </h2>

        <p className="text-lg leading-8 text-gray-700">
          {propiedad.descripcion}
        </p>

        {/* Google Maps */}
        {propiedad.mapa && (
          <a
            href={propiedad.mapa}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#17495B] px-6 py-4 font-semibold text-white transition hover:bg-[#123847]"
          >
            <MapPin size={20} />
            Ver en Google Maps
          </a>
        )}

      </div>

      {/* Amenidades */}
      {propiedad.amenidades && (
        <div className="mt-10">

          <h2 className="mb-4 text-2xl font-bold text-[#17495B]">
            Amenidades
          </h2>

          <div className="flex flex-wrap gap-3">

            {propiedad.amenidades.map((item) => (
              <span
                key={item}
                className="rounded-full bg-[#17495B]/10 px-4 py-2 font-medium text-[#17495B]"
              >
                ✓ {item}
              </span>
            ))}

          </div>

        </div>
      )}

      {/* WhatsApp */}
      <WhatsAppCard
        nombre={propiedad.nombre}
      />

    </div>
  );
}