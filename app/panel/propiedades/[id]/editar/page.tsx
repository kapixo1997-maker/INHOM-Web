import { reenviarPropiedad } from "../actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  AlertCircle,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditarPropiedadPage({
  params,
}: PageProps) {
  const { id } = await params;

  const supabase = await createClient();

  // =========================
  // REVISAR SESIÓN
  // =========================

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // =========================
  // OBTENER PERFIL
  // =========================

  const { data: profile } = await supabase
    .from("profiles")
    .select("nombre, rol, activo")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.activo) {
    redirect("/login");
  }

  // =========================
  // OBTENER PROPIEDAD
  // =========================

  const { data: propiedad, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !propiedad) {
    redirect("/panel");
  }

  // =========================
  // SEGURIDAD
  // =========================
  // El socio solamente puede editar SUS propiedades.
  // Además, por ahora solo permitimos corregir
  // propiedades rechazadas.

  if (propiedad.created_by !== user.id) {
    redirect("/panel");
  }

  if (propiedad.estado_publicacion !== "rechazada") {
    redirect(`/panel/propiedades/${id}`);
  }

  return (
    <main className="min-h-screen bg-[#F5F7F7]">
      {/* HEADER */}

      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#17495B]">
              INHOM
            </p>

            <h1 className="mt-1 text-2xl font-black text-gray-900">
              Corregir propiedad
            </h1>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-gray-900">
              {profile.nombre || user.email}
            </p>

            <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
              Socio
            </p>
          </div>
        </div>
      </header>

      {/* CONTENIDO */}

      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
        <Link
          href={`/panel/propiedades/${id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#17495B] transition hover:opacity-70"
        >
          <ArrowLeft size={18} />
          Volver a la propiedad
        </Link>

        {/* MOTIVO DEL RECHAZO */}

        <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-start gap-4">
            <AlertCircle
              size={27}
              className="mt-1 shrink-0 text-red-600"
            />

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-700">
                Correcciones solicitadas
              </p>

              <h2 className="mt-2 text-xl font-black text-red-900">
                Revisa el motivo antes de modificar la propiedad
              </h2>

              <p className="mt-3 whitespace-pre-line leading-7 text-red-800">
                {propiedad.motivo_rechazo ||
                  "El administrador solicitó realizar correcciones."}
              </p>
            </div>
          </div>
        </div>

        {/* FORMULARIO */}

        <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#17495B]">
              Información
            </p>

            <h2 className="mt-2 text-3xl font-black text-gray-900">
              Editar propiedad
            </h2>

            <p className="mt-3 text-gray-600">
              Modifica la información solicitada por el equipo de INHOM.
            </p>
          </div>

         <form
  action={reenviarPropiedad.bind(null, id)}
  className="mt-8 space-y-8"
>
            {/* INFORMACIÓN PRINCIPAL */}

            <div className="grid gap-6 md:grid-cols-2">
              <Campo
                label="Título de la propiedad"
                name="titulo"
                defaultValue={propiedad.titulo}
                required
              />

              <Campo
                label="Precio"
                name="precio"
                type="number"
                defaultValue={propiedad.precio}
                required
              />

              <SelectCampo
                label="Tipo de propiedad"
                name="tipo"
                defaultValue={propiedad.tipo}
                opciones={[
                  { valor: "casa", texto: "Casa" },
                  { valor: "departamento", texto: "Departamento" },
                  { valor: "terreno", texto: "Terreno" },
                  { valor: "local", texto: "Local" },
                  { valor: "oficina", texto: "Oficina" },
                  { valor: "otro", texto: "Otro" },
                ]}
              />

              <SelectCampo
                label="Operación"
                name="operacion"
                defaultValue={propiedad.operacion}
                opciones={[
                  { valor: "venta", texto: "Venta" },
                  { valor: "renta", texto: "Renta" },
                ]}
              />
            </div>

            {/* UBICACIÓN */}

            <div>
              <h3 className="text-lg font-black text-gray-900">
                Ubicación
              </h3>

              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <Campo
                  label="Dirección"
                  name="direccion"
                  defaultValue={propiedad.direccion}
                />

                <Campo
                  label="Colonia"
                  name="colonia"
                  defaultValue={propiedad.colonia}
                />

                <Campo
                  label="Ciudad"
                  name="ciudad"
                  defaultValue={propiedad.ciudad}
                  required
                />
              </div>
            </div>

            {/* CARACTERÍSTICAS */}

            <div>
              <h3 className="text-lg font-black text-gray-900">
                Características
              </h3>

              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <Campo
                  label="Recámaras"
                  name="recamaras"
                  type="number"
                  defaultValue={propiedad.recamaras}
                />

                <Campo
                  label="Baños"
                  name="banos"
                  type="number"
                  defaultValue={propiedad.banos}
                />

                <Campo
                  label="Estacionamientos"
                  name="estacionamientos"
                  type="number"
                  defaultValue={propiedad.estacionamientos}
                />

                <Campo
                  label="Terreno (m²)"
                  name="terreno_m2"
                  type="number"
                  defaultValue={propiedad.terreno_m2}
                />

                <Campo
                  label="Construcción (m²)"
                  name="construccion_m2"
                  type="number"
                  defaultValue={propiedad.construccion_m2}
                />
              </div>
            </div>

            {/* DESCRIPCIÓN */}

            <div>
              <label
                htmlFor="descripcion"
                className="block text-sm font-bold text-gray-900"
              >
                Descripción
              </label>

              <textarea
                id="descripcion"
                name="descripcion"
                rows={7}
                defaultValue={propiedad.descripcion || ""}
                placeholder="Describe la propiedad..."
                className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/10"
              />
            </div>

            {/* AVISO */}

            <div className="rounded-2xl bg-[#17495B]/5 p-5">
              <p className="text-sm leading-6 text-gray-700">
                Cuando envíes nuevamente esta propiedad, su estado cambiará de{" "}
                <strong>Rechazada</strong> a <strong>Pendiente</strong> y el
                equipo de INHOM deberá revisarla otra vez.
              </p>
            </div>

            {/* BOTONES */}

            <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                href={`/panel/propiedades/${id}`}
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-4 font-bold text-gray-700 transition hover:bg-gray-50"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17495B] px-6 py-4 font-bold text-white shadow-sm transition hover:bg-[#123B4A]"
              >
                <Save size={20} />
                Guardar y enviar a revisión
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

// =========================
// INPUT
// =========================

function Campo({
  label,
  name,
  type = "text",
  defaultValue,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-bold text-gray-900"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
        min={type === "number" ? 0 : undefined}
        className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/10"
      />
    </div>
  );
}

// =========================
// SELECT
// =========================

function SelectCampo({
  label,
  name,
  defaultValue,
  opciones,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  opciones: {
    valor: string;
    texto: string;
  }[];
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-bold text-gray-900"
      >
        {label}
      </label>

      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/10"
      >
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.texto}
          </option>
        ))}
      </select>
    </div>
  );
}