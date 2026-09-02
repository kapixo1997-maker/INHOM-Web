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
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-black text-gray-900">
            Propiedad no encontrada
          </h1>

          <p className="mt-4 text-gray-500">
            La propiedad que buscas no existe o ya no está disponible.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white">

      {/* Información principal */}
      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-8">

          {/* Galería */}
          <PropertyGallery
            imagenes={propiedad.imagenes}
            nombre={propiedad.nombre}
          />

          {/* Información */}
          <PropertyInfo propiedad={propiedad} />

        </div>
      </section>

      {/* Propiedades similares */}
      <section className="border-t border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <SimilarProperties
            propiedadActualId={propiedad.id}
          />

        </div>
      </section>

    </main>
  );
}