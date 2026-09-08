"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  X,
  Expand,
} from "lucide-react";

type GaleriaPropiedadProps = {
  imagenes: string[];
  titulo: string;
  operacion?: string | null;
  tipo?: string | null;
};

export default function GaleriaPropiedad({
  imagenes,
  titulo,
  operacion,
  tipo,
}: GaleriaPropiedadProps) {
  const [imagenActiva, setImagenActiva] = useState(0);
  const [visorAbierto, setVisorAbierto] = useState(false);

  const totalImagenes = imagenes.length;

  const anterior = () => {
    if (totalImagenes === 0) return;

    setImagenActiva((actual) =>
      actual === 0 ? totalImagenes - 1 : actual - 1
    );
  };

  const siguiente = () => {
    if (totalImagenes === 0) return;

    setImagenActiva((actual) =>
      actual === totalImagenes - 1 ? 0 : actual + 1
    );
  };

  const abrirVisor = (index: number) => {
    setImagenActiva(index);
    setVisorAbierto(true);
  };

  const cerrarVisor = () => {
    setVisorAbierto(false);
  };

  // ==========================================
  // TECLADO + BLOQUEO DE SCROLL
  // ==========================================

  useEffect(() => {
    if (!visorAbierto) return;

    const manejarTeclado = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        cerrarVisor();
      }

      if (event.key === "ArrowLeft") {
        anterior();
      }

      if (event.key === "ArrowRight") {
        siguiente();
      }
    };

    const overflowAnterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", manejarTeclado);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", manejarTeclado);
    };
  }, [visorAbierto, totalImagenes]);

  // ==========================================
  // SIN FOTOGRAFÍAS
  // ==========================================

  if (totalImagenes === 0) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-gray-200 bg-white shadow-sm">
        <div className="text-center">
          <Images
            size={70}
            className="mx-auto text-[#17495B]/20"
          />

          <p className="mt-5 font-semibold text-gray-400">
            Fotografías próximamente
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // IMÁGENES DE VISTA PREVIA
  // ==========================================

  const imagenPrincipal = imagenes[0];
  const secundarias = imagenes.slice(1, 4);
  const imagenesRestantes = Math.max(totalImagenes - 4, 0);

  return (
    <>
      <div className="w-full min-w-0">
        {/* ========================================== */}
        {/* GALERÍA EDITORIAL - ESCRITORIO */}
        {/* ========================================== */}

        <div className="hidden h-[500px] grid-cols-[1.65fr_0.85fr] gap-3 lg:grid">
          {/* IMAGEN PRINCIPAL */}

          <button
            type="button"
            onClick={() => abrirVisor(0)}
            className="group relative h-full min-w-0 cursor-zoom-in overflow-hidden rounded-l-3xl bg-gray-200"
            aria-label="Abrir fotografía principal"
          >
            <img
              src={imagenPrincipal}
              alt={`Fotografía principal de ${titulo}`}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            />

            <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />

            {operacion && (
              <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#17495B] shadow-md">
                {operacion}
              </span>
            )}

            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/65 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-sm">
              <Images size={16} />
              {totalImagenes}{" "}
              {totalImagenes === 1 ? "fotografía" : "fotografías"}
            </div>

            <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-black/65 px-4 py-2 text-sm font-bold text-white opacity-0 shadow-lg backdrop-blur-sm transition group-hover:opacity-100">
              <Expand size={17} />
              Ampliar
            </div>
          </button>

          {/* COLUMNA SECUNDARIA */}

          <div className="grid h-full min-w-0 grid-rows-3 gap-3">
            {secundarias.map((imagen, posicion) => {
              const indexReal = posicion + 1;
              const esUltimaVisible =
                posicion === secundarias.length - 1 &&
                imagenesRestantes > 0;

              return (
                <button
                  key={`${imagen}-${indexReal}`}
                  type="button"
                  onClick={() =>
                    esUltimaVisible
                      ? abrirVisor(indexReal)
                      : abrirVisor(indexReal)
                  }
                  className={`group relative min-h-0 min-w-0 overflow-hidden bg-gray-200 ${
                    posicion === 0 ? "rounded-tr-3xl" : ""
                  } ${
                    posicion === secundarias.length - 1
                      ? "rounded-br-3xl"
                      : ""
                  }`}
                  aria-label={
                    esUltimaVisible
                      ? `Ver las ${totalImagenes} fotografías`
                      : `Abrir fotografía ${indexReal + 1}`
                  }
                >
                  <img
                    src={imagen}
                    alt={`Fotografía ${indexReal + 1} de ${titulo}`}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />

                  <div
                    className={`absolute inset-0 transition duration-300 ${
                      esUltimaVisible
                        ? "bg-black/45 group-hover:bg-black/55"
                        : "bg-black/0 group-hover:bg-black/10"
                    }`}
                  />

                  {posicion === 0 && tipo && (
                    <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[#17495B] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                      {tipo}
                    </span>
                  )}

                  {esUltimaVisible && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <Images size={27} />

                      <span className="mt-2 text-xl font-black">
                        +{imagenesRestantes}
                      </span>

                      <span className="mt-1 text-xs font-bold uppercase tracking-wider text-white/90">
                        Ver todas
                      </span>
                    </div>
                  )}
                </button>
              );
            })}

            {/* RELLENO SI HAY MENOS DE 4 FOTOS */}

            {Array.from({
              length: Math.max(3 - secundarias.length, 0),
            }).map((_, index) => (
              <div
                key={`relleno-${index}`}
                className={`flex min-h-0 items-center justify-center bg-gray-100 ${
                  secundarias.length + index === 0
                    ? "rounded-tr-3xl"
                    : ""
                } ${
                  secundarias.length + index === 2
                    ? "rounded-br-3xl"
                    : ""
                }`}
              >
                <Images size={28} className="text-gray-300" />
              </div>
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* GALERÍA TABLET / MÓVIL */}
        {/* ========================================== */}

        <div className="lg:hidden">
          <div className="group relative overflow-hidden rounded-3xl bg-black shadow-sm">
            <button
              type="button"
              onClick={() => abrirVisor(imagenActiva)}
              className="relative block w-full cursor-zoom-in overflow-hidden"
              aria-label="Abrir fotografía en pantalla completa"
            >
              <img
                src={imagenes[imagenActiva]}
                alt={`Fotografía ${imagenActiva + 1} de ${titulo}`}
                className="h-[340px] w-full object-cover sm:h-[460px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
            </button>

            {operacion && (
              <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#17495B] shadow-md">
                {operacion}
              </span>
            )}

            {tipo && (
              <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-[#17495B] px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                {tipo}
              </span>
            )}

            {totalImagenes > 1 && (
              <>
                <button
                  type="button"
                  onClick={anterior}
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm"
                  aria-label="Fotografía anterior"
                >
                  <ChevronLeft size={25} />
                </button>

                <button
                  type="button"
                  onClick={siguiente}
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm"
                  aria-label="Fotografía siguiente"
                >
                  <ChevronRight size={25} />
                </button>
              </>
            )}

            <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/65 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-sm">
              <Images size={16} />
              {imagenActiva + 1} / {totalImagenes}
            </div>

            <button
              type="button"
              onClick={() => abrirVisor(imagenActiva)}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-black/65 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-sm"
            >
              <Expand size={16} />
              Ver galería
            </button>
          </div>

          {/* MINIATURAS LIMITADAS EN MÓVIL */}

          {totalImagenes > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5">
              {imagenes.slice(0, 5).map((imagen, index) => {
                const activa = imagenActiva === index;
                const esUltima =
                  index === Math.min(totalImagenes, 5) - 1 &&
                  totalImagenes > 5;

                return (
                  <button
                    key={`movil-${imagen}-${index}`}
                    type="button"
                    onClick={() =>
                      esUltima
                        ? abrirVisor(index)
                        : setImagenActiva(index)
                    }
                    className={`relative h-16 min-w-0 overflow-hidden rounded-xl border-2 bg-gray-100 transition sm:h-20 ${
                      activa
                        ? "border-[#17495B]"
                        : "border-transparent"
                    }`}
                    aria-label={
                      esUltima
                        ? `Ver las ${totalImagenes} fotografías`
                        : `Ver fotografía ${index + 1}`
                    }
                  >
                    <img
                      src={imagen}
                      alt={`Miniatura ${index + 1} de ${titulo}`}
                      className="h-full w-full object-cover"
                    />

                    {esUltima && (
                      <>
                        <div className="absolute inset-0 bg-black/55" />

                        <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-white">
                          +{totalImagenes - 5}
                        </div>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* TOTAL */}

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Images size={17} className="text-[#17495B]" />

            <span>
              {totalImagenes}{" "}
              {totalImagenes === 1 ? "fotografía" : "fotografías"}
            </span>
          </div>

          {totalImagenes > 1 && (
            <button
              type="button"
              onClick={() => abrirVisor(0)}
              className="text-sm font-bold text-[#17495B] transition hover:text-[#123847]"
            >
              Ver galería completa
            </button>
          )}
        </div>
      </div>

      {/* ========================================== */}
      {/* VISOR PANTALLA COMPLETA */}
      {/* ========================================== */}

      {visorAbierto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${titulo}`}
          onClick={cerrarVisor}
        >
          {/* CERRAR */}

          <button
            type="button"
            onClick={cerrarVisor}
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-6 sm:top-6"
            aria-label="Cerrar galería"
          >
            <X size={25} />
          </button>

          {/* CONTADOR */}

          <div className="absolute left-4 top-4 z-20 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md sm:left-6 sm:top-6">
            {imagenActiva + 1} / {totalImagenes}
          </div>

          {/* IMAGEN */}

          <div
            className="flex h-full w-full items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={imagenes[imagenActiva]}
              alt={`Fotografía ${imagenActiva + 1} de ${titulo}`}
              className="max-h-[82vh] max-w-full select-none object-contain"
              draggable={false}
            />
          </div>

          {/* FLECHAS */}

          {totalImagenes > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  anterior();
                }}
                className="absolute left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:left-6 sm:h-14 sm:w-14"
                aria-label="Fotografía anterior"
              >
                <ChevronLeft size={30} />
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  siguiente();
                }}
                className="absolute right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-6 sm:h-14 sm:w-14"
                aria-label="Fotografía siguiente"
              >
                <ChevronRight size={30} />
              </button>
            </>
          )}

          {/* MINIATURAS DEL VISOR */}

          {totalImagenes > 1 && (
            <div
              className="absolute bottom-4 left-1/2 z-20 flex max-w-[88vw] -translate-x-1/2 gap-2 overflow-x-auto rounded-2xl bg-black/40 p-2 backdrop-blur-md sm:bottom-6"
              onClick={(event) => event.stopPropagation()}
            >
              {imagenes.map((imagen, index) => (
                <button
                  key={`visor-${imagen}-${index}`}
                  type="button"
                  onClick={() => setImagenActiva(index)}
                  className={`h-14 min-w-[70px] overflow-hidden rounded-xl border-2 transition sm:h-16 sm:min-w-[90px] ${
                    imagenActiva === index
                      ? "border-white opacity-100"
                      : "border-transparent opacity-50 hover:opacity-100"
                  }`}
                  aria-label={`Abrir fotografía ${index + 1}`}
                >
                  <img
                    src={imagen}
                    alt=""
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}