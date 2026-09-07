import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Car,
  Ruler,
  MapPin,
  Building2,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export default async function PropiedadesPage() {
  const supabase = await createClient();

  // ==========================================
  // OBTENER SOLO PROPIEDADES PUBLICADAS
  // ==========================================

  const { data: propiedades, error } = await supabase
    .from("properties")
    .select(
      `
        id,
        titulo,
        tipo,
        operacion,
        precio,
        ciudad,
        colonia,
        recamaras,
        banos,
        estacionamientos,
        terreno_m2,
        construccion_m2,
        descripcion,
        estado_publicacion,
        created_at,
        property_images (
          storage_path,
          orden
        )
      `
    )
    .eq("estado_publicacion", "publicada")
    .eq("estado_comercial", "disponible")
    .order("created_at", { ascending: false });

  const listaPropiedades = propiedades ?? [];

  return (
    <main className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* VOLVER */}

        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#17495B]"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </Link>

        {/* ENCABEZADO */}

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#17495B]">
            INHOM
          </p>

          <h1 className="mt-3 text-4xl font-black text-[#17495B] sm:text-5xl">
            Nuestras Propiedades
          </h1>

          <p className="mt-4 text-gray-600">
            Encuentra la propiedad ideal para ti.
          </p>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-5 text-center text-sm font-medium text-red-700">
            No pudimos cargar las propiedades en este momento.
          </div>
        )}

        {/* PROPIEDADES */}

        {!error && listaPropiedades.length > 0 && (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {listaPropiedades.map((propiedad) => {
              const precio =
                propiedad.precio !== null &&
                propiedad.precio !== undefined
                  ? Number(propiedad.precio).toLocaleString("es-MX")
                  : null;

              // ==========================================
              // OBTENER PORTADA
              // ==========================================

              const imagenes = [...(propiedad.property_images ?? [])].sort(
                (a, b) => (a.orden ?? 0) - (b.orden ?? 0)
              );

              const portada = imagenes[0]?.storage_path ?? null;

              const portadaUrl = portada
                ? supabase.storage
                    .from("property-images")
                    .getPublicUrl(portada).data.publicUrl
                : null;

              return (
                <article
                  key={propiedad.id}
                  className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* ========================================== */}
                  {/* PORTADA */}
                  {/* ========================================== */}

                  <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#17495B]/5">
                    {portadaUrl ? (
                      <img
                        src={portadaUrl}
                        alt={`Portada de ${propiedad.titulo}`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <Building2
                        size={64}
                        className="text-[#17495B]/30"
                      />
                    )}

                    {/* SOMBRA SUAVE SOBRE LA FOTO */}

                    {portadaUrl && (
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5" />
                    )}

                    {/* OPERACIÓN */}

                    {propiedad.operacion && (
                      <span className="absolute left-5 top-5 z-10 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#17495B] shadow-sm">
                        {propiedad.operacion}
                      </span>
                    )}

                    {/* TIPO */}

                    {propiedad.tipo && (
                      <span className="absolute right-5 top-5 z-10 rounded-full bg-[#17495B] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                        {propiedad.tipo}
                      </span>
                    )}
                  </div>

                  {/* ========================================== */}
                  {/* INFORMACIÓN */}
                  {/* ========================================== */}

                  <div className="p-6">
                    {/* UBICACIÓN */}

                    {(propiedad.ciudad || propiedad.colonia) && (
                      <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin
                          size={16}
                          className="shrink-0 text-[#17495B]"
                        />

                        <span>
                          {[propiedad.colonia, propiedad.ciudad]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </div>
                    )}

                    {/* TÍTULO */}

                    <h2 className="text-2xl font-black text-gray-900">
                      {propiedad.titulo}
                    </h2>

                    {/* CARACTERÍSTICAS */}

                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-600">
                      {propiedad.recamaras != null &&
                        propiedad.recamaras > 0 && (
                          <span className="flex items-center gap-1.5">
                            <BedDouble
                              size={17}
                              className="text-[#17495B]"
                            />

                            {propiedad.recamaras}{" "}
                            {propiedad.recamaras === 1
                              ? "recámara"
                              : "recámaras"}
                          </span>
                        )}

                      {propiedad.banos != null &&
                        propiedad.banos > 0 && (
                          <span className="flex items-center gap-1.5">
                            <Bath
                              size={17}
                              className="text-[#17495B]"
                            />

                            {propiedad.banos}{" "}
                            {propiedad.banos === 1 ? "baño" : "baños"}
                          </span>
                        )}

                      {propiedad.estacionamientos != null &&
                        propiedad.estacionamientos > 0 && (
                          <span className="flex items-center gap-1.5">
                            <Car
                              size={17}
                              className="text-[#17495B]"
                            />

                            {propiedad.estacionamientos}{" "}
                            {propiedad.estacionamientos === 1
                              ? "estacionamiento"
                              : "estacionamientos"}
                          </span>
                        )}
                    </div>

                    {/* MEDIDAS */}

                    <div className="mt-4 space-y-2 text-sm text-gray-500">
                      {propiedad.terreno_m2 != null &&
                        propiedad.terreno_m2 > 0 && (
                          <div className="flex items-center gap-2">
                            <Ruler
                              size={16}
                              className="text-[#17495B]"
                            />

                            <span>
                              Terreno:{" "}
                              <strong className="text-gray-700">
                                {propiedad.terreno_m2} m²
                              </strong>
                            </span>
                          </div>
                        )}

                      {propiedad.construccion_m2 != null &&
                        propiedad.construccion_m2 > 0 && (
                          <div className="flex items-center gap-2">
                            <Ruler
                              size={16}
                              className="text-[#17495B]"
                            />

                            <span>
                              Construcción:{" "}
                              <strong className="text-gray-700">
                                {propiedad.construccion_m2} m²
                              </strong>
                            </span>
                          </div>
                        )}
                    </div>

                    {/* PRECIO */}

                    <div className="mt-6 border-t border-gray-100 pt-5">
                      {precio ? (
                        <p className="text-2xl font-black text-[#17495B]">
                          ${precio}
                        </p>
                      ) : (
                        <p className="text-lg font-bold text-[#17495B]">
                          Precio a consultar
                        </p>
                      )}
                    </div>

                    {/* VER DETALLES */}

                    <Link
                      href={`/propiedades/${propiedad.id}`}
                      className="mt-6 block w-full rounded-xl bg-[#17495B] py-3.5 text-center font-bold text-white transition hover:bg-[#123847]"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* SIN PROPIEDADES */}

        {!error && listaPropiedades.length === 0 && (
          <div className="mx-auto mt-16 max-w-xl rounded-3xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <Building2
              size={48}
              className="mx-auto text-[#17495B]/40"
            />

            <h2 className="mt-5 text-2xl font-black text-gray-800">
              No hay propiedades disponibles.
            </h2>

            <p className="mt-3 text-gray-500">
              Estamos actualizando nuestro catálogo. Vuelve pronto para conocer
              nuevas propiedades.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}