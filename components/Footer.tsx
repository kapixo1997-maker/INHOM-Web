export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#17495B] text-white py-12">
      <div className="mx-auto max-w-7xl px-6 grid gap-10 md:grid-cols-3">

        <div>
          <h2 className="text-3xl font-bold">INHOM</h2>
          <p className="mt-4 text-gray-200">
            Especialistas en la venta de casas, terrenos e inversiones
            inmobiliarias en Chetumal, Quintana Roo.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contacto</h3>

          <p>📞 +52 983 154 3460</p>
          <p className="mt-2">📧 jnava@outlook.es</p>
          <p className="mt-2">📍 Chetumal, Quintana Roo</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Horario</h3>

          <p>Lunes a Viernes</p>
          <p>9:00 AM - 7:00 PM</p>

          <a
            href="https://wa.me/529831543460"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-700"
          >
            WhatsApp
          </a>
        </div>

      </div>

      <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} INHOM. Todos los derechos reservados.
      </div>
    </footer>
  );
}