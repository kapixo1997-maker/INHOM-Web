"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  Car,
  MapPin,
  Ruler,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type PropertyImage = {
  storage_path: string;
  orden: number | null;
};

type Property = {
  id: string;
  titulo: string;
  tipo: string | null;
  operacion: string | null;
  precio: number | null;
  ciudad: string | null;
  colonia: string | null;
  recamaras: number | null;
  banos: number | null;
  estacionamientos: number | null;
  terreno_m2: number | null;
  construccion_m2: number | null;
  estado_publicacion: string | null;
  destacada: boolean | null;
  created_at: string;
  property_images: PropertyImage[] | null;
};

export default function FeaturedProperties() {
  const [propiedades, setPropiedades] = useState<Property[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function cargarPropiedadesDestacadas() {
      try {
        setCargando(true);
        setError(false);

        const supabase = createClient();

        const { data, error: supabaseError } = await supabase
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
              estado_publicacion,
              destacada,
              created_at,
              property_images (
                storage_path,
                orden
              )
            `
          )
          .eq("estado_publicacion", "publicada")
          .eq("estado_comercial", "disponible")
          .eq("destacada", true)
          .order("created_at", { ascending: false })
          .limit(3);

        if (supabaseError) {
  console.error("ERROR SUPABASE COMPLETO:", {
    message: supabaseError.message,
    details: supabaseError.details,
    hint: supabaseError.hint,
    code: supabaseError.code,
  });

  setError(true);
  setPropiedades([]);
  return;
}

        setPropiedades((data ?? []) as Property[]);
      } catch (err) {
        console.error(
          "Error inesperado al cargar propiedades destacadas:",
          err
        );

        setError(true);
        setPropiedades([]);
      } finally {
        setCargando(false);
      }
    }

    cargarPropiedadesDestacadas();
  }, []);

  return (
    <section id="propiedades" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* ENCABEZADO */}

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#17495B]">
            INHOM
          </p>

          <h2 className="mt-3 text-4xl font-black text-[#17495B] sm:text-5xl">
            Propiedades Destacadas
          </h2>

          <p className="mt-4 text-gray-600">
            Conoce algunas de nuestras propiedades seleccionadas.
          </p>
        </div>

        {/* CARGANDO */}

        {cargando && (
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="h-64 animate-pulse bg-gray-200" />

                <div className="space-y-4 p-6">
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
                  <div className="h-7 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}

        {!cargando && error && (
          <div className="mx-auto mt-14 max-w-xl rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
            <Building2
              size={42}
              className="mx-auto text-red-300"
            />

            <p className="mt-4 font-bold text-red-700">
              No pudimos cargar las propiedades destacadas.
            </p>

            <p className="mt-2 text-sm text-red-600">
              Intenta nuevamente en unos momentos.
            </p>
          </div>
        )}

        {/* PROPIEDADES DESTACADAS */}

        {!cargando && !error && propiedades.length > 0 && (
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {propiedades.map((propiedad) => {
              const imagenes = [
                ...(propiedad.property_images ?? []),
              ].sort(
                (a, b) =>
                  (a.orden ?? 0) - (b.orden ?? 0)
              );

              const portada =
                imagenes[0]?.storage_path ?? null;

              const supabase = createClient();

              const portadaUrl = portada
                ? supabase.storage
                    .from("property-images")
                    .getPublicUrl(portada).data.publicUrl
                : null;

              const precio =
                propiedad.precio !== null &&
                propiedad.precio !== undefined
                  ? Number(propiedad.precio).toLocaleString(
                      "es-MX"
                    )
                  : null;

              return (
                <article
                  key={propiedad.id}
                  className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                  {/* IMAGEN */}

                  <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#17495B]/5">
                    {portadaUrl ? (
                      <img
                        src={portadaUrl}
                        alt={`Portada de ${propiedad.titulo}`}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <Building2
                        size={64}
                        className="text-[#17495B]/30"
                      />
                    )}

                    {portadaUrl && (
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
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

                  {/* CONTENIDO */}

                  <div className="p-6">
                    {/* UBICACIÓN */}

                    {(propiedad.ciudad ||
                      propiedad.colonia) && (
                      <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin
                          size={16}
                          className="shrink-0 text-[#17495B]"
                        />

                        <span>
                          {[
                            propiedad.colonia,
                            propiedad.ciudad,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </div>
                    )}

                    {/* TÍTULO */}

                    <h3 className="text-2xl font-black leading-tight text-gray-900">
                      {propiedad.titulo}
                    </h3>

                    {/* CARACTERÍSTICAS */}

                    <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-600">
                      {propiedad.recamaras != null &&
                        propiedad.recamaras > 0 && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F7F8] px-3 py-1.5">
                            <BedDouble size={16} />
                            {propiedad.recamaras}
                          </span>
                        )}

                      {propiedad.banos != null &&
                        propiedad.banos > 0 && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F7F8] px-3 py-1.5">
                            <Bath size={16} />
                            {propiedad.banos}
                          </span>
                        )}

                      {propiedad.estacionamientos != null &&
                        propiedad.estacionamientos > 0 && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F7F8] px-3 py-1.5">
                            <Car size={16} />
                            {propiedad.estacionamientos}
                          </span>
                        )}

                      {propiedad.terreno_m2 != null &&
                        propiedad.terreno_m2 > 0 && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F7F8] px-3 py-1.5">
                            <Ruler size={16} />
                            {propiedad.terreno_m2} m²
                          </span>
                        )}
                    </div>

                    {/* PRECIO */}

                    <div className="mt-6 border-t border-gray-100 pt-5">
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                        Precio
                      </p>

                      {precio ? (
                        <p className="mt-1 text-3xl font-black tracking-tight text-[#17495B]">
                          ${precio} MXN
                        </p>
                      ) : (
                        <p className="mt-1 text-xl font-black text-[#17495B]">
                          Precio a consultar
                        </p>
                      )}
                    </div>

                    {/* VER PROPIEDAD */}

                    <Link
                      href={`/propiedades/${propiedad.id}`}
                      className="group/link mt-6 flex items-center justify-center rounded-xl bg-[#17495B] py-3.5 font-semibold text-white transition hover:bg-[#123847]"
                    >
                      <span>Ver propiedad</span>

                      <ArrowRight
                        size={18}
                        className="ml-2 transition-transform duration-300 group-hover/link:translate-x-2"
                      />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* SIN DESTACADAS */}

        {!cargando &&
          !error &&
          propiedades.length === 0 && (
            <div className="mx-auto mt-14 max-w-xl rounded-3xl border border-gray-200 bg-gray-50 px-6 py-12 text-center">
              <Building2
                size={44}
                className="mx-auto text-[#17495B]/30"
              />

              <h3 className="mt-4 text-xl font-black text-gray-800">
                Próximamente nuevas propiedades
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Estamos seleccionando nuevas opciones para ti.
              </p>
            </div>
          )}

        {/* VER TODAS */}

        <div className="mt-12 text-center">
          <Link
            href="/propiedades"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#17495B] px-7 py-3.5 font-bold text-[#17495B] transition hover:bg-[#17495B] hover:text-white"
          >
            Ver todas las propiedades
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}