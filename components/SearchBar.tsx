"use client";

type Props = {
  valor: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ valor, onChange }: Props) {
  return (
    <div className="mb-10">
      <input
        type="text"
        placeholder="Buscar por nombre o ubicación..."
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-gray-300 px-6 py-4 text-lg outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
      />
    </div>
  );
}