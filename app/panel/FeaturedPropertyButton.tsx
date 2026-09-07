"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Star } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

type FeaturedPropertyButtonProps = {
  propiedadId: string;
  destacada: boolean;
};

export default function FeaturedPropertyButton({
  propiedadId,
  destacada,
}: FeaturedPropertyButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cambiarDestacada = async () => {
    if (loading) return;

    setLoading(true);
    setError("");

    const supabase = createClient();

    const { error: updateError } = await supabase
      .from("properties")
      .update({ destacada: !destacada })
      .eq("id", propiedadId);

    if (updateError) {
      console.error("Error al cambiar propiedad destacada:", updateError);
      setError("No se pudo actualizar");
      setLoading(false);
      return;
    }

    router.refresh();
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        disabled={loading}
        onClick={cambiarDestacada}
        className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
          destacada
            ? "border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
            : "border-gray-300 bg-white text-gray-700 hover:border-yellow-300 hover:bg-yellow-50 hover:text-yellow-700"
        }`}
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Star size={18} fill={destacada ? "currentColor" : "none"} />
        )}

        {destacada ? "Quitar destacada" : "Destacar en inicio"}
      </button>

      {error && (
        <span className="text-center text-xs font-semibold text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}