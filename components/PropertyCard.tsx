import Link from "next/link";
import { Propiedad } from "../data/propiedades";

type Props = {
  propiedad: Propiedad;
};

export default function PropertyCard({ propiedad }: Props) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* Imagen */}
      <div className="relative overflow-hidden">

        <img
          src={propiedad.portada}
          alt={propiedad.nombre}
          className="h-56 w-full object-cover transition duration-700 group-hover:scale-110"
        />

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

        <p className="text-sm text-gray-500">
          📍 {propiedad.ubicacion}
        </p>

        <h3 className="mt-2 text-2xl font-bold text-gray-900">
          {propiedad.nombre}
        </h3>

        {propiedad.tipo === "casa" ? (
          <div className="mt-5 flex gap-2 flex-wrap">

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
              🛏 {propiedad.caracteristicas.habitaciones}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
              🚿 {propiedad.caracteristicas.banos}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
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
            <p className="text-xs uppercase tracking-widest text-gray-400">
              Precio
            </p>

            <h4 className="text-3xl font-extrabold text-[#17495B]">
              ${propiedad.precio.toLocaleString("es-MX")}
            </h4>
          </div>

        </div>

        <Link
          href={`/propiedades/${propiedad.id}`}
          className="mt-6 flex items-center justify-center rounded-xl bg-[#17495B] py-3 font-semibold text-white transition hover:bg-[#123847]"
        >
          Ver detalles →
        </Link>

      </div>

    </article>
  );
}