"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, Loader2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type EstadoComercial = "disponible" | "vendida" | "rentada";

type Props = {
  propiedadId: string;
  estadoActual: string | null;
};

const estados: {
  value: EstadoComercial;
  label: string;
  icono: string;
}[] = [
  {
    value: "disponible",
    label: "Disponible",
    icono: "🟢",
  },
  {
    value: "vendida",
    label: "Vendida",
    icono: "🔴",
  },
  {
    value: "rentada",
    label: "Rentada",
    icono: "🔵",
  },
];

export default function PropertyStatusButton({
  propiedadId,
  estadoActual,
}: Props) {
  const router = useRouter();

  const [abierto, setAbierto] = useState(false);

  const [estado, setEstado] = useState<EstadoComercial>(
    estadoActual === "vendida" || estadoActual === "rentada"
      ? estadoActual
      : "disponible"
  );

  const [error, setError] = useState("");

  const [isPending, startTransition] = useTransition();

  const estadoSeleccionado =
    estados.find((item) => item.value === estado) ?? estados[0];

  async function cambiarEstado(nuevoEstado: EstadoComercial) {
    if (nuevoEstado === estado) {
      setAbierto(false);
      return;
    }

    setError("");

    const estadoAnterior = estado;

    // Cambio visual inmediato
    setEstado(nuevoEstado);
    setAbierto(false);

    const supabase = createClient();

    const { error: updateError } = await supabase
      .from("properties")
      .update({
        estado_comercial: nuevoEstado,
      })
      .eq("id", propiedadId);

    if (updateError) {
      console.error(
        "Error al actualizar el estado comercial:",
        updateError
      );

      // Regresamos al estado anterior si Supabase falla
      setEstado(estadoAnterior);

      setError("No se pudo cambiar el estado.");

      return;
    }

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setAbierto((valor) => !valor)}
        disabled={isPending}
        className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-[#17495B] hover:text-[#17495B] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? (
          <Loader2
            size={17}
            className="animate-spin"
          />
        ) : (
          <span>{estadoSeleccionado.icono}</span>
        )}

        <span>{estadoSeleccionado.label}</span>

        <ChevronDown
          size={16}
          className={`ml-auto transition-transform ${
            abierto ? "rotate-180" : ""
          }`}
        />
      </button>

      {abierto && !isPending && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[190px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-xl">
          {estados.map((item) => {
            const seleccionado = item.value === estado;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => cambiarEstado(item.value)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                  seleccionado
                    ? "bg-[#17495B]/10 text-[#17495B]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span>{item.icono}</span>

                <span className="flex-1">
                  {item.label}
                </span>

                {seleccionado && (
                  <Check size={16} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {error && (
        <p className="absolute right-0 top-full mt-2 whitespace-nowrap text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}