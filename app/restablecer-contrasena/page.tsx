"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export default function RestablecerContrasenaPage() {
  const supabase = createClient();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    setError("");

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      console.error(
        "Error al restablecer la contraseña:",
        updateError
      );

      setError(
        "No se pudo cambiar la contraseña. El enlace puede haber expirado. Solicita uno nuevo."
      );

      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    // Cerramos la sesión de recuperación.
    await supabase.auth.signOut();

    setTimeout(() => {
      router.replace("/login");
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#f7f8f6]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================================
            LADO IZQUIERDO
        ===================================================== */}

        <section className="relative hidden min-h-screen overflow-hidden lg:block">
          <img
            src="/images/login-inhom.png"
            alt="Arquitectura INHOM"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-[#07181d]/40 via-[#07181d]/32 to-[#061418]/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/5" />

          <div className="relative z-10 flex min-h-screen flex-col px-12 py-10 text-white xl:px-16 xl:py-12">

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="flex items-start justify-between"
            >
              <img
                src="/logo/inhom-logo-white.png"
                alt="INHOM Bienes Raíces"
                className="h-auto w-[205px] object-contain xl:w-[220px]"
                draggable={false}
              />

              <div className="mt-2 flex items-center gap-4">
                <span className="h-px w-8 bg-white/60" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/85">
                  Chetumal, Q. Roo
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12 }}
              className="my-auto max-w-[540px]"
            >
              <h1
                className="text-[52px] font-normal leading-[1.06] tracking-[-0.035em] text-white xl:text-[58px]"
                style={{
                  fontFamily:
                    'Georgia, "Times New Roman", Times, serif',
                }}
              >
                Recupera
                <br />
                tu acceso.
              </h1>

              <div className="mt-9 h-px w-16 bg-white/75" />

              <p className="mt-6 max-w-sm text-[18px] font-light leading-[1.5] text-white/90">
                Tu cuenta INHOM,
                <br />
                segura y protegida.
              </p>
            </motion.div>

            <div>
              <div className="mb-6 h-px w-16 bg-white/55" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/90">
                Arquitectura · Construcción · Bienes Raíces
              </p>

              <p className="mt-3 text-[8px] font-medium uppercase tracking-[0.27em] text-white/50">
                Más que propiedades, futuros reales.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            LADO DERECHO
        ===================================================== */}

        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafbf9] px-6 py-10 sm:px-10 lg:px-14 xl:px-20">

          <div className="pointer-events-none absolute bottom-[-180px] right-[-120px] h-[520px] w-[620px] rotate-[-8deg] rounded-[80px] border border-[#17495B]/[0.05]" />

          <div className="pointer-events-none absolute bottom-[-220px] right-[60px] h-[470px] w-[520px] rotate-[12deg] rounded-[70px] border border-[#17495B]/[0.04]" />

          <div className="absolute right-10 top-10 hidden items-center gap-4 lg:flex xl:right-16 xl:top-12">
            <span className="h-px w-8 bg-[#17495B]/30" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.42em] text-[#17495B]/65">
              Seguridad
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="relative z-10 w-full max-w-[500px]"
          >
            {!success ? (
              <>
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#17495B]/10">
                    <LockKeyhole
                      size={25}
                      strokeWidth={1.8}
                      className="text-[#17495B]"
                    />
                  </div>

                  <h2
                    className="mt-6 text-[38px] font-normal leading-tight text-[#123f4b] sm:text-[42px]"
                    style={{
                      fontFamily:
                        'Georgia, "Times New Roman", Times, serif',
                    }}
                  >
                    Nueva contraseña
                  </h2>

                  <p className="mx-auto mt-4 max-w-[390px] text-[15px] leading-6 text-[#52676d]">
                    Ingresa una nueva contraseña para recuperar
                    el acceso a tu cuenta.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="mt-9"
                >
                  {/* NUEVA CONTRASEÑA */}

                  <div className="relative">
                    <LockKeyhole
                      size={20}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#17495B]"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);

                        if (error) setError("");
                      }}
                      placeholder="Nueva contraseña"
                      className="h-[58px] w-full rounded-xl border border-[#17495B]/20 bg-white/75 pl-14 pr-14 text-[15px] text-[#173e49] outline-none transition duration-200 placeholder:text-[#73868b] hover:border-[#17495B]/35 focus:border-[#17495B]/60 focus:bg-white focus:ring-4 focus:ring-[#17495B]/5"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((current) => !current)
                      }
                      className="absolute right-5 top-1/2 -translate-y-1/2 p-1 text-[#71858b] transition hover:text-[#17495B]"
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>

                  {/* CONFIRMAR */}

                  <div className="relative mt-3">
                    <LockKeyhole
                      size={20}
                      strokeWidth={1.8}
                      className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#17495B]"
                    />

                    <input
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      required
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(event) => {
                        setConfirmPassword(event.target.value);

                        if (error) setError("");
                      }}
                      placeholder="Confirmar contraseña"
                      className="h-[58px] w-full rounded-xl border border-[#17495B]/20 bg-white/75 pl-14 pr-14 text-[15px] text-[#173e49] outline-none transition duration-200 placeholder:text-[#73868b] hover:border-[#17495B]/35 focus:border-[#17495B]/60 focus:bg-white focus:ring-4 focus:ring-[#17495B]/5"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(
                          (current) => !current
                        )
                      }
                      className="absolute right-5 top-1/2 -translate-y-1/2 p-1 text-[#71858b] transition hover:text-[#17495B]"
                      aria-label={
                        showConfirmPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>

                  <p className="mt-3 text-[12px] text-[#73868b]">
                    Utiliza al menos 8 caracteres.
                  </p>

                  {/* ERROR */}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* BOTÓN */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group mt-6 flex h-[58px] w-full items-center justify-center rounded-xl bg-[#17495B] px-6 text-[15px] font-semibold text-white shadow-[0_14px_30px_rgba(23,73,91,0.17)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#123D4B] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="flex items-center gap-3">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Actualizando...
                      </span>
                    ) : (
                      <span className="relative flex w-full items-center justify-center">
                        Cambiar contraseña

                        <ArrowRight
                          size={19}
                          className="absolute right-1 transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* =================================================
                  ÉXITO
              ================================================= */

              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                  <CheckCircle2
                    size={32}
                    className="text-emerald-600"
                  />
                </div>

                <h2
                  className="mt-6 text-[38px] font-normal text-[#123f4b]"
                  style={{
                    fontFamily:
                      'Georgia, "Times New Roman", Times, serif',
                  }}
                >
                  Contraseña actualizada
                </h2>

                <p className="mx-auto mt-4 max-w-sm text-[15px] leading-6 text-[#52676d]">
                  Tu contraseña fue actualizada correctamente.
                  En unos segundos volverás al inicio de sesión.
                </p>

                <div className="mx-auto mt-7 h-5 w-5 animate-spin rounded-full border-2 border-[#17495B]/20 border-t-[#17495B]" />
              </motion.div>
            )}

            <div className="mt-9 flex items-center gap-4">
              <span className="h-px flex-1 bg-[#17495B]/15" />

              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#75888d]">
                INHOM
              </span>

              <span className="h-px flex-1 bg-[#17495B]/15" />
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}