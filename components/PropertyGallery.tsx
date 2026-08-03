"use client";

import { useState } from "react";

type Props = {
  imagenes: string[];
  nombre: string;
};

export default function PropertyGallery({ imagenes, nombre }: Props) {
  const [imagenActual, setImagenActual] = useState(imagenes[0]);
  
  const [lightboxAbierto, setLightboxAbierto] = useState(false);

  return (
    <div>
     <div className="group relative rounded-2xl overflow-hidden shadow-2xl">
        <img
  src={imagenActual}
  alt={nombre}
  onClick={() => setLightboxAbierto(true)}
  className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
/>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {imagenes.map((imagen, index) => (
          <img
            key={index}
            src={imagen}
            alt={`${nombre} ${index + 1}`}
            onClick={() => setImagenActual(imagen)}
            className={`h-32 w-full object-cover rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
  imagenActual === imagen
    ? "ring-4 ring-[#17495B] scale-95"
    : "opacity-80 hover:opacity-100"
}`}
          />
         ))}
      </div>

      {/* Lightbox */}
      {lightboxAbierto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setLightboxAbierto(false)}
        >
          <img
            src={imagenActual}
            alt={nombre}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}