import Link from "next/link";
import PrintFichaButton from "./PrintFichaButton";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  Car,
  Check,
  MapPin,
  Ruler,
  UserRound,
  Phone,
  Mail,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type PropertyImage = {
  id: string;
  property_id: string;
  storage_path: string;
  orden: number | null;
};

export default async function FichaPropiedadPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("nombre, rol, activo")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.activo) redirect("/login");

  const esAdmin = profile.rol === "admin";

  const { data: propiedad, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !propiedad) {
    return (
      <main className="min-h-screen bg-[#F3F5F4] px-6 py-12">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 shadow-sm">
          <h1 className="text-2xl font-black text-gray-900">
            No se encontró la propiedad
          </h1>
          <Link
            href="/panel"
            className="mt-6 inline-flex items-center gap-2 font-bold text-[#17495B]"
          >
            <ArrowLeft size={18} />
            Volver al panel
          </Link>
        </div>
      </main>
    );
  }

  if (!esAdmin && propiedad.created_by !== user.id) {
    redirect("/panel");
  }

  const { data: imagenesData } = await supabase
    .from("property_images")
    .select("*")
    .eq("property_id", id)
    .order("orden", { ascending: true });

  const imagenes: PropertyImage[] =
    (imagenesData as PropertyImage[] | null) ?? [];

  const getImageUrl = (storagePath: string) => {
    const { data } = supabase.storage
      .from("property-images")
      .getPublicUrl(storagePath);

    return data.publicUrl;
  };

  let asesor: {
    nombre: string | null;
    telefono: string | null;
    email: string | null;
  } | null = null;

  if (propiedad.created_by) {
    const { data: asesorData } = await supabase
      .from("profiles")
      .select("nombre, telefono, email")
      .eq("id", propiedad.created_by)
      .single();

    asesor = asesorData;
  }

  const precio =
    propiedad.precio !== null && propiedad.precio !== undefined
      ? new Intl.NumberFormat("es-MX", {
          style: "currency",
          currency: "MXN",
          maximumFractionDigits: 0,
        }).format(Number(propiedad.precio))
      : "Precio a consultar";

  const ubicacion =
    [propiedad.direccion, propiedad.colonia, propiedad.ciudad]
      .filter(Boolean)
      .join(", ") || "Ubicación no especificada";

  const caracteristicas = [
    {
      icon: <BedDouble size={21} />,
      label: "Recámaras",
      value: propiedad.recamaras,
    },
    {
      icon: <Bath size={21} />,
      label: "Baños",
      value: propiedad.banos,
    },
    {
      icon: <Car size={21} />,
      label: "Estacionamientos",
      value: propiedad.estacionamientos,
    },
    {
      icon: <Ruler size={21} />,
      label: "Terreno",
      value: propiedad.terreno_m2 ? `${propiedad.terreno_m2} m²` : null,
    },
    {
      icon: <Building2 size={21} />,
      label: "Construcción",
      value: propiedad.construccion_m2
        ? `${propiedad.construccion_m2} m²`
        : null,
    },
  ].filter((item) => item.value !== null && item.value !== undefined);

  return (
    <main className="min-h-screen bg-[#EDEFEF] py-8 print:bg-white print:py-0">
      {/* Controles: no aparecen al imprimir */}
      <div className="mx-auto mb-5 flex max-w-[1100px] items-center justify-between px-4 print:hidden">
        <Link
          href={`/panel/propiedades/${id}`}
          className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#17495B] shadow-sm transition hover:-translate-y-0.5"
        >
          <ArrowLeft size={18} />
          Volver
        </Link>

        <PrintFichaButton propertyId={id} />
      </div>

      {/* Hoja */}
      <article className="mx-auto w-full max-w-[1100px] overflow-hidden bg-white shadow-xl print:w-[210mm] print:max-w-none print:shadow-none">
        {/* Portada */}
        <section className="relative min-h-[760px] bg-[#123E4C] text-white print:min-h-[277mm]">
          {imagenes[0] ? (
            <>
              <img
                src={getImageUrl(imagenes[0].storage_path)}
                alt={`Portada de ${propiedad.titulo}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/32 to-black/5" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#0E3542] to-[#2F806F]" />
          )}

          <div className="relative z-10 flex min-h-[760px] flex-col justify-between p-10 md:p-14 print:min-h-[277mm] print:p-[16mm]">
            <div className="flex items-start justify-between gap-8">
              <div className="flex items-center">
                <img
                  src="/logo/inhom-logo-white.png"
                  alt="INHOM Bienes Raíces"
                  className="h-auto w-[210px] object-contain drop-shadow-lg"
                />
              </div>

              <div className="rounded-full border border-white/30 bg-black/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-sm">
                {[propiedad.operacion, propiedad.tipo, propiedad.ciudad]
                  .filter(Boolean)
                  .join(" · ") || "Propiedad"}
              </div>
            </div>

            <div className="max-w-3xl">
              <div className="mb-5 h-[2px] w-14 rounded-full bg-[#65A99A]" />

              <h1 className="max-w-[820px] text-5xl font-black leading-[0.95] tracking-[-0.045em] text-white drop-shadow-md md:text-7xl">
                {propiedad.titulo}
              </h1>

              <div className="mt-6 flex items-start gap-3 text-lg text-white/90">
                <MapPin className="mt-0.5 shrink-0" size={22} />
                <span>{ubicacion}</span>
              </div>

              <div className="mt-8">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.32em] text-white/65">
                  Precio
                </p>
                <p className="text-4xl font-black tracking-[-0.035em] text-white drop-shadow-md md:text-5xl">
                  {precio}
                </p>
              </div>
            </div>

            <div className="flex items-end justify-between border-t border-white/30 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">
                Arquitectura · Construcción · Bienes Raíces
              </p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                Ficha de propiedad
              </p>
            </div>
          </div>
        </section>

        {/* Página 2 · Información técnica */}
        <section className="relative min-h-[760px] overflow-hidden bg-white p-10 md:p-14 print:min-h-[297mm] print:break-before-page print:p-[16mm]">
          <div className="mb-9 flex items-start justify-between border-b border-gray-200 pb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#2F806F]">
                Ficha técnica
              </p>
              <h2 className="mt-2 max-w-2xl text-3xl font-black tracking-[-0.03em] text-[#123E4C]">
                {propiedad.titulo}
              </h2>
            </div>
            <img
              src="/logo/inhom-logo.png"
              alt="INHOM Bienes Raíces"
              className="h-auto w-[125px] object-contain"
            />
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2F806F]">
                Descripción
              </p>
              <h3 className="mt-3 text-3xl font-black leading-tight tracking-[-0.03em] text-[#123E4C]">
                Conoce la propiedad
              </h3>
              <p className="mt-5 max-w-2xl whitespace-pre-line text-[14px] leading-7 text-gray-600">
                {propiedad.descripcion || "Sin descripción registrada."}
              </p>
            </div>

            <aside className="rounded-[26px] bg-[#F2F6F5] p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2F806F]">
                Datos clave
              </p>
              <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-1">
                {caracteristicas.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#17495B] shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-gray-500">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-base font-black text-gray-900">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          <div className="mt-9 border-t border-gray-200 pt-7">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2F806F]">
                  Distribución y espacios
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.02em] text-[#123E4C]">
                  Recorrido visual de la propiedad
                </h3>
              </div>
              <p className="max-w-[300px] text-right text-xs leading-5 text-gray-400">
                Una vista general de los espacios que integran esta propiedad.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-[24px] bg-[#EEF2F1]">
                {imagenes[1] || imagenes[0] ? (
                  <>
                    <img
                      src={getImageUrl((imagenes[1] || imagenes[0]).storage_path)}
                      alt={`${propiedad.titulo} - espacio principal`}
                      className="h-[250px] w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-4 pt-12">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white">
                        Vista de la propiedad
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex h-[250px] items-center justify-center px-8 text-center text-sm font-semibold text-gray-400">
                    Sin fotografía disponible
                  </div>
                )}
              </div>

              <div className="relative overflow-hidden rounded-[24px] bg-[#EEF2F1]">
                {imagenes[2] || imagenes[0] ? (
                  <>
                    <img
                      src={getImageUrl((imagenes[2] || imagenes[0]).storage_path)}
                      alt={`${propiedad.titulo} - espacio complementario`}
                      className="h-[250px] w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-5 pb-4 pt-12">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white">
                        Distribución y espacios
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex h-[250px] items-center justify-center px-8 text-center text-sm font-semibold text-gray-400">
                    Sin fotografía disponible
                  </div>
                )}
              </div>
            </div>

          </div>

          {Array.isArray(propiedad.amenidades) &&
            propiedad.amenidades.length > 0 && (
              <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2F806F]">
                  Amenidades destacadas
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-3">
                  {propiedad.amenidades.slice(0, 6).map(
                    (amenidad: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-xl bg-[#F7F9F8] px-3 py-2.5 text-xs font-bold text-gray-700"
                      >
                        <Check size={14} className="shrink-0 text-[#2F806F]" />
                        <span>{amenidad}</span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

          <div className="absolute bottom-8 left-10 right-10 flex items-center justify-between border-t border-gray-200 pt-4 text-[9px] font-bold uppercase tracking-[0.22em] text-gray-400 md:left-14 md:right-14 print:left-[16mm] print:right-[16mm]">
            <span>Arquitectura · Construcción · Bienes Raíces</span>
            <span>02</span>
          </div>
        </section>

        {/* Página 3 · Cierre comercial */}
        <section className="relative min-h-[760px] overflow-hidden bg-white p-10 md:p-14 print:min-h-[297mm] print:break-before-page print:p-[16mm]">
          <div className="mb-8 flex items-start justify-between border-b border-gray-200 pb-6">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.32em] text-[#2F806F]">
                Conoce cada espacio
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#123E4C]">
                Galería de la propiedad
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
                Una selección visual de los espacios y características de esta propiedad.
              </p>
            </div>
            <img src="/logo/inhom-logo.png" alt="INHOM Bienes Raíces" className="h-auto w-[125px] object-contain" />
          </div>

          {imagenes.length > 1 ? (
            <div className="grid grid-cols-12 gap-3">
              <div className="col-span-7 overflow-hidden rounded-[24px] bg-[#EEF2F1]">
                <img src={getImageUrl((imagenes[1] || imagenes[0]).storage_path)} alt={`${propiedad.titulo} - galería principal`} className="h-[300px] w-full object-cover" />
              </div>
              <div className="col-span-5 grid gap-3">
                <div className="overflow-hidden rounded-[20px] bg-[#EEF2F1]">
                  <img src={getImageUrl((imagenes[2] || imagenes[0]).storage_path)} alt={`${propiedad.titulo} - galería`} className="h-[144px] w-full object-cover" />
                </div>
                <div className="overflow-hidden rounded-[20px] bg-[#EEF2F1]">
                  <img src={getImageUrl((imagenes[3] || imagenes[1] || imagenes[0]).storage_path)} alt={`${propiedad.titulo} - galería`} className="h-[144px] w-full object-cover" />
                </div>
              </div>
            </div>
          ) : imagenes[0] ? (
            <div className="relative overflow-hidden rounded-[26px] bg-[#EEF2F1]">
              <img src={getImageUrl(imagenes[0].storage_path)} alt={`${propiedad.titulo} - vista general`} className="h-[300px] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 pb-5 pt-16">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white">Vista general de la propiedad</p>
              </div>
            </div>
          ) : (
            <div className="flex h-[260px] items-center justify-center rounded-[26px] bg-[#F3F6F5] text-sm font-semibold text-gray-400">
              Galería pendiente
            </div>
          )}

          <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-[26px] border border-gray-200 p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#2F806F]">
                {Array.isArray(propiedad.amenidades) && propiedad.amenidades.length > 0
                  ? "Amenidades"
                  : "Características principales"}
              </p>
              <h3 className="mt-2 text-xl font-black text-[#123E4C]">
                {Array.isArray(propiedad.amenidades) && propiedad.amenidades.length > 0
                  ? "Lo que ofrece esta propiedad"
                  : "Información esencial"}
              </h3>
              {Array.isArray(propiedad.amenidades) && propiedad.amenidades.length > 0 ? (
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {propiedad.amenidades.slice(0, 8).map((amenidad: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 rounded-xl bg-[#F5F8F7] px-3 py-3 text-xs font-bold text-gray-700">
                      <Check size={14} className="shrink-0 text-[#2F806F]" />
                      <span>{amenidad}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  {caracteristicas.slice(0, 6).map((item) => (
                    <div key={item.label} className="rounded-xl bg-[#F5F8F7] px-4 py-3">
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-gray-400">{item.label}</p>
                      <p className="mt-1 text-sm font-black text-[#123E4C]">{item.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[26px] bg-[#F2F6F5] p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#2F806F]">
                Ubicación
              </p>
              <h3 className="mt-2 text-xl font-black text-[#123E4C]">
                {propiedad.ciudad || "Ubicación disponible bajo consulta"}
              </h3>

              {(propiedad.direccion || propiedad.ciudad) && (
                <div className="mt-5 flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-[#2F806F]" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">
                      {propiedad.direccion ? "Dirección" : "Zona"}
                    </p>
                    <p className="mt-1 text-sm font-bold leading-5 text-gray-700">
                      {propiedad.direccion || propiedad.ciudad}
                    </p>
                    {propiedad.direccion && propiedad.ciudad && (
                      <p className="mt-1 text-xs text-gray-400">{propiedad.ciudad}</p>
                    )}
                  </div>
                </div>
              )}

              {!propiedad.direccion && !propiedad.ciudad && (
                <p className="mt-4 text-xs leading-5 text-gray-500">
                  Solicita al asesor la ubicación y referencias de esta propiedad.
                </p>
              )}
            </div>
          </div>

          <div className="mt-7 overflow-hidden rounded-[28px] bg-[#123E4C] text-white">
            <div className="grid gap-6 p-7 md:grid-cols-[1.15fr_0.85fr] md:items-center">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/65">INHOM Bienes Raíces</p>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.02em]">¿Te interesa esta propiedad?</h3>
                <p className="mt-2 max-w-lg text-xs leading-5 text-white/75">Nuestro equipo puede brindarte información adicional y acompañarte durante el proceso.</p>
              </div>
              <div className="rounded-[20px] bg-white/10 p-5">
                <div className="flex items-center gap-3">
                  <UserRound size={18} className="shrink-0 text-white/80" />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/60">
                      Asesor responsable
                    </p>
                    <p className="mt-1 text-sm font-black">
                      {asesor?.nombre || "Equipo INHOM"}
                    </p>
                  </div>
                </div>

                {asesor?.telefono && (
                  <div className="mt-4 flex items-center gap-3 text-xs text-white/85">
                    <Phone size={15} className="shrink-0" />
                    <span>{asesor.telefono}</span>
                  </div>
                )}

                {asesor?.email && (
                  <div className="mt-2 flex items-center gap-3 text-xs text-white/85">
                    <Mail size={15} className="shrink-0" />
                    <span className="break-all">{asesor.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-10 right-10 flex items-center justify-between border-t border-gray-200 pt-4 text-[9px] font-bold uppercase tracking-[0.22em] text-gray-400 md:left-14 md:right-14 print:left-[16mm] print:right-[16mm]">
            <span>Arquitectura · Construcción · Bienes Raíces</span>
            <span>03</span>
          </div>
        </section>
      </article>

      <style>{`
        @page {
          size: A4 portrait;
          margin: 0;
        }

        @media print {
          html,
          body {
            width: 210mm;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          article {
            width: 210mm !important;
          }

          section {
            break-inside: avoid;
          }
        }
      `}</style>
    </main>
  );
}
