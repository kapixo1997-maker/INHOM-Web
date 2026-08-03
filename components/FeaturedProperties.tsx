"use client";

import { useMemo, useState } from "react";

import { propiedades } from "../data/propiedades";
import PropertyCard from "./PropertyCard";
import SearchBar from "./SearchBar";
import PropertyFilters from "./PropertyFilters";

export default function FeaturedProperties() {
  const [busqueda, setBusqueda] = useState("");
  const [tipo, setTipo] = useState<"todos" | "casa" | "terreno">("todos");

  const propiedadesFiltradas = useMemo(() => {
    const texto = busqueda.toLowerCase();

    return propiedades.filter((propiedad) => {
      const coincideBusqueda =
        propiedad.nombre.toLowerCase().includes(texto) ||
        propiedad.ubicacion.toLowerCase().includes(texto);

      const coincideTipo =
        tipo === "todos" || propiedad.tipo === tipo;

      return coincideBusqueda && coincideTipo;
    });
  }, [busqueda, tipo]);

  return (
    <section id="propiedades" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center text-4xl font-bold text-[#17495B]">
          Propiedades Destacadas
        </h2>

        <p className="mt-4 mb-10 text-center text-gray-600">
          Encuentra la propiedad perfecta para ti.
        </p>

        <PropertyFilters
          tipo={tipo}
          onChange={setTipo}
        />

        <SearchBar
          valor={busqueda}
          onChange={setBusqueda}
        />

        <div className="grid gap-8 md:grid-cols-3">
          {propiedadesFiltradas.map((propiedad) => (
            <PropertyCard
              key={propiedad.id}
              propiedad={propiedad}
            />
          ))}
        </div>

        {propiedadesFiltradas.length === 0 && (
          <div className="mt-12 text-center text-lg text-gray-500">
            No encontramos propiedades con esa búsqueda.
          </div>
        )}

      </div>
    </section>
  );
}