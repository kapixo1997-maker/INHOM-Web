import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Car,
  Ruler,
  MapPin,
  Building2,
  CheckCircle2,
  FileImage,
  Maximize2,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import GaleriaPropiedad from "./GaleriaPropiedad";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type PropertyImage = {
  id: string;
  property_id: string;
  storage_path: string;
  orden: number | null;
  tipo: "foto" | "plano";
};

export default async function PaginaPropiedad({
  params,
}: PageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // ==========================================
  // OBTENER PROPIEDAD PUBLICADA
  // ==========================================

  const { data: propiedad, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .eq("estado_publicacion", "publicada")
    .single();

  // ==========================================
  // PROPIEDAD NO DISPONIBLE
  // ==========================================

  if (error || !propiedad) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6">
        <div className="max-w-xl text-center">
          <Building2
            size={56}
            className="mx-auto text-[#17495B]/30"
          />

          <h1 className="mt-6 text-4xl font-black text-gray-900">
            Propiedad no encontrada
          </h1>

          <p className="mt-4 leading-7 text-gray-500">
            La propiedad que buscas no existe, todavía no ha sido aprobada o
            ya no está disponible.
          </p>

          <Link
            href="/propiedades"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#17495B] px-6 py-3 font-bold text-white transition hover:bg-[#123847]"
          >
            <ArrowLeft size={18} />
            Ver propiedades
          </Link>
        </div>
      </main>
    );
  }

  // ==========================================
  // OBTENER FOTOGRAFÍAS Y PLANOS
  // ==========================================

  const { data: imagenesData, error: imagenesError } = await supabase
    .from("property_images")
    .select("id, property_id, storage_path, orden, tipo")
    .eq("property_id", id)
    .order("orden", { ascending: true });

  if (imagenesError) {
    console.error(
      "Error al cargar imágenes de la propiedad:",
      imagenesError
    );
  }

  const imagenes: PropertyImage[] =
    (imagenesData as PropertyImage[] | null) ?? [];

  // ==========================================
  // GENERAR URL PÚBLICA DE SUPABASE STORAGE
  // ==========================================

  const getImageUrl = (storagePath: string) => {
    const { data } = supabase.storage
      .from("property-images")
      .getPublicUrl(storagePath);

    return data.publicUrl;
  };

  // ==========================================
  // SEPARAR FOTOGRAFÍAS Y PLANOS
  // ==========================================

  const fotografias = imagenes
    .filter((imagen) => imagen.tipo === "foto")
    .map((imagen) => ({
      ...imagen,
      url: getImageUrl(imagen.storage_path),
    }));

  const planos = imagenes
    .filter((imagen) => imagen.tipo === "plano")
    .map((imagen) => ({
      ...imagen,
      url: getImageUrl(imagen.storage_path),
    }));

  const fotografiasUrls = fotografias.map((imagen) => imagen.url);

  // ==========================================
  // PRECIO
  // ==========================================

  const precio =
    propiedad.precio !== null &&
    propiedad.precio !== undefined
      ? new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
          maximumFractionDigits: 0,
        }).format(Number(propiedad.precio))
      : "Precio a consultar";

  // ==========================================
  // UBICACIÓN
  // ==========================================

  const ubicacion = [
    propiedad.direccion,
    propiedad.colonia,
    propiedad.ciudad,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="min-h-screen bg-gray-50">
      {/* ========================================== */}
      {/* NAVEGACIÓN */}
      {/* ========================================== */}

      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <Link
          href="/propiedades"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#17495B]"
        >
          <ArrowLeft size={18} />
          Volver a propiedades
        </Link>
      </div>

      {/* ========================================== */}
      {/* INFORMACIÓN PRINCIPAL */}
      {/* ========================================== */}

      <section className="py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">

          {/* ========================================== */}
          {/* GALERÍA DE FOTOGRAFÍAS */}
          {/* ========================================== */}

          <GaleriaPropiedad
            imagenes={fotografiasUrls}
            titulo={propiedad.titulo}
            operacion={propiedad.operacion}
            tipo={propiedad.tipo}
          />

          {/* ========================================== */}
          {/* INFORMACIÓN */}
          {/* ========================================== */}

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#17495B]">
              INHOM
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight text-gray-900">
              {propiedad.titulo}
            </h1>

            {/* UBICACIÓN */}

            {ubicacion && (
              <div className="mt-5 flex items-start gap-2 text-gray-500">
                <MapPin
                  size={20}
                  className="mt-0.5 shrink-0 text-[#17495B]"
                />

                <span>{ubicacion}</span>
              </div>
            )}

            {/* ENLACE DIRECTO A MAPS */}

            {propiedad.ubicacion_url && (
              <a
                href={propiedad.ubicacion_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#17495B]/20 bg-[#17495B]/5 px-4 py-3 text-sm font-bold text-[#17495B] transition hover:border-[#17495B] hover:bg-[#17495B] hover:text-white"
              >
                <MapPin size={18} />
                Ver ubicación en Maps
                <span aria-hidden="true">↗</span>
              </a>
            )}

            <p className="mt-7 text-4xl font-black text-[#17495B]">
              {precio}
            </p>

            {/* CARACTERÍSTICAS */}

            <div className="mt-8 grid grid-cols-2 gap-3">
              {propiedad.recamaras != null && (
                <Caracteristica
                  icon={<BedDouble size={21} />}
                  titulo="Recámaras"
                  valor={propiedad.recamaras}
                />
              )}

              {propiedad.banos != null && (
                <Caracteristica
                  icon={<Bath size={21} />}
                  titulo="Baños"
                  valor={propiedad.banos}
                />
              )}

              {propiedad.estacionamientos != null && (
                <Caracteristica
                  icon={<Car size={21} />}
                  titulo="Estacionamientos"
                  valor={propiedad.estacionamientos}
                />
              )}

              {propiedad.terreno_m2 != null && (
                <Caracteristica
                  icon={<Ruler size={21} />}
                  titulo="Terreno"
                  valor={`${propiedad.terreno_m2} m²`}
                />
              )}

              {propiedad.construccion_m2 != null && (
                <Caracteristica
                  icon={<Ruler size={21} />}
                  titulo="Construcción"
                  valor={`${propiedad.construccion_m2} m²`}
                />
              )}
            </div>

            {/* CONTACTO */}

            <div className="mt-8 rounded-2xl bg-[#17495B]/5 p-5">
              <p className="font-black text-gray-900">
                ¿Te interesa esta propiedad?
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Contacta a INHOM para recibir más información, agendar una
                visita o conocer las opciones disponibles.
              </p>

              <Link
                href="/contacto"
                className="mt-5 block rounded-xl bg-[#17495B] px-5 py-3.5 text-center font-bold text-white transition hover:bg-[#123847]"
              >
                Solicitar información
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* DESCRIPCIÓN */}
      {/* ========================================== */}

      <section className="pb-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm lg:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#17495B]">
              La propiedad
            </p>

            <h2 className="mt-2 text-3xl font-black text-gray-900">
              Descripción
            </h2>

            <p className="mt-6 whitespace-pre-line leading-8 text-gray-600">
              {propiedad.descripcion ||
                "Solicita información para conocer todos los detalles de esta propiedad."}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* AMENIDADES */}
      {/* ========================================== */}

      {Array.isArray(propiedad.amenidades) &&
        propiedad.amenidades.length > 0 && (
          <section className="pb-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm lg:p-10">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#17495B]">
                  Características adicionales
                </p>

                <h2 className="mt-2 text-3xl font-black text-gray-900">
                  Amenidades
                </h2>

                <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {propiedad.amenidades.map(
                    (amenidad: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-4"
                      >
                        <CheckCircle2
                          size={19}
                          className="shrink-0 text-[#17495B]"
                        />

                        <span className="font-semibold text-gray-700">
                          {amenidad}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

      {/* ========================================== */}
      {/* PLANOS DE LA PROPIEDAD */}
      {/* ========================================== */}

      {planos.length > 0 && (
        <section className="pb-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

              {/* ENCABEZADO */}

              <div className="border-b border-gray-100 px-8 py-8 lg:px-10">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#17495B]/10 text-[#17495B]">
                    <FileImage size={23} />
                  </div>

                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#17495B]">
                      Distribución
                    </p>

                    <h2 className="mt-1 text-3xl font-black text-gray-900">
                      Planos de la propiedad
                    </h2>

                    <p className="mt-2 max-w-2xl leading-7 text-gray-500">
                      Consulta la distribución y organización de los espacios
                      de esta propiedad.
                    </p>
                  </div>
                </div>
              </div>

              {/* PLANOS */}

              <div className="grid gap-6 p-8 sm:grid-cols-2 lg:grid-cols-3 lg:p-10">
                {planos.map((plano, index) => (
                  <a
                    key={plano.id}
                    href={plano.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 transition duration-300 hover:-translate-y-1 hover:border-[#17495B]/30 hover:shadow-lg"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-white">
                      <img
                        src={plano.url}
                        alt={`Plano ${index + 1} de ${propiedad.titulo}`}
                        className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-[1.02]"
                      />

                      <div className="absolute left-4 top-4 rounded-full bg-[#17495B] px-3 py-1.5 text-xs font-black text-white shadow-sm">
                        Plano {index + 1}
                      </div>

                      <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#17495B] shadow-md transition group-hover:bg-[#17495B] group-hover:text-white">
                        <Maximize2 size={18} />
                      </div>
                    </div>

                    <div className="border-t border-gray-100 bg-white px-5 py-4">
                      <p className="font-black text-gray-900">
                        Plano {index + 1}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Toca para ampliar
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================== */}
      {/* AVISO FINAL */}
      {/* ========================================== */}

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl bg-[#17495B] px-8 py-10 text-white lg:px-12">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
              INHOM
            </p>

            <h2 className="mt-3 max-w-2xl text-3xl font-black">
              Encuentra el espacio ideal para tu próximo proyecto.
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-white/80">
              Nuestro equipo puede ayudarte con información de la propiedad,
              visitas y asesoría durante el proceso.
            </p>

            <Link
              href="/contacto"
              className="mt-7 inline-flex rounded-xl bg-white px-6 py-3.5 font-bold text-[#17495B] transition hover:bg-gray-100"
            >
              Contactar a INHOM
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// ==========================================
// TARJETA DE CARACTERÍSTICA
// ==========================================

function Caracteristica({
  icon,
  titulo,
  valor,
}: {
  icon: React.ReactNode;
  titulo: string;
  valor: string | number;
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">
      <div className="text-[#17495B]">
        {icon}
      </div>

      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        {titulo}
      </p>

      <p className="mt-1 font-black text-gray-900">
        {valor}
      </p>
    </div>
  );
}