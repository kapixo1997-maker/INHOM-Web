import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { propiedades } from "@/data/propiedades";

export default function PropiedadesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-20">

      <div className="mx-auto max-w-7xl px-6">

        {/* Volver */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#17495B]"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </Link>

        {/* Encabezado */}
        <h1 className="text-center text-5xl font-bold text-[#17495B]">
          Nuestras Propiedades
        </h1>

        <p className="mt-4 mb-12 text-center text-gray-600">
          Encuentra la propiedad ideal para ti.
        </p>

        {/* Propiedades */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {propiedades.map((propiedad) => (

            <div
              key={propiedad.id}
              className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Imagen */}
              <div className="h-64 overflow-hidden bg-gray-100">

                <img
                  src={propiedad.imagenes?.[0] || "/inhom.jpg"}
                  alt={propiedad.nombre}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />

              </div>

              {/* Información */}
              <div className="p-6">

                <h2 className="text-2xl font-bold text-gray-900">
                  {propiedad.nombre}
                </h2>

                <p className="mt-2 text-gray-600">
                  {propiedad.tipo === "casa" && (
                    <>
                      {propiedad.caracteristicas.habitaciones} habitaciones
                      {" • "}
                      {propiedad.caracteristicas.banos} baños
                      {" • "}
                      {propiedad.caracteristicas.estacionamiento
                        ? "Cochera"
                        : "Sin cochera"}
                    </>
                  )}

                  {propiedad.tipo !== "casa" && (
                    <>
                      Terreno de{" "}
                      {propiedad.caracteristicas.terreno} m²
                    </>
                  )}
                </p>

                <p className="mt-4 text-2xl font-bold text-[#17495B]">
                  ${propiedad.precio.toLocaleString("es-MX")}
                </p>

                {/* Ver detalles */}
                <Link
                  href={`/propiedades/${propiedad.id}`}
                  className="mt-6 block w-full rounded-xl bg-[#17495B] py-3 text-center font-semibold text-white transition hover:bg-[#123847]"
                >
                  Ver detalles
                </Link>

              </div>

            </div>

          ))}

        </div>

        {/* Sin propiedades */}
        {propiedades.length === 0 && (
          <div className="py-20 text-center">

            <h2 className="text-2xl font-bold text-gray-800">
              No hay propiedades disponibles.
            </h2>

            <p className="mt-3 text-gray-500">
              Estamos actualizando nuestro catálogo.
            </p>

          </div>
        )}

      </div>

    </main>
  );
}