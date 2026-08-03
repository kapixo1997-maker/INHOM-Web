import { propiedades } from "@/data/propiedades";
import PropertyCard from "./PropertyCard";

type Props = {
  propiedadActualId: string;
};

export default function SimilarProperties({
  propiedadActualId,
}: Props) {
  const similares = propiedades
    .filter((p) => p.id !== propiedadActualId)
    .slice(0, 3);

  if (similares.length === 0) return null;

  return (
    <section className="mt-24">
      <h2 className="mb-8 text-3xl font-bold text-[#17495B]">
        También te puede interesar
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {similares.map((propiedad) => (
          <PropertyCard
            key={propiedad.id}
            propiedad={propiedad}
          />
        ))}
      </div>
    </section>
  );
}