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

  return (
    <>
      {/* ========================================== */}
      {/* GALERÍA PRINCIPAL */}
      {/* ========================================== */}

      <div>
        <div className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-black shadow-sm">
          <button
            type="button"
            onClick={() => abrirVisor(imagenActiva)}
            className="relative block min-h-[420px] w-full cursor-zoom-in overflow-hidden"
            aria-label="Abrir fotografía en pantalla completa"
          >
            <img
              src={imagenes[imagenActiva]}
              alt={`Fotografía ${imagenActiva + 1} de ${titulo}`}
              className="h-[420px] w-full object-cover transition duration-500 group-hover:scale-[1.02] sm:h-[500px]"
            />

            {/* Oscurecimiento al pasar el mouse */}
            <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />

            {/* Botón ampliar */}
            <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-black/65 px-4 py-2 text-sm font-bold text-white opacity-100 shadow-lg backdrop-blur-sm transition sm:opacity-0 sm:group-hover:opacity-100">
              <Expand size={17} />
              Ampliar
            </div>
          </button>

          {/* OPERACIÓN */}

          {operacion && (
            <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#17495B] shadow-md">
              {operacion}
            </span>
          )}

          {/* TIPO */}

          {tipo && (
            <span className="pointer-events-none absolute right-5 top-5 rounded-full bg-[#17495B] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md">
              {tipo}
            </span>
          )}

          {/* FLECHA IZQUIERDA */}

          {totalImagenes > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                anterior();
              }}
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-black/75"
              aria-label="Fotografía anterior"
            >
              <ChevronLeft size={25} />
            </button>
          )}

          {/* FLECHA DERECHA */}

          {totalImagenes > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                siguiente();
              }}
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white shadow-lg backdrop-blur-sm transition hover:scale-105 hover:bg-black/75"
              aria-label="Fotografía siguiente"
            >
              <ChevronRight size={25} />
            </button>
          )}

          {/* CONTADOR */}

          <div className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/65 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-sm">
            <Images size={16} />

            {imagenActiva + 1} / {totalImagenes}
          </div>
        </div>

        {/* ========================================== */}
        {/* MINIATURAS */}
        {/* ========================================== */}

        {totalImagenes > 1 && (
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            {imagenes.map((imagen, index) => {
              const activa = imagenActiva === index;

              return (
                <button
                  key={`${imagen}-${index}`}
                  type="button"
                  onClick={() => setImagenActiva(index)}
                  className={`relative h-24 min-w-[120px] overflow-hidden rounded-2xl border-2 bg-gray-100 transition ${
                    activa
                      ? "border-[#17495B] shadow-md"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`Ver fotografía ${index + 1}`}
                >
                  <img
                    src={imagen}
                    alt={`Miniatura ${index + 1} de ${titulo}`}
                    className="h-full w-full object-cover"
                  />

                  {activa && (
                    <div className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-[#17495B]/20" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* TOTAL */}

        <div className="mt-3 flex items-center gap-2 text-sm font-medium text-gray-500">
          <Images size={17} className="text-[#17495B]" />

          <span>
            {totalImagenes}{" "}
            {totalImagenes === 1 ? "fotografía" : "fotografías"}
          </span>
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

          {/* CONTADOR SUPERIOR */}

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
              className="max-h-[85vh] max-w-full select-none object-contain"
              draggable={false}
            />
          </div>

          {/* ANTERIOR */}

          {totalImagenes > 1 && (
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
          )}

          {/* SIGUIENTE */}

          {totalImagenes > 1 && (
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
          )}

          {/* MINIATURAS DEL VISOR */}

          {totalImagenes > 1 && (
            <div
              className="absolute bottom-4 left-1/2 z-20 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto rounded-2xl bg-black/40 p-2 backdrop-blur-md sm:bottom-6"
              onClick={(event) => event.stopPropagation()}
            >
              {imagenes.map((imagen, index) => (
                <button
                  key={`visor-${imagen}-${index}`}
                  type="button"
                  onClick={() => setImagenActiva(index)}
                  className={`h-14 min-w-[75px] overflow-hidden rounded-xl border-2 transition sm:h-16 sm:min-w-[90px] ${
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