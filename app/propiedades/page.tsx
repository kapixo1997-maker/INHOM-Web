export default function PropiedadesPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-[#17495B] text-center">
          Nuestras Propiedades
        </h1>

        <p className="text-center text-gray-600 mt-4 mb-12">
          Encuentra la propiedad ideal para ti.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0?w=900"
              className="w-full h-64 object-cover"
            />

            <div className="p-6">

              <h2 className="text-2xl font-bold">
                Casa Residencial
              </h2>

              <p className="text-gray-600 mt-2">
                3 habitaciones • 2 baños • Cochera
              </p>

              <p className="text-2xl font-bold text-[#17495B] mt-4">
                $2,950,000
              </p>

              <button className="mt-6 w-full bg-[#17495B] text-white py-3 rounded-xl hover:bg-[#123847] transition">
                Ver detalles
              </button>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}