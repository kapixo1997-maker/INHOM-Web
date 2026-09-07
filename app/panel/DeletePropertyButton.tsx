"use client";

import { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

import { eliminarPropiedad } from "./actions";

type DeletePropertyButtonProps = {
  propiedadId: string;
  titulo: string;
};

export default function DeletePropertyButton({
  propiedadId,
  titulo,
}: DeletePropertyButtonProps) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (deleting) return;

    setDeleting(true);

    const formData = new FormData();
    formData.append("propiedadId", propiedadId);

    try {
      await eliminarPropiedad(formData);
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar la propiedad.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* BOTÓN ELIMINAR */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:border-red-600 hover:bg-red-600 hover:text-white sm:w-auto"
      >
        <Trash2 size={18} />
        Eliminar
      </button>

      {/* MODAL */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm"
          onMouseDown={() => {
            if (!deleting) setOpen(false);
          }}
        >
          <div
            onMouseDown={(event) => event.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl sm:p-8"
          >
            {/* CERRAR */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={deleting}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>

            {/* ICONO */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
              <AlertTriangle size={28} />
            </div>

            {/* TEXTO */}
            <h3 className="mt-6 text-2xl font-black text-gray-900">
              ¿Eliminar esta propiedad?
            </h3>

            <p className="mt-3 leading-6 text-gray-600">
              Estás a punto de eliminar{" "}
              <span className="font-bold text-gray-900">
                “{titulo}”
              </span>
              .
            </p>

            <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-700">
                Esta acción no se puede deshacer.
              </p>
            </div>

            {/* BOTONES */}
            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={deleting}
                className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Eliminando...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    Sí, eliminar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}