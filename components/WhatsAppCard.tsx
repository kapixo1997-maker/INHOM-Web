import { MessageCircle, ShieldCheck, Clock3 } from "lucide-react";

type Props = {
  nombre: string;
};

export default function WhatsAppCard({ nombre }: Props) {
  return (
    <div className="mt-10 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg">

      <h3 className="text-2xl font-bold text-[#17495B]">
        ¿Te interesa esta propiedad?
      </h3>

      <p className="mt-3 leading-7 text-gray-600">
        Nuestro equipo de <strong>INHOM</strong> resolverá tus dudas y te acompañará
        durante todo el proceso de compra.
      </p>

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-3">
          <ShieldCheck className="text-green-600" size={20} />
          <span>Asesoría personalizada.</span>
        </div>

        <div className="flex items-center gap-3">
          <MessageCircle className="text-green-600" size={20} />
          <span>Información completa de la propiedad.</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock3 className="text-green-600" size={20} />
          <span>Respuesta rápida en horario laboral.</span>
        </div>

      </div>

      <a
        href={`https://wa.me/529831543460?text=${encodeURIComponent(
          `Hola 👋, me interesa la propiedad "${nombre}" que vi en la página de INHOM. ¿Podrían brindarme más información?`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      >
        <MessageCircle size={24} />
        Solicitar información por WhatsApp
      </a>

    </div>
  );
}