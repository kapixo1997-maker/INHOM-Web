type Props = {
  tipo: "todos" | "casa" | "terreno";
  onChange: (tipo: "todos" | "casa" | "terreno") => void;
};

export default function PropertyFilters({
  tipo,
  onChange,
}: Props) {
  const estilos = (activo: boolean) =>
    `rounded-full px-6 py-3 font-semibold transition ${
      activo
        ? "bg-[#17495B] text-white"
        : "bg-gray-100 hover:bg-gray-200"
    }`;

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-4">
      <button
        onClick={() => onChange("todos")}
        className={estilos(tipo === "todos")}
      >
        Todas
      </button>

      <button
        onClick={() => onChange("casa")}
        className={estilos(tipo === "casa")}
      >
        🏠 Casas
      </button>

      <button
        onClick={() => onChange("terreno")}
        className={estilos(tipo === "terreno")}
      >
        🌳 Terrenos
      </button>
    </div>
  );
}