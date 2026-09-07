"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  UserPlus,
  ArrowLeft,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function RegistroPage() {
  const router = useRouter();
  const supabase = createClient();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  async function registrar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setExito("");

    const nombreLimpio = nombre.trim();
    const telefonoLimpio = telefono.trim();
    const emailLimpio = email.trim().toLowerCase();

    if (
      !nombreLimpio ||
      !telefonoLimpio ||
      !emailLimpio ||
      !password ||
      !confirmarPassword
    ) {
      setError("Completa todos los campos.");
      return;
    }

    if (nombreLimpio.length < 3) {
      setError("Ingresa tu nombre completo.");
      return;
    }

    if (telefonoLimpio.length < 10) {
      setError("Ingresa un número de teléfono válido.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: emailLimpio,
      password,
      options: {
        data: {
          nombre: nombreLimpio,
          telefono: telefonoLimpio,
        },
      },
    });

    if (signUpError) {
      setCargando(false);

      if (
        signUpError.message
          .toLowerCase()
          .includes("already registered")
      ) {
        setError("Este correo electrónico ya está registrado.");
        return;
      }

      setError(signUpError.message);
      return;
    }

    if (!data.user) {
      setCargando(false);
      setError("No se pudo crear la cuenta. Inténtalo nuevamente.");
      return;
    }

    /*
      IMPORTANTE:
      El rol NO se envía desde esta página.

      El trigger que creamos en Supabase genera el perfil
      automáticamente con:

      rol = "socio"
      activo = true

      Así el usuario no puede registrarse como administrador.
    */

    if (data.session) {
      router.push("/panel");
      router.refresh();
      return;
    }

    setExito(
      "Cuenta creada correctamente. Revisa tu correo electrónico para confirmar tu cuenta."
    );

    setNombre("");
    setTelefono("");
    setEmail("");
    setPassword("");
    setConfirmarPassword("");
    setCargando(false);
  }

  return (
    <main className="min-h-screen bg-[#F5F7F7] px-5 py-10">
      <div className="mx-auto max-w-xl">
        {/* VOLVER */}
        <Link
          href="/login"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#17495B] transition hover:opacity-70"
        >
          <ArrowLeft size={18} />
          Volver al inicio de sesión
        </Link>

        {/* TARJETA */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          {/* ENCABEZADO */}
          <div className="border-b border-gray-100 px-7 py-8 sm:px-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#17495B] text-white">
              <UserPlus size={26} />
            </div>

            <p className="mt-6 text-sm font-black uppercase tracking-[0.3em] text-[#17495B]">
              INHOM
            </p>

            <h1 className="mt-2 text-3xl font-black text-gray-900">
              Registro de asesor
            </h1>

            <p className="mt-3 leading-7 text-gray-600">
              Crea tu cuenta para registrar y administrar tus propiedades
              dentro de INHOM.
            </p>
          </div>

          {/* FORMULARIO */}
          <form onSubmit={registrar} className="space-y-6 px-7 py-8 sm:px-10">
            {/* NOMBRE */}
            <div>
              <label
                htmlFor="nombre"
                className="mb-2 block text-sm font-bold text-gray-900"
              >
                Nombre completo
              </label>

              <div className="relative">
                <User
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="nombre"
                  type="text"
                  autoComplete="name"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Carlos Hernández López"
                  className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/10"
                />
              </div>
            </div>

            {/* TELÉFONO */}
            <div>
              <label
                htmlFor="telefono"
                className="mb-2 block text-sm font-bold text-gray-900"
              >
                Teléfono / WhatsApp
              </label>

              <div className="relative">
                <Phone
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="telefono"
                  type="tel"
                  autoComplete="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ej. 983 123 4567"
                  className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/10"
                />
              </div>
            </div>

            {/* CORREO */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-gray-900"
              >
                Correo electrónico
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/10"
                />
              </div>
            </div>

            {/* CONTRASEÑA */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-gray-900"
              >
                Contraseña
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={mostrarPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/10"
                />

                <button
                  type="button"
                  onClick={() => setMostrarPassword((valor) => !valor)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                  aria-label={
                    mostrarPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {mostrarPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* CONFIRMAR CONTRASEÑA */}
            <div>
              <label
                htmlFor="confirmarPassword"
                className="mb-2 block text-sm font-bold text-gray-900"
              >
                Confirmar contraseña
              </label>

              <div className="relative">
                <LockKeyhole
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="confirmarPassword"
                  type={mostrarConfirmacion ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmarPassword}
                  onChange={(e) =>
                    setConfirmarPassword(e.target.value)
                  }
                  placeholder="Repite tu contraseña"
                  className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-12 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setMostrarConfirmacion((valor) => !valor)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                  aria-label={
                    mostrarConfirmacion
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {mostrarConfirmacion ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            {/* ÉXITO */}
            {exito && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                {exito}
              </div>
            )}

            {/* BOTÓN */}
            <button
              type="submit"
              disabled={cargando}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#17495B] px-6 py-4 font-bold text-white shadow-md transition hover:bg-[#123B4A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UserPlus size={20} />

              {cargando ? "Creando cuenta..." : "Crear cuenta de asesor"}
            </button>

            <p className="text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="font-bold text-[#17495B] hover:underline"
              >
                Inicia sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}   