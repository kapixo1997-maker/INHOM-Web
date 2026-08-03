import SimilarProperties from "@/components/SimilarProperties";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyInfo from "@/components/PropertyInfo";
import { propiedades } from "@/data/propiedades";

export default async function PaginaPropiedad({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const propiedad = propiedades.find((p) => p.id === id);

  if (!propiedad) {
    return <h1>Propiedad no encontrada</h1>;
  }

  return (
    <div className="max-w-7xl mx-auto p-10">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Columna izquierda */}
        <PropertyGallery
          imagenes={propiedad.imagenes}
          nombre={propiedad.nombre}
        />

        {/* Columna derecha */}
        <PropertyInfo propiedad={propiedad} />

      </div>
      <SimilarProperties propiedadActualId={propiedad.id} />
    </div>
  );
}