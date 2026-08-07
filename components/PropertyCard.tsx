import Image from "next/image";
import Link from "next/link";
import {
  BedDouble,
  Bath,
  Car,
  MapPin,
  Ruler,
  ArrowRight,
} from "lucide-react";
import { Propiedad } from "../data/propiedades";

type Props = {
  propiedad: Propiedad;
};

export default function PropertyCard({ propiedad }: Props) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

      {/* Imagen */}
      <div className="relative overflow-hidden">

       <Image
  src={propiedad.portada}
  alt={propiedad.nombre}
  width={600}
  height={400}
  className="h-56 w-full object-cover transition duration-700 group-hover:scale-110"
/>
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100"></div>
        <span
          className={`absolute left-4 top-4 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide text-white ${
            propiedad.tipo === "casa"
              ? "bg-[#17495B]"
              : "bg-green-600"
          }`}
        >
          {propiedad.tipo === "casa" ? "Casa" : "Terreno"}
        </span>

      </div>

      {/* Contenido */}
      <div className="p-5">

        <div className="text-sm font-medium text-gray-500">
  <MapPin size={16} className="text-[#17495B]" />
  <span>{propiedad.ubicacion}</span>
</div>

        <h3 className="mt-2 text-3xl font-bold leading-tight text-gray-900">
          {propiedad.nombre}
        </h3>

        {propiedad.tipo === "casa" ? (
          <div className="mt-5 flex gap-2 flex-wrap">

            <span className="rounded-full bg-[#F4F7F8] px-3 py-1 text-sm">
              <BedDouble size={16} /> {propiedad.caracteristicas.habitaciones}
            </span>

            <span className="rounded-full bg-[#F4F7F8] px-3 py-1 text-sm">
              🚿 {propiedad.caracteristicas.banos}
            </span>

            <span className="rounded-full bg-[#F4F7F8] px-3 py-1 text-sm">
              🚗 {propiedad.caracteristicas.estacionamiento ? "Sí" : "No"}
            </span>

          </div>
        ) : (
          <div className="mt-5 flex gap-2 flex-wrap">

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              📐 {propiedad.caracteristicas.terreno.toLocaleString()} m²
            </span>

            {propiedad.caracteristicas.frente && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                📏 {propiedad.caracteristicas.frente} m frente
              </span>
            )}

          </div>
        )}

        <div className="mt-6 flex items-center justify-between">

          <div>
           <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
  DESDE
</p>

            <h4 className="mt-1 text-4xl font-black tracking-tight text-[#17495B]">
              ${propiedad.precio.toLocaleString("es-MX")} MXN
            </h4>
          </div>

        </div>

        <Link
  href={`/propiedades/${propiedad.id}`}
  className="group mt-6 flex items-center justify-center rounded-xl bg-[#17495B] py-3 font-semibold text-white transition-all duration-300 hover:bg-[#123847]"
>
  <span>Ver propiedad</span>

  <ArrowRight
    size={18}
    className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
  />
</Link>

      </div>

    </article>
  );
}