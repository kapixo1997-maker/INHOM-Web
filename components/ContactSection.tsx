"use client";

import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="bg-[#17495B] py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Encabezado */}
        <div className="text-center">

          <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
            Contáctanos
          </span>

          <h2 className="mt-6 text-4xl font-extrabold md:text-5xl">
            ¿Encontraste la propiedad ideal?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
            Nuestro equipo está listo para ayudarte durante todo el
            proceso de compra. Ponte en contacto con nosotros y recibe
            asesoría personalizada.
          </p>

        </div>

        {/* Información de contacto */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">

          {/* Teléfono */}
          <a
            href="tel:+529831543460"
            className="group rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:bg-white/15"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Phone
                size={26}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Teléfono
            </h3>

            <p className="mt-3 text-white/70">
              +52 983 154 3460
            </p>
          </a>

          {/* Correo */}
          <a
            href="mailto:jnava@outlook.es"
            className="group rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:bg-white/15"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Mail
                size={26}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <h3 className="mt-6 text-2xl font-bold">
              Correo
            </h3>

            <p className="mt-3 break-all text-white/70">
              jnava@outlook.es
            </p>
          </a>

          {/* Ubicación */}
          <a
  href="https://www.google.com/maps/search/?api=1&query=Av.%20de%20los%20H%C3%A9roes%20310%2C%20entre%20Justo%20Sierra%20y%20Bugambilias%2C%2077010%20Chetumal%2C%20Quintana%20Roo"
  target="_blank"
  rel="noopener noreferrer"
  className="group rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:bg-white/15"
>
  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
    <MapPin
      size={26}
      className="transition-transform duration-300 group-hover:scale-110"
    />
  </div>

  <h3 className="mt-6 text-2xl font-bold">
    Ubicación
  </h3>

  <p className="mt-3 text-white/70">
    Av. de los Héroes #310
  </p>

  <p className="mt-1 text-sm text-white/50">
    Entre Justo Sierra y Bugambilias
  </p>

  <p className="mt-1 text-sm text-white/50">
    Chetumal, Quintana Roo · 77010
  </p>
</a>

        </div>

        {/* WhatsApp */}
        <div className="mt-14 flex justify-center">

          <a
            href="https://wa.me/529831543460?text=Hola%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20una%20propiedad%20de%20INHOM."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-2xl bg-[#25D366] px-10 py-5 text-lg font-bold shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#20BE5C] hover:shadow-2xl"
          >
            <MessageCircle
              size={24}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            Hablar por WhatsApp
          </a>

        </div>

      </div>
    </section>
  );
}