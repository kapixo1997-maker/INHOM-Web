import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  Plus,
  Clock3,
  CheckCircle2,
  XCircle,
  Users,
  Eye,
  LogOut,
  MapPin,
  Star,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { cerrarSesion } from "./actions";
import DeletePropertyButton from "./DeletePropertyButton";
import FeaturedPropertyButton from "./FeaturedPropertyButton";
import PropertyStatusButton from "./PropertyStatusButton";
import PartnerAdminList from "./PartnerAdminList";
import PropertyAdminList from "./PropertyAdminList";
export default async function PanelPage() {
  const supabase = await createClient();

  /* =========================================================
     USUARIO
  ========================================================= */

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  /* =========================================================
     PERFIL
  ========================================================= */

  const { data: profile } = await supabase
    .from("profiles")
    .select("nombre, rol, activo")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.activo) {
    redirect("/login");
  }

  const esAdmin = profile.rol === "admin";

  /* =====================================================
   SOCIOS
===================================================== */

let socios: {
  id: string;
  nombre: string | null;
  telefono: string | null;
  empresa: string | null;
  email: string | null;
  rol: string;
  activo: boolean;
}[] = [];

if (esAdmin) {
  const { data: sociosData, error: sociosError } = await supabase
    .from("profiles")
    .select("id, nombre, telefono, empresa, email, rol, activo")
    .eq("rol", "socio")
    .order("nombre", { ascending: true });

  if (sociosError) {
    console.error("Error al cargar socios:", sociosError);
  } else {
    socios = sociosData ?? [];
  }
}

  /* =========================================================
     PROPIEDADES
  ========================================================= */

  let propertiesQuery = supabase
    .from("properties")
    .select(
  "id, titulo, tipo, operacion, precio, ciudad, estado_publicacion, motivo_rechazo, destacada, estado_comercial, created_at"
)
    .order("created_at", { ascending: false });

  // El socio solamente puede consultar sus propias propiedades.
  if (!esAdmin) {
    propertiesQuery = propertiesQuery.eq(
      "created_by",
      user.id
    );
  }

  const { data: propiedades, error: propiedadesError } =
    await propertiesQuery;

  const listaPropiedades = propiedades ?? [];

  /* =========================================================
     CONTADORES
  ========================================================= */

  const totalPropiedades = listaPropiedades.length;

  const totalPendientes = listaPropiedades.filter(
    (propiedad) =>
      propiedad.estado_publicacion === "pendiente"
  ).length;

  const totalPublicadas = listaPropiedades.filter(
    (propiedad) =>
      propiedad.estado_publicacion === "publicada"
  ).length;

  const totalRechazadas = listaPropiedades.filter(
    (propiedad) =>
      propiedad.estado_publicacion === "rechazada"
  ).length;

  const propiedadesPendientes = listaPropiedades.filter(
    (propiedad) =>
      propiedad.estado_publicacion === "pendiente"
  );

  return (
    <main className="min-h-screen bg-[#F5F7F7]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#17495B]">
              INHOM
            </p>

            <h1 className="mt-1 text-2xl font-black text-gray-900">
              Panel de propiedades
            </h1>
          </div>

          <div className="flex items-center gap-5">
            {/* USUARIO */}

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-gray-900">
                {profile.nombre || user.email}
              </p>

              <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
                {esAdmin ? "Administrador" : "Socio"}
              </p>
            </div>

            {/* CERRAR SESIÓN */}

            <form action={cerrarSesion}>
              <button
                type="submit"
                title="Cerrar sesión"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={18} />

                <span className="hidden md:inline">
                  Cerrar sesión
                </span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* =====================================================
          CONTENIDO
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* INTRO */}

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="font-semibold uppercase tracking-[0.2em] text-[#17495B]">
              Bienvenido
            </p>

            <h2 className="mt-2 text-4xl font-black text-gray-900">
              {esAdmin
                ? "Administración de INHOM"
                : "Tus propiedades"}
            </h2>

            <p className="mt-3 max-w-2xl text-gray-600">
              {esAdmin
                ? "Desde aquí podrás revisar propiedades, aprobar publicaciones y administrar socios."
                : "Desde aquí puedes consultar el estado de las propiedades que has enviado a INHOM."}
            </p>
          </div>

          <Link
            href="/panel/propiedades/nueva"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17495B] px-6 py-4 font-semibold text-white shadow-md transition hover:bg-[#123B4A]"
          >
            <Plus size={20} />
            Subir propiedad
          </Link>
        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {propiedadesError && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
            No se pudieron cargar las propiedades:{" "}
            {propiedadesError.message}
          </div>
        )}

        {/* =====================================================
            ESTADÍSTICAS
        ===================================================== */}

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <Building2
              size={28}
              className="text-[#17495B]"
            />

            <p className="mt-5 text-sm font-medium text-gray-500">
              Propiedades
            </p>

            <p className="mt-1 text-3xl font-black text-gray-900">
              {totalPropiedades}
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <Clock3
              size={28}
              className="text-amber-600"
            />

            <p className="mt-5 text-sm font-medium text-gray-500">
              Pendientes
            </p>

            <p className="mt-1 text-3xl font-black text-gray-900">
              {totalPendientes}
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <CheckCircle2
              size={28}
              className="text-green-600"
            />

            <p className="mt-5 text-sm font-medium text-gray-500">
              Publicadas
            </p>

            <p className="mt-1 text-3xl font-black text-gray-900">
              {totalPublicadas}
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <XCircle
              size={28}
              className="text-red-600"
            />

            <p className="mt-5 text-sm font-medium text-gray-500">
              Rechazadas
            </p>

            <p className="mt-1 text-3xl font-black text-gray-900">
              {totalRechazadas}
            </p>
          </div>
        </div>

        {/* =====================================================
            MIS PROPIEDADES — SOCIO
        ===================================================== */}

        {!esAdmin && (
          <div className="mt-10">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#17495B]">
                  Portafolio
                </p>

                <h3 className="mt-1 text-2xl font-black text-gray-900">
                  Mis propiedades
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Consulta aquí el estado de todas las
                  propiedades que has enviado.
                </p>
              </div>

              <span className="w-fit rounded-full bg-[#17495B]/10 px-4 py-2 text-sm font-bold text-[#17495B]">
                {totalPropiedades}{" "}
                {totalPropiedades === 1
                  ? "propiedad"
                  : "propiedades"}
              </span>
            </div>

            {listaPropiedades.length === 0 ? (
              <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                <Building2
                  size={42}
                  className="mx-auto text-[#17495B]"
                />

                <h4 className="mt-5 text-xl font-black text-gray-900">
                  Todavía no tienes propiedades
                </h4>

                <p className="mx-auto mt-2 max-w-lg text-gray-500">
                  Cuando envíes tu primera propiedad aparecerá
                  aquí y podrás consultar su estado.
                </p>

                <Link
                  href="/panel/propiedades/nueva"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#17495B] px-5 py-3 font-semibold text-white transition hover:bg-[#123B4A]"
                >
                  <Plus size={18} />
                  Subir mi primera propiedad
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {listaPropiedades.map((propiedad) => {
                  const estado =
                    propiedad.estado_publicacion ||
                    "pendiente";

                  return (
                    <div
                      key={propiedad.id}
                      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >
                      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">

                            {estado === "publicada" ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-green-700">
                                <CheckCircle2 size={14} />
                                Publicada
                              </span>
                            ) : estado === "rechazada" ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-700">
                                <XCircle size={14} />
                                Rechazada
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
                                <Clock3 size={14} />
                                Pendiente
                              </span>
                            )}

                            {propiedad.tipo && (
                              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-600">
                                {propiedad.tipo}
                              </span>
                            )}

                            {propiedad.operacion && (
                              <span className="rounded-full bg-[#17495B]/10 px-3 py-1 text-xs font-semibold capitalize text-[#17495B]">
                                {propiedad.operacion}
                              </span>
                            )}
                          </div>

                          <h4 className="mt-4 text-xl font-black text-gray-900">
                            {propiedad.titulo}
                          </h4>

                          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">

                            {propiedad.ciudad && (
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin size={16} />
                                {propiedad.ciudad}
                              </span>
                            )}

                            {propiedad.precio != null && (
                              <span className="font-bold text-gray-800">
                                $
                                {Number(
                                  propiedad.precio
                                ).toLocaleString("es-MX")}
                              </span>
                            )}
                          </div>

                          {estado === "pendiente" && (
                            <div className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
                              Esta propiedad está siendo revisada
                              por el equipo de INHOM.
                            </div>
                          )}

                          {estado === "publicada" && (
                            <div className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">
                              Tu propiedad fue aprobada y está
                              lista para publicación.
                            </div>
                          )}

                          {estado === "rechazada" && (
                            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3">
                              <p className="text-sm font-bold text-red-800">
                                Esta propiedad requiere
                                correcciones.
                              </p>

                              {propiedad.motivo_rechazo && (
                                <p className="mt-1 text-sm text-red-700">
                                  <strong>Motivo:</strong>{" "}
                                  {
                                    propiedad.motivo_rechazo
                                  }
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* SOCIO: SOLO VER */}

                        <div className="shrink-0">
                          <Link
                            href={`/panel/propiedades/${propiedad.id}`}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#17495B] px-5 py-3 font-semibold text-[#17495B] transition hover:bg-[#17495B] hover:text-white md:w-auto"
                          >
                            <Eye size={18} />
                            Ver propiedad
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =====================================================
            ADMIN — PROPIEDADES PENDIENTES
        ===================================================== */}

        {esAdmin && (
          <div className="mt-10">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#17495B]">
                  Revisión
                </p>

                <h3 className="mt-1 text-2xl font-black text-gray-900">
                  Propiedades pendientes
                </h3>
              </div>

              <span className="rounded-full bg-[#17495B]/10 px-4 py-2 text-sm font-bold text-[#17495B]">
                {totalPendientes} pendientes
              </span>
            </div>

            {propiedadesPendientes.length === 0 ? (
              <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <CheckCircle2
                  size={36}
                  className="mx-auto text-[#17495B]"
                />

                <h4 className="mt-4 text-lg font-bold text-gray-900">
                  No hay propiedades pendientes
                </h4>

                <p className="mt-2 text-gray-500">
                  Cuando un socio envíe una propiedad,
                  aparecerá aquí para revisión.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {propiedadesPendientes.map(
                  (propiedad) => (
                    <div
                      key={propiedad.id}
                      className="flex flex-col justify-between gap-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
                            Pendiente
                          </span>

                          {propiedad.tipo && (
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-600">
                              {propiedad.tipo}
                            </span>
                          )}
                        </div>

                        <h4 className="mt-3 text-xl font-black text-gray-900">
                          {propiedad.titulo}
                        </h4>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">

                          {propiedad.operacion && (
                            <span className="capitalize">
                              {propiedad.operacion}
                            </span>
                          )}

                          {propiedad.ciudad && (
                            <span>
                              {propiedad.ciudad}
                            </span>
                          )}

                          {propiedad.precio != null && (
                            <span className="font-semibold text-gray-700">
                              $
                              {Number(
                                propiedad.precio
                              ).toLocaleString("es-MX")}
                            </span>
                          )}
                        </div>
                      </div>

                      <Link
                        href={`/panel/propiedades/${propiedad.id}`}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#17495B] px-5 py-3 font-semibold text-[#17495B] transition hover:bg-[#17495B] hover:text-white"
                      >
                        <Eye size={18} />
                        Revisar
                      </Link>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        )}

        {/* =====================================================
            ADMIN — TODAS LAS PROPIEDADES
        ===================================================== */}

        {esAdmin && (
          <div className="mt-12">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#17495B]">
                  Administración
                </p>

                <h3 className="mt-1 text-2xl font-black text-gray-900">
                  Todas las propiedades
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Consulta, busca y administra todas las propiedades registradas en INHOM.
                </p>
              </div>

              <span className="w-fit rounded-full bg-[#17495B]/10 px-4 py-2 text-sm font-bold text-[#17495B]">
                {totalPropiedades}{" "}
                {totalPropiedades === 1 ? "propiedad" : "propiedades"}
              </span>
            </div>

            <PropertyAdminList propiedades={listaPropiedades} />
          </div>
        )}

        {/* =====================================================
            ADMINISTRACIÓN DE SOCIOS
        ===================================================== */}

        {esAdmin && (
  <PartnerAdminList
    socios={socios}
    adminId={user.id}
  />
)}
      </section>
    </main>
  );
}