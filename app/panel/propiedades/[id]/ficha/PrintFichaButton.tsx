"use client";

import { Download } from "lucide-react";

type PrintFichaButtonProps = {
  propertyId: string;
};

export default function PrintFichaButton({
  propertyId,
}: PrintFichaButtonProps) {
  const descargarPDF = () => {
    window.location.href = `/api/propiedades/${propertyId}/ficha-pdf`;
  };

  return (
    <button
      type="button"
      onClick={descargarPDF}
      className="inline-flex items-center gap-2 rounded-xl bg-[#17495B] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#123E4C]"
    >
      <Download size={18} />
      Descargar ficha PDF
    </button>
  );
}