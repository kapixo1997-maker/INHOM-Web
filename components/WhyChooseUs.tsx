import { ShieldCheck, Handshake, Home, Clock3 } from "lucide-react";

export default function WhyChooseUs() {
  const items = [
    {
      icon: <ShieldCheck size={40} />,
      title: "Compra segura",
      description:
        "Te acompañamos durante todo el proceso para que compres con tranquilidad.",
    },
    {
      icon: <Handshake size={40} />,
      title: "Asesoría personalizada",
      description:
        "Cada cliente recibe atención personalizada según sus necesidades.",
    },
    {
      icon: <Home size={40} />,
      title: "Propiedades verificadas",
      description:
        "Trabajamos con propiedades revisadas y listas para su comercialización.",
    },
    {
      icon: <Clock3 size={40} />,
      title: "Atención rápida",
      description:
        "Respondemos tus dudas y solicitudes lo antes posible.",
    },
  ];

  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-[#17495B]/10 px-4 py-2 text-sm font-semibold text-[#17495B]">
            ¿Por qué elegirnos?
          </span>

          <h2 className="mt-6 text-5xl font-bold text-[#17495B]">
            Tu patrimonio está en buenas manos
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
            En INHOM nos enfocamos en brindarte un servicio profesional,
            transparente y cercano para ayudarte a encontrar la propiedad ideal.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-8 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="text-[#17495B]">
                {item.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {item.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
} 