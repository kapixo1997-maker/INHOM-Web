export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="bg-[#17495B] py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
            Contáctanos
          </span>

          <h2 className="mt-6 text-5xl font-extrabold">
            ¿Encontraste la propiedad ideal?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200">
            Nuestro equipo está listo para ayudarte durante todo el
            proceso de compra. Ponte en contacto con nosotros y recibe
            asesoría personalizada.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
            <div className="text-5xl">📞</div>

            <h3 className="mt-6 text-2xl font-bold">
              Teléfono
            </h3>

            <p className="mt-3 text-gray-200">
              +52 983 154 3460
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
            <div className="text-5xl">✉️</div>

            <h3 className="mt-6 text-2xl font-bold">
              Correo
            </h3>

            <p className="mt-3 text-gray-200">
              jnava@outlook.es
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
            <div className="text-5xl">📍</div>

            <h3 className="mt-6 text-2xl font-bold">
              Ubicación
            </h3>

            <p className="mt-3 text-gray-200">
              Chetumal, Quintana Roo
            </p>
          </div>

        </div>

        <div className="mt-16 flex justify-center">

          <a
            href="https://wa.me/529831543460"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-green-600 px-10 py-5 text-lg font-bold transition hover:scale-105 hover:bg-green-700"
          >
            💬 Hablar por WhatsApp
          </a>

        </div>

      </div>
    </section>
  );
}