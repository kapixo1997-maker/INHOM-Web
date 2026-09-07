"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  MapPin,
  Search,
  Star,
} from "lucide-react";

import DeletePropertyButton from "./DeletePropertyButton";
import FeaturedPropertyButton from "./FeaturedPropertyButton";
import PropertyStatusButton from "./PropertyStatusButton";

type Property = {
  id: string;
  titulo: string;
  tipo: string | null;
  operacion: string | null;
  precio: number | null;
  ciudad: string | null;
  estado_publicacion: string | null;
  estado_comercial: string | null;
  destacada: boolean | null;
};

type Props = {
  propiedades: Property[];
};

type Filtro =
  | "todas"
  | "disponible"
  | "vendida"
  | "rentada"
  | "destacadas";

export default function PropertyAdminList({
  propiedades,
}: Props) {
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todas");

  const propiedadesFiltradas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return propiedades.filter((propiedad) => {
      const coincideBusqueda =
        !texto ||
        propiedad.titulo.toLowerCase().includes(texto) ||
        propiedad.ciudad?.toLowerCase().includes(texto) ||
        propiedad.tipo?.toLowerCase().includes(texto) ||
        propiedad.operacion?.toLowerCase().includes(texto);

      let coincideFiltro = true;

      if (filtro === "destacadas") {
        coincideFiltro = Boolean(propiedad.destacada);
      } else if (filtro !== "todas") {
        const estado =
          propiedad.estado_comercial || "disponible";

        coincideFiltro = estado === filtro;
      }

      return coincideBusqueda && coincideFiltro;
    });
  }, [propiedades, busqueda, filtro]);

  return (
    <div>
      {/* BUSCADOR */}

      <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="relative">
          <Search
            size={20}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={busqueda}
            onChange={(event) => setBusqueda(event.target.value)}
            placeholder="Buscar por nombre, ciudad, tipo..."
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition focus:border-[#17495B] focus:bg-white focus:ring-4 focus:ring-[#17495B]/10"
          />
        </div>

        {/* FILTROS */}

        <div className="mt-4 flex flex-wrap gap-2">
          <BotonFiltro
            activo={filtro === "todas"}
            onClick={() => setFiltro("todas")}
          >
            Todas
          </BotonFiltro>

          <BotonFiltro
            activo={filtro === "disponible"}
            onClick={() => setFiltro("disponible")}
          >
            🟢 Disponibles
          </BotonFiltro>

          <BotonFiltro
            activo={filtro === "vendida"}
            onClick={() => setFiltro("vendida")}
          >
            🔴 Vendidas
          </BotonFiltro>

          <BotonFiltro
            activo={filtro === "rentada"}
            onClick={() => setFiltro("rentada")}
          >
            🔵 Rentadas
          </BotonFiltro>

          <BotonFiltro
            activo={filtro === "destacadas"}
            onClick={() => setFiltro("destacadas")}
          >
            ⭐ Destacadas
          </BotonFiltro>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Mostrando{" "}
          <strong className="text-gray-800">
            {propiedadesFiltradas.length}
          </strong>{" "}
          de{" "}
          <strong className="text-gray-800">
            {propiedades.length}
          </strong>{" "}
          propiedades.
        </p>
      </div>

      {/* RESULTADOS */}

      {propiedadesFiltradas.length === 0 ? (
        <div className="mt-5 rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <Search
            size={38}
            className="mx-auto text-gray-300"
          />

          <h4 className="mt-4 text-lg font-black text-gray-900">
            No encontramos propiedades
          </h4>

          <p className="mt-2 text-sm text-gray-500">
            Prueba con otra búsqueda o cambia el filtro.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {propiedadesFiltradas.map((propiedad) => {
            const estadoPublicacion =
              propiedad.estado_publicacion || "pendiente";

            const estadoComercial =
              propiedad.estado_comercial || "disponible";

            return (
              <div
                key={propiedad.id}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                  {/* INFORMACIÓN */}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                          estadoPublicacion === "publicada"
                            ? "bg-green-100 text-green-700"
                            : estadoPublicacion === "rechazada"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {estadoPublicacion}
                      </span>

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

                      {estadoPublicacion === "publicada" && (
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                            estadoComercial === "vendida"
                              ? "bg-red-50 text-red-700"
                              : estadoComercial === "rentada"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {estadoComercial}
                        </span>
                      )}

                      {propiedad.destacada && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-yellow-700">
                          <Star
                            size={14}
                            fill="currentColor"
                          />
                          Destacada
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
                  </div>

                  {/* ACCIONES */}

                  <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link
                      href={`/panel/propiedades/${propiedad.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#17495B] px-5 py-3 text-sm font-semibold text-[#17495B] transition hover:bg-[#17495B] hover:text-white"
                    >
                      <Eye size={18} />

                      {estadoPublicacion === "pendiente"
                        ? "Revisar"
                        : "Ver"}
                    </Link>

                    {estadoPublicacion === "publicada" && (
                      <>
                        <FeaturedPropertyButton
                          propiedadId={propiedad.id}
                          destacada={Boolean(propiedad.destacada)}
                        />

                        <PropertyStatusButton
                          propiedadId={propiedad.id}
                          estadoActual={propiedad.estado_comercial}
                        />
                      </>
                    )}

                    <DeletePropertyButton
                      propiedadId={propiedad.id}
                      titulo={propiedad.titulo}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BotonFiltro({
  activo,
  onClick,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-4 py-2.5 text-sm font-bold transition ${
        activo
          ? "bg-[#17495B] text-white shadow-sm"
          : "border border-gray-200 bg-white text-gray-600 hover:border-[#17495B]/40 hover:text-[#17495B]"
      }`}
    >
      {children}
    </button>
  );
}