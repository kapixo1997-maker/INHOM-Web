import { aprobarPropiedad, rechazarPropiedad } from "./actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BedDouble,
  Bath,
  Car,
  Ruler,
  MapPin,
  CheckCircle2,
  XCircle,
  UserRound,
  Phone,
  Mail,
  Images,
  FileText,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

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
};

export default async function RevisarPropiedadPage({
  params,
}: PageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // =========================
  // REVISAR SESIÓN
  // =========================

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // =========================
  // OBTENER PERFIL
  // =========================

  const { data: profile } = await supabase
    .from("profiles")
    .select("nombre, rol, activo")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.activo) {
    redirect("/login");
  }

  const esAdmin = profile.rol === "admin";

  // =========================
  // OBTENER PROPIEDAD
  // =========================

  const { data: propiedad, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !propiedad) {
    return (
      <main className="min-h-screen bg-[#F5F7F7] px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/panel"
            className="inline-flex items-center gap-2 font-semibold text-[#17495B]"
          >
            <ArrowLeft size={18} />
            Volver al panel
          </Link>

          <div className="mt-10 rounded-3xl border border-red-200 bg-white p-10">
            <h1 className="text-2xl font-black text-gray-900">
              No se encontró la propiedad
            </h1>

            <p className="mt-3 text-gray-600">
              La propiedad no existe o no pudo cargarse.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // SEGURIDAD PARA SOCIOS
  // =========================

  if (!esAdmin && propiedad.created_by !== user.id) {
    redirect("/panel");
  }

  // =========================
  // OBTENER FOTOGRAFÍAS
  // =========================

  const { data: imagenesData, error: imagenesError } = await supabase
    .from("property_images")
    .select("*")
    .eq("property_id", id)
    .order("orden", { ascending: true });

  if (imagenesError) {
    console.error("Error al cargar fotografías:", imagenesError);
  }

  const imagenes: PropertyImage[] =
    (imagenesData as PropertyImage[] | null) ?? [];

  // =========================
  // GENERAR URL PÚBLICA
  // =========================

  const getImageUrl = (storagePath: string) => {
    const { data } = supabase.storage
      .from("property-images")
      .getPublicUrl(storagePath);

    return data.publicUrl;
  };

  // =========================
  // OBTENER ASESOR RESPONSABLE
  // =========================

  let asesor: {
    nombre: string | null;
    telefono: string | null;
    email: string | null;
  } | null = null;

  if (propiedad.created_by) {
    const { data: asesorData } = await supabase
      .from("profiles")
      .select("nombre, telefono, email")
      .eq("id", propiedad.created_by)
      .single();

    asesor = asesorData;
  }

  // =========================
  // FORMATO DE PRECIO
  // =========================

  const precio =
    propiedad.precio !== null && propiedad.precio !== undefined
      ? new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
          maximumFractionDigits: 0,
        }).format(Number(propiedad.precio))
      : "Precio no especificado";

  const estaPendiente = propiedad.estado_publicacion === "pendiente";
  const estaPublicada = propiedad.estado_publicacion === "publicada";
  const estaRechazada = propiedad.estado_publicacion === "rechazada";

  return (
    <main className="min-h-screen bg-[#F5F7F7]">
      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#17495B]">
              INHOM
            </p>

            <h1 className="mt-1 text-2xl font-black text-gray-900">
              {esAdmin ? "Revisión de propiedad" : "Detalle de propiedad"}
            </h1>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              {profile.nombre || user.email}
            </p>

            <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
              {esAdmin ? "Administrador" : "Socio"}
            </p>
          </div>
        </div>
      </header>

      {/* ========================= */}
      {/* CONTENIDO */}
      {/* ========================= */}

      <section className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <Link
          href="/panel"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#17495B] transition hover:opacity-70"
        >
          <ArrowLeft size={18} />
          Volver al panel
        </Link>

        {/* ========================= */}
        {/* CABECERA PROPIEDAD */}
        {/* ========================= */}

        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${
                    estaPublicada
                      ? "bg-green-100 text-green-700"
                      : estaRechazada
                        ? "bg-red-100 text-red-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {propiedad.estado_publicacion || "Pendiente"}
                </span>

                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase text-gray-600">
                  {propiedad.tipo || "Propiedad"}
                </span>

                <span className="rounded-full bg-[#17495B]/10 px-3 py-1 text-xs font-bold uppercase text-[#17495B]">
                  {propiedad.operacion || "Operación"}
                </span>
              </div>

              <h2 className="mt-5 text-4xl font-black text-gray-900">
                {propiedad.titulo}
              </h2>

              <div className="mt-4 flex items-center gap-2 text-gray-600">
                <MapPin size={19} />

                <span>
                  {[
                    propiedad.direccion,
                    propiedad.colonia,
                    propiedad.ciudad,
                  ]
                    .filter(Boolean)
                    .join(", ") || "Ubicación no especificada"}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Precio
                </p>

                <p className="mt-1 text-3xl font-black text-[#17495B]">
                  {precio}
                </p>
              </div>

              <Link
                href={`/panel/propiedades/${id}/ficha`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17495B] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#123B4A]"
              >
                <FileText size={19} />
                Generar ficha PDF
              </Link>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* ESTADO PARA EL SOCIO */}
        {/* ========================= */}

        {!esAdmin && (
          <div
            className={`mt-6 rounded-3xl border p-6 ${
              estaPublicada
                ? "border-green-200 bg-green-50"
                : estaRechazada
                  ? "border-red-200 bg-red-50"
                  : "border-amber-200 bg-amber-50"
            }`}
          >
            <div className="flex items-start gap-4">
              {estaPublicada ? (
                <CheckCircle2
                  size={28}
                  className="mt-1 shrink-0 text-green-600"
                />
              ) : estaRechazada ? (
                <XCircle
                  size={28}
                  className="mt-1 shrink-0 text-red-600"
                />
              ) : (
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-amber-500">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                </div>
              )}

              <div>
                <h3
                  className={`text-lg font-black ${
                    estaPublicada
                      ? "text-green-900"
                      : estaRechazada
                        ? "text-red-900"
                        : "text-amber-900"
                  }`}
                >
                  {estaPublicada
                    ? "Propiedad aprobada"
                    : estaRechazada
                      ? "Esta propiedad requiere correcciones"
                      : "Propiedad en revisión"}
                </h3>

                <p
                  className={`mt-2 ${
                    estaPublicada
                      ? "text-green-700"
                      : estaRechazada
                        ? "text-red-700"
                        : "text-amber-700"
                  }`}
                >
                  {estaPublicada
                    ? "Esta propiedad fue aprobada por el equipo de INHOM y se encuentra lista para publicación."
                    : estaRechazada
                      ? "El equipo de INHOM revisó esta propiedad y encontró información que necesita corregirse."
                      : "Esta propiedad está siendo revisada por el equipo de INHOM. Te avisaremos cuando termine la revisión."}
                </p>

                {estaRechazada && propiedad.motivo_rechazo && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-white/70 p-4">
                    <p className="text-sm font-bold uppercase tracking-wider text-red-700">
                      Motivo
                    </p>

                    <p className="mt-2 whitespace-pre-line font-semibold text-red-900">
                      {propiedad.motivo_rechazo}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================= */}
        {/* FOTOGRAFÍAS */}
        {/* ========================= */}

        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#17495B]">
                Fotografías
              </p>

              <h3 className="mt-2 text-2xl font-black text-gray-900">
                Fotografías de la propiedad
              </h3>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17495B]/10 text-[#17495B]">
              <Images size={24} />
            </div>
          </div>

          {imagenes.length > 0 ? (
            <>
              {/* PORTADA */}
              <div className="relative mt-6 overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={getImageUrl(imagenes[0].storage_path)}
                  alt={`Portada de ${propiedad.titulo}`}
                  className="h-[420px] w-full object-cover"
                />

                <div className="absolute left-4 top-4 rounded-full bg-[#17495B] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow">
                  Portada
                </div>
              </div>

              {/* RESTO DE FOTOGRAFÍAS */}

              {imagenes.length > 1 && (
                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {imagenes.slice(1).map((imagen, index) => (
                    <div
                      key={imagen.id}
                      className="group relative overflow-hidden rounded-2xl bg-gray-100"
                    >
                      <img
                        src={getImageUrl(imagen.storage_path)}
                        alt={`Fotografía ${index + 2} de ${propiedad.titulo}`}
                        className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-4 text-sm font-medium text-gray-500">
                {imagenes.length}{" "}
                {imagenes.length === 1
                  ? "fotografía registrada"
                  : "fotografías registradas"}
              </p>
            </>
          ) : (
            <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">
              <Images size={34} className="text-gray-300" />

              <p className="mt-4 font-bold text-gray-700">
                No hay fotografías registradas
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Esta propiedad todavía no tiene imágenes asociadas.
              </p>
            </div>
          )}
        </div>

        {/* ========================= */}
        {/* ASESOR RESPONSABLE */}
        {/* ========================= */}

        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#17495B]/10 text-[#17495B]">
              <UserRound size={27} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#17495B]">
                Asesor responsable
              </p>

              <h3 className="mt-2 text-2xl font-black text-gray-900">
                {asesor?.nombre || "Asesor no identificado"}
              </h3>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                  <Phone
                    size={19}
                    className="shrink-0 text-[#17495B]"
                  />

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Teléfono / WhatsApp
                    </p>

                    <p className="mt-1 break-words font-semibold text-gray-900">
                      {asesor?.telefono || "No registrado"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                  <Mail
                    size={19}
                    className="shrink-0 text-[#17495B]"
                  />

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Correo electrónico
                    </p>

                    <p className="mt-1 break-all font-semibold text-gray-900">
                      {asesor?.email || "No registrado"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* CARACTERÍSTICAS */}
        {/* ========================= */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <InfoCard
            icon={<BedDouble size={23} />}
            titulo="Recámaras"
            valor={propiedad.recamaras}
          />

          <InfoCard
            icon={<Bath size={23} />}
            titulo="Baños"
            valor={propiedad.banos}
          />

          <InfoCard
            icon={<Car size={23} />}
            titulo="Estacionamientos"
            valor={propiedad.estacionamientos}
          />

          <InfoCard
            icon={<Ruler size={23} />}
            titulo="Terreno"
            valor={
              propiedad.terreno_m2
                ? `${propiedad.terreno_m2} m²`
                : null
            }
          />

          <InfoCard
            icon={<Ruler size={23} />}
            titulo="Construcción"
            valor={
              propiedad.construccion_m2
                ? `${propiedad.construccion_m2} m²`
                : null
            }
          />
        </div>

        {/* ========================= */}
        {/* DESCRIPCIÓN */}
        {/* ========================= */}

        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#17495B]">
            Información
          </p>

          <h3 className="mt-2 text-2xl font-black text-gray-900">
            Descripción
          </h3>

          <p className="mt-5 whitespace-pre-line leading-8 text-gray-600">
            {propiedad.descripcion || "Sin descripción."}
          </p>
        </div>

        {/* ========================= */}
        {/* AMENIDADES */}
        {/* ========================= */}

        {Array.isArray(propiedad.amenidades) &&
          propiedad.amenidades.length > 0 && (
            <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-black text-gray-900">
                Amenidades
              </h3>

              <div className="mt-5 flex flex-wrap gap-2">
                {propiedad.amenidades.map(
                  (amenidad: string, index: number) => (
                    <span
                      key={index}
                      className="rounded-full bg-[#17495B]/10 px-4 py-2 text-sm font-semibold text-[#17495B]"
                    >
                      {amenidad}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

        {/* ========================= */}
        {/* MOTIVO RECHAZO - ADMIN */}
        {/* ========================= */}

        {esAdmin &&
          estaRechazada &&
          propiedad.motivo_rechazo && (
            <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-700">
                Propiedad rechazada
              </p>

              <h3 className="mt-2 text-xl font-black text-red-900">
                Motivo del rechazo
              </h3>

              <p className="mt-3 whitespace-pre-line leading-7 text-red-800">
                {propiedad.motivo_rechazo}
              </p>
            </div>
          )}

        {/* ========================= */}
        {/* MODERACIÓN - SOLO ADMIN */}
        {/* ========================= */}

        {esAdmin && estaPendiente && (
          <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#17495B]">
              Moderación
            </p>

            <h3 className="mt-2 text-2xl font-black text-gray-900">
              Revisar publicación
            </h3>

            <p className="mt-3 text-gray-600">
              Verifica que la información de la propiedad sea correcta antes
              de aprobarla para publicación. Si necesitas rechazarla, indica
              el motivo para que quede registrado.
            </p>

            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              {/* RECHAZAR */}

              <form
                action={rechazarPropiedad.bind(null, id)}
                className="rounded-2xl border border-red-200 bg-red-50 p-5"
              >
                <label
                  htmlFor="motivo_rechazo"
                  className="block text-sm font-bold text-red-800"
                >
                  Motivo del rechazo
                </label>

                <textarea
                  id="motivo_rechazo"
                  name="motivo_rechazo"
                  required
                  rows={4}
                  placeholder="Ej. Faltan fotografías o información de la propiedad..."
                  className="mt-3 w-full resize-none rounded-xl border border-red-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />

                <button
                  type="submit"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-red-200 bg-white px-6 py-4 font-bold text-red-700 transition hover:bg-red-100"
                >
                  <XCircle size={21} />
                  Rechazar propiedad
                </button>
              </form>

              {/* APROBAR */}

              <div className="flex flex-col justify-between rounded-2xl border border-green-200 bg-green-50 p-5">
                <div>
                  <p className="text-sm font-bold text-green-800">
                    Aprobar publicación
                  </p>

                  <p className="mt-3 text-sm leading-6 text-green-700">
                    Si toda la información es correcta, aprueba la propiedad
                    para cambiar su estado a publicada.
                  </p>
                </div>

                <form
                  action={aprobarPropiedad.bind(null, id)}
                  className="mt-6"
                >
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#17495B] px-6 py-4 font-bold text-white shadow-sm transition hover:bg-[#123B4A]"
                  >
                    <CheckCircle2 size={21} />
                    Aprobar propiedad
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ========================= */}
        {/* REVISIÓN FINALIZADA ADMIN */}
        {/* ========================= */}

        {esAdmin && !estaPendiente && (
          <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-4">
              {estaPublicada ? (
                <CheckCircle2
                  size={30}
                  className="shrink-0 text-green-600"
                />
              ) : (
                <XCircle
                  size={30}
                  className="shrink-0 text-red-600"
                />
              )}

              <div>
                <h3 className="text-xl font-black text-gray-900">
                  Revisión finalizada
                </h3>

                <p className="mt-1 text-gray-600">
                  Esta propiedad ya fue{" "}
                  <strong>
                    {estaPublicada ? "aprobada" : "rechazada"}
                  </strong>
                  .
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

// =========================
// TARJETA DE INFORMACIÓN
// =========================

function InfoCard({
  icon,
  titulo,
  valor,
}: {
  icon: React.ReactNode;
  titulo: string;
  valor: string | number | null | undefined;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="text-[#17495B]">{icon}</div>

      <p className="mt-4 text-sm font-medium text-gray-500">
        {titulo}
      </p>

      <p className="mt-1 text-xl font-black text-gray-900">
        {valor ?? "—"}
      </p>
    </div>
  );
}