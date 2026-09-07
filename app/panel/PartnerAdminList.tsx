"use client";

import { useState, useTransition } from "react";

import {
  UserRound,
  Mail,
  Phone,
  Building2,
  UserX,
  UserCheck,
  UserPlus,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  cambiarEstadoSocio,
  crearSocio,
} from "./actions";

export type Partner = {
  id: string;
  nombre: string | null;
  telefono: string | null;
  empresa: string | null;
  email: string | null;
  rol: string;
  activo: boolean;
};

type Props = {
  socios: Partner[];
  adminId: string;
};

export default function PartnerAdminList({
  socios,
  adminId,
}: Props) {
  const [mostrarFormulario, setMostrarFormulario] =
    useState(false);

  const [isPending, startTransition] = useTransition();

  const [mensajeExito, setMensajeExito] =
    useState("");

  const [mensajeError, setMensajeError] =
    useState("");

  /* =========================================================
     ABRIR FORMULARIO
  ========================================================= */

  const abrirFormulario = () => {
    setMensajeError("");
    setMensajeExito("");
    setMostrarFormulario(true);
  };

  /* =========================================================
     CERRAR FORMULARIO
  ========================================================= */

  const cerrarFormulario = () => {
    if (isPending) return;

    setMostrarFormulario(false);
    setMensajeError("");
  };

  /* =========================================================
     CREAR SOCIO
  ========================================================= */

  const handleCrearSocio = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isPending) return;

    setMensajeError("");
    setMensajeExito("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      try {
        await crearSocio(formData);

        form.reset();

        setMostrarFormulario(false);

        setMensajeExito(
          "Socio creado correctamente. Se envió un correo para que establezca su contraseña."
        );

        window.setTimeout(() => {
          setMensajeExito("");
        }, 7000);
      } catch (error) {
        console.error(
          "Error al crear socio:",
          error
        );

        if (error instanceof Error) {
          setMensajeError(error.message);
        } else {
          setMensajeError(
            "No se pudo crear el socio. Intenta nuevamente."
          );
        }
      }
    });
  };

  return (
    <div className="mt-8">
      {/* =====================================================
          ENCABEZADO
      ===================================================== */}

      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#17495B]">
            Usuarios
          </p>

          <h2 className="mt-1 text-2xl font-black text-gray-900">
            Administración de socios
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Consulta y administra las cuentas con acceso para
            subir propiedades.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="w-fit rounded-full bg-[#17495B]/10 px-4 py-2 text-sm font-bold text-[#17495B]">
            {socios.length}{" "}
            {socios.length === 1
              ? "socio"
              : "socios"}
          </span>

          <button
            type="button"
            onClick={abrirFormulario}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17495B] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#123b49]"
          >
            <UserPlus size={18} />

            Nuevo socio
          </button>
        </div>
      </div>

      {/* =====================================================
          MENSAJE DE ÉXITO
      ===================================================== */}

      {mensajeExito && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
          <CheckCircle2
            size={20}
            className="mt-0.5 shrink-0"
          />

          <span>{mensajeExito}</span>
        </div>
      )}

      {/* =====================================================
          SIN SOCIOS
      ===================================================== */}

      {socios.length === 0 ? (
        <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <UserRound
            size={42}
            className="mx-auto text-[#17495B]"
          />

          <h3 className="mt-4 text-xl font-black text-gray-900">
            No hay socios registrados
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Crea una cuenta para comenzar a administrar
            socios.
          </p>

          <button
            type="button"
            onClick={abrirFormulario}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#17495B] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#123b49]"
          >
            <UserPlus size={18} />

            Crear primer socio
          </button>
        </div>
      ) : (
        /* =====================================================
            LISTA DE SOCIOS
        ===================================================== */

        <div className="space-y-3">
          {socios.map((socio) => {
            const esCuentaActual =
              socio.id === adminId;

            return (
              <div
                key={socio.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  {/* INFORMACIÓN */}

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#17495B]/10">
                        <UserRound
                          size={20}
                          className="text-[#17495B]"
                        />
                      </div>

                      <div>
                        <h3 className="font-bold text-gray-900">
                          {socio.nombre ||
                            "Sin nombre"}
                        </h3>

                        <div className="mt-1 flex flex-wrap gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${
                              socio.activo
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {socio.activo
                              ? "● Activo"
                              : "● Inactivo"}
                          </span>

                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold capitalize text-gray-600">
                            {socio.rol}
                          </span>

                          {esCuentaActual && (
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                              Tu cuenta
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* DATOS */}

                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                      {socio.email && (
                        <div className="flex items-center gap-2">
                          <Mail size={15} />
                          <span>
                            {socio.email}
                          </span>
                        </div>
                      )}

                      {socio.telefono && (
                        <div className="flex items-center gap-2">
                          <Phone size={15} />
                          <span>
                            {socio.telefono}
                          </span>
                        </div>
                      )}

                      {socio.empresa && (
                        <div className="flex items-center gap-2">
                          <Building2 size={15} />
                          <span>
                            {socio.empresa}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ACCIONES */}

                  <div className="flex shrink-0 items-center">
                    {esCuentaActual ? (
                      <span className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-500">
                        Cuenta protegida
                      </span>
                    ) : (
                      <form
                        action={
                          cambiarEstadoSocio
                        }
                      >
                        <input
                          type="hidden"
                          name="socioId"
                          value={socio.id}
                        />

                        <input
                          type="hidden"
                          name="nuevoEstado"
                          value={
                            socio.activo
                              ? "false"
                              : "true"
                          }
                        />

                        <button
                          type="submit"
                          className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition ${
                            socio.activo
                              ? "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                              : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          }`}
                        >
                          {socio.activo ? (
                            <>
                              <UserX
                                size={18}
                              />
                              Desactivar
                            </>
                          ) : (
                            <>
                              <UserCheck
                                size={18}
                              />
                              Activar
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =====================================================
          MODAL NUEVO SOCIO
      ===================================================== */}

      {mostrarFormulario && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[2px]"
          onClick={cerrarFormulario}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* CABECERA */}

            <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#17495B]/10">
                  <UserPlus
                    size={23}
                    className="text-[#17495B]"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#17495B]">
                    Usuarios
                  </p>

                  <h3 className="mt-1 text-xl font-black text-gray-900">
                    Nuevo socio
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={cerrarFormulario}
                disabled={isPending}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORMULARIO */}

            <form
              onSubmit={handleCrearSocio}
              className="p-6 sm:p-8"
            >
              <p className="mb-6 text-sm leading-6 text-gray-500">
                Ingresa los datos de la persona que
                tendrá acceso al panel de propiedades
                de INHOM.
              </p>

              <div className="space-y-5">

                {/* NOMBRE */}

                <div>
                  <label
                    htmlFor="nombre"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Nombre completo
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      disabled={isPending}
                      placeholder="Ej. Aarón Hernández"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {/* CORREO */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-gray-700"
                  >
                    Correo electrónico
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      disabled={isPending}
                      placeholder="correo@ejemplo.com"
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
                    />
                  </div>
                </div>

                {/* TELÉFONO + EMPRESA */}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="telefono"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      Teléfono
                    </label>

                    <div className="relative">
                      <Phone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        disabled={isPending}
                        placeholder="983 000 0000"
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="empresa"
                      className="mb-2 block text-sm font-bold text-gray-700"
                    >
                      Empresa
                    </label>

                    <div className="relative">
                      <Building2
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="empresa"
                        name="empresa"
                        type="text"
                        disabled={isPending}
                        defaultValue="INHOM"
                        placeholder="INHOM"
                        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ERROR */}

              {mensajeError && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-5 text-red-700">
                  <AlertCircle
                    size={19}
                    className="mt-0.5 shrink-0"
                  />

                  <span>
                    {mensajeError}
                  </span>
                </div>
              )}

              {/* AVISO */}

              <div className="mt-6 rounded-2xl bg-[#17495B]/5 p-4">
                <p className="text-sm leading-6 text-[#17495B]">
                  La cuenta se creará como{" "}
                  <strong>socio</strong> y tendrá
                  acceso al panel para registrar sus
                  propiedades.
                </p>
              </div>

              {/* BOTONES */}

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={cerrarFormulario}
                  disabled={isPending}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex min-w-[145px] items-center justify-center gap-2 rounded-xl bg-[#17495B] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#123b49] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isPending ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Creando...
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Crear socio
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}