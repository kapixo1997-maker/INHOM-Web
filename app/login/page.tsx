"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [recoveryLoading, setRecoveryLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================================
     INICIAR SESIÓN
  ========================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (loading || recoveryLoading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    // 1. INICIAR SESIÓN
    const {
      data: { user },
      error: loginError,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError || !user) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
      return;
    }

    // 2. CONSULTAR EL PERFIL DEL USUARIO
    const { data: profile, error: profileError } =
      await supabase
        .from("profiles")
        .select("activo")
        .eq("id", user.id)
        .single();

    if (profileError || !profile) {
      await supabase.auth.signOut();

      setError(
        "No pudimos verificar el estado de tu cuenta. Intenta nuevamente."
      );

      setLoading(false);
      return;
    }

    // 3. COMPROBAR SI LA CUENTA ESTÁ ACTIVA
    if (!profile.activo) {
      await supabase.auth.signOut();

      setError(
        "Tu cuenta ha sido desactivada por un administrador. Contacta a INHOM para recuperar el acceso."
      );

      setLoading(false);
      return;
    }

    // 4. TODO CORRECTO → ENTRAR AL PANEL
    window.location.href = "/panel";
  };

  /* =========================================================
     RECUPERAR CONTRASEÑA
  ========================================================= */

  const handlePasswordRecovery = async () => {
    if (loading || recoveryLoading) return;

    setError("");
    setSuccess("");

    const correo = email.trim();

    if (!correo) {
      setError(
        "Ingresa tu correo electrónico para enviarte el enlace de recuperación."
      );
      return;
    }

    setRecoveryLoading(true);

    const { error: recoveryError } =
      await supabase.auth.resetPasswordForEmail(correo, {
        redirectTo:
          `${window.location.origin}/restablecer-contrasena`,
      });

    if (recoveryError) {
      console.error(
        "Error al enviar recuperación:",
        recoveryError
      );

      setError(
        "No pudimos enviar el correo de recuperación. Intenta nuevamente."
      );

      setRecoveryLoading(false);
      return;
    }

    setSuccess(
      "Si existe una cuenta asociada a ese correo, recibirás un enlace para restablecer tu contraseña."
    );

    setRecoveryLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#f7f8f6] lg:h-screen lg:overflow-hidden">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =========================================================
            LADO IZQUIERDO
        ========================================================= */}

        <section className="relative hidden min-h-screen overflow-hidden lg:block">

          {/* Imagen de fondo */}

          <img
            src="/images/login-inhom.png"
            alt="Arquitectura INHOM"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          {/* Overlay */}

          <div className="absolute inset-0 bg-gradient-to-b from-[#07181d]/40 via-[#07181d]/32 to-[#061418]/75" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/5" />

          {/* Contenido */}

          <div className="relative z-10 flex min-h-screen flex-col px-12 py-10 text-white xl:px-16 xl:py-12">

            {/* Superior */}

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="flex items-start justify-between"
            >

              {/* Logo blanco */}

              <img
                src="/logo/inhom-logo-white.png"
                alt="INHOM Bienes Raíces"
                className="h-auto w-[205px] object-contain xl:w-[220px]"
                draggable={false}
              />

              {/* Ubicación */}

              <div className="mt-2 flex items-center gap-4">
                <span className="h-px w-8 bg-white/60" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/85">
                  Chetumal, Q. Roo
                </span>
              </div>
            </motion.div>

            {/* Centro */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.12,
              }}
              className="my-auto max-w-[540px] -translate-y-2"
            >
              <h1
                className="text-[52px] font-normal leading-[1.06] tracking-[-0.035em] text-white xl:text-[58px]"
                style={{
                  fontFamily:
                    'Georgia, "Times New Roman", Times, serif',
                }}
              >
                Construimos
                <br />
                tu patrimonio.
              </h1>

              <div className="mt-9 h-px w-16 bg-white/75" />

              <p className="mt-6 max-w-sm text-[18px] font-light leading-[1.5] text-white/90 xl:text-[19px]">
                Espacios que inspiran,
                <br />
                inversiones que perduran.
              </p>
            </motion.div>

            {/* Inferior */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.35,
              }}
              className="pb-1"
            >
              <div className="mb-6 h-px w-16 bg-white/55" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/90">
                Arquitectura · Construcción · Bienes Raíces
              </p>

              <p className="mt-3 text-[8px] font-medium uppercase tracking-[0.27em] text-white/50">
                Más que propiedades, futuros reales.
              </p>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            LADO DERECHO
        ========================================================= */}

        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafbf9] px-6 py-10 sm:px-10 lg:px-14 xl:px-20">

          {/* Decoración arquitectónica */}

          <div className="pointer-events-none absolute bottom-[-180px] right-[-120px] h-[520px] w-[620px] rotate-[-8deg] rounded-[80px] border border-[#17495B]/[0.05]" />

          <div className="pointer-events-none absolute bottom-[-220px] right-[60px] h-[470px] w-[520px] rotate-[12deg] rounded-[70px] border border-[#17495B]/[0.04]" />

          {/* Etiqueta acceso */}

          <div className="absolute right-10 top-10 hidden items-center gap-4 lg:flex xl:right-16 xl:top-12">
            <span className="h-px w-8 bg-[#17495B]/30" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#17495B]/65">
              Acceso
            </span>
          </div>

          {/* Contenido */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="relative z-10 w-full max-w-[500px] lg:-translate-y-1"
          >

            {/* =====================================================
                ENCABEZADO
            ===================================================== */}

            <div className="text-center">
              <h2
                className="text-[40px] font-normal leading-tight text-[#123f4b] sm:text-[44px]"
                style={{
                  fontFamily:
                    'Georgia, "Times New Roman", Times, serif',
                }}
              >
                Bienvenido
              </h2>

              <p className="mx-auto mt-4 max-w-[380px] text-[15px] leading-6 text-[#52676d]">
                Ingresa a tu cuenta para administrar
                <br className="hidden sm:block" /> tus propiedades.
              </p>
            </div>

            {/* =====================================================
                FORMULARIO
            ===================================================== */}

            <form
              onSubmit={handleSubmit}
              className="mt-9"
            >

              {/* Correo */}

              <div className="relative">
                <Mail
                  size={20}
                  strokeWidth={1.8}
                  className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#17495B]"
                />

                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);

                    if (error) {
                      setError("");
                    }

                    if (success) {
                      setSuccess("");
                    }
                  }}
                  placeholder="Correo electrónico"
                  className="h-[58px] w-full rounded-xl border border-[#17495B]/20 bg-white/75 pl-14 pr-5 text-[15px] text-[#173e49] outline-none transition duration-200 placeholder:text-[#73868b] hover:border-[#17495B]/35 focus:border-[#17495B]/60 focus:bg-white focus:ring-4 focus:ring-[#17495B]/5"
                />
              </div>

              {/* Contraseña */}

              <div className="relative mt-3">
                <LockKeyhole
                  size={20}
                  strokeWidth={1.8}
                  className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#17495B]"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);

                    if (error) {
                      setError("");
                    }

                    if (success) {
                      setSuccess("");
                    }
                  }}
                  placeholder="Contraseña"
                  className="h-[58px] w-full rounded-xl border border-[#17495B]/20 bg-white/75 pl-14 pr-14 text-[15px] text-[#173e49] outline-none transition duration-200 placeholder:text-[#73868b] hover:border-[#17495B]/35 focus:border-[#17495B]/60 focus:bg-white focus:ring-4 focus:ring-[#17495B]/5"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current
                    )
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#71858b] transition hover:text-[#17495B] focus:outline-none focus:ring-2 focus:ring-[#17495B]/15"
                  aria-label={
                    showPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff
                      size={20}
                      strokeWidth={1.8}
                    />
                  ) : (
                    <Eye
                      size={20}
                      strokeWidth={1.8}
                    />
                  )}
                </button>
              </div>

              {/* Opciones */}

              <div className="mt-4 flex flex-col gap-3 text-[13px] text-[#284d56] sm:flex-row sm:items-center sm:justify-between">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(
                        event.target.checked
                      )
                    }
                    className="h-[17px] w-[17px] cursor-pointer accent-[#17495B]"
                  />

                  <span>
                    Mantener sesión activa
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handlePasswordRecovery}
                  disabled={
                    recoveryLoading || loading
                  }
                  className="text-left transition hover:text-[#17495B] hover:underline disabled:cursor-not-allowed disabled:opacity-50 sm:text-right"
                >
                  {recoveryLoading
                    ? "Enviando enlace..."
                    : "¿Olvidaste tu contraseña?"}
                </button>
              </div>

              {/* Error */}

              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {error}
                </motion.div>
              )}

              {/* Éxito recuperación */}

              {success && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium leading-5 text-emerald-700"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{success}</span>
                </motion.div>
              )}

              {/* Iniciar sesión */}

              <button
                type="submit"
                disabled={
                  loading || recoveryLoading
                }
                className="group mt-6 flex h-[58px] w-full items-center justify-center rounded-xl bg-[#17495B] px-6 text-[15px] font-semibold text-white shadow-[0_14px_30px_rgba(23,73,91,0.17)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#123D4B] hover:shadow-[0_18px_35px_rgba(23,73,91,0.22)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-3">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                    Ingresando...
                  </span>
                ) : (
                  <span className="relative flex w-full items-center justify-center">
                    Iniciar sesión

                    <ArrowRight
                      size={19}
                      className="absolute right-1 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                )}
              </button>
            </form>

            {/* Separador */}

            <div className="mt-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#17495B]/15" />

              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#75888d]">
                INHOM
              </span>

              <span className="h-px flex-1 bg-[#17495B]/15" />
            </div>

            {/* Aviso */}

            <p className="mt-6 text-center text-[13px] text-[#687d82]">
              ¿No tienes una cuenta?{" "}
              <span className="font-semibold text-[#17495B]">
                Contacta con un administrador.
              </span>
            </p>

            {/* Footer */}

            <div className="mt-9 text-center">
              <p className="text-[8px] font-semibold uppercase tracking-[0.38em] text-[#17495B]/45">
                Construimos tu patrimonio
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}