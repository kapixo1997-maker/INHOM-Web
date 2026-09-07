
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

// ========================================
// APROBAR PROPIEDAD
// ========================================

export async function aprobarPropiedad(propertyId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Verificar que sea administrador
  const { data: profile } = await supabase
    .from("profiles")
    .select("rol, activo")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.activo || profile.rol !== "admin") {
    throw new Error("No tienes permisos para aprobar propiedades.");
  }

  // Aprobar solamente si está pendiente
  const { error } = await supabase
    .from("properties")
    .update({
      estado_publicacion: "publicada",
      approved_by: user.id,
      approved_at: new Date().toISOString(),
      motivo_rechazo: null,
    })
    .eq("id", propertyId)
    .eq("estado_publicacion", "pendiente");

  if (error) {
    console.error("Error al aprobar propiedad:", error);
    throw new Error("No se pudo aprobar la propiedad.");
  }

  revalidatePath("/panel");
  revalidatePath(`/panel/propiedades/${propertyId}`);

  redirect("/panel");
}

// ========================================
// RECHAZAR PROPIEDAD
// ========================================

export async function rechazarPropiedad(
  propertyId: string,
  formData: FormData
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Verificar que sea administrador
  const { data: profile } = await supabase
    .from("profiles")
    .select("rol, activo")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.activo || profile.rol !== "admin") {
    throw new Error("No tienes permisos para rechazar propiedades.");
  }

  const motivo = formData.get("motivo_rechazo");

  if (typeof motivo !== "string" || !motivo.trim()) {
    throw new Error("Debes indicar el motivo del rechazo.");
  }

  // Rechazar solamente si está pendiente
  const { error } = await supabase
    .from("properties")
    .update({
      estado_publicacion: "rechazada",
      motivo_rechazo: motivo.trim(),
      approved_by: user.id,
      approved_at: new Date().toISOString(),
    })
    .eq("id", propertyId)
    .eq("estado_publicacion", "pendiente");

  if (error) {
    console.error("Error al rechazar propiedad:", error);
    throw new Error("No se pudo rechazar la propiedad.");
  }

  revalidatePath("/panel");
  revalidatePath(`/panel/propiedades/${propertyId}`);

  redirect("/panel");
}

// ========================================
// REENVIAR PROPIEDAD CORREGIDA
// ========================================

export async function reenviarPropiedad(
  propertyId: string,
  formData: FormData
) {
  const supabase = await createClient();

  // ========================================
  // USUARIO ACTUAL
  // ========================================

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ========================================
  // VERIFICAR PERFIL
  // ========================================

  const { data: profile } = await supabase
    .from("profiles")
    .select("rol, activo")
    .eq("id", user.id)
    .single();

  if (!profile || !profile.activo) {
    redirect("/login");
  }

  // ========================================
  // BUSCAR PROPIEDAD
  // ========================================

  const { data: propiedad, error: propiedadError } = await supabase
    .from("properties")
    .select("id, created_by, estado_publicacion")
    .eq("id", propertyId)
    .single();

  if (propiedadError || !propiedad) {
    throw new Error("No se encontró la propiedad.");
  }

  // ========================================
  // SEGURIDAD
  // ========================================
  // Solo el socio propietario puede corregirla.

  if (propiedad.created_by !== user.id) {
    throw new Error("No tienes permisos para modificar esta propiedad.");
  }

  // Solamente se puede reenviar si fue rechazada.
  if (propiedad.estado_publicacion !== "rechazada") {
    throw new Error(
      "Esta propiedad no se encuentra disponible para corrección."
    );
  }

  // ========================================
  // OBTENER DATOS DEL FORMULARIO
  // ========================================

  const titulo = obtenerTexto(formData, "titulo");
  const tipo = obtenerTexto(formData, "tipo");
  const operacion = obtenerTexto(formData, "operacion");
  const direccion = obtenerTextoOpcional(formData, "direccion");
  const colonia = obtenerTextoOpcional(formData, "colonia");
  const ciudad = obtenerTexto(formData, "ciudad");
  const descripcion = obtenerTextoOpcional(formData, "descripcion");

  const precio = obtenerNumero(formData, "precio", true);
  const recamaras = obtenerNumero(formData, "recamaras");
  const banos = obtenerNumero(formData, "banos");
  const estacionamientos = obtenerNumero(
    formData,
    "estacionamientos"
  );
  const terrenoM2 = obtenerNumero(formData, "terreno_m2");
  const construccionM2 = obtenerNumero(
    formData,
    "construccion_m2"
  );

  // ========================================
  // VALIDACIONES BÁSICAS
  // ========================================

  if (!titulo) {
    throw new Error("El título de la propiedad es obligatorio.");
  }

  if (!ciudad) {
    throw new Error("La ciudad es obligatoria.");
  }

  if (precio === null || precio < 0) {
    throw new Error("Debes indicar un precio válido.");
  }

  const tiposPermitidos = [
    "casa",
    "departamento",
    "terreno",
    "local",
    "oficina",
    "otro",
  ];

  if (!tiposPermitidos.includes(tipo)) {
    throw new Error("El tipo de propiedad no es válido.");
  }

  const operacionesPermitidas = ["venta", "renta"];

  if (!operacionesPermitidas.includes(operacion)) {
    throw new Error("La operación seleccionada no es válida.");
  }

  // ========================================
  // ACTUALIZAR PROPIEDAD
  // ========================================

  const { error: updateError } = await supabase
    .from("properties")
    .update({
      titulo,
      tipo,
      operacion,
      precio,
      direccion,
      colonia,
      ciudad,
      descripcion,
      recamaras,
      banos,
      estacionamientos,
      terreno_m2: terrenoM2,
      construccion_m2: construccionM2,

      // Regresa a revisión
      estado_publicacion: "pendiente",

      // Limpiamos la revisión anterior
      motivo_rechazo: null,
      approved_by: null,
      approved_at: null,
    })
    .eq("id", propertyId)
    .eq("created_by", user.id)
    .eq("estado_publicacion", "rechazada");

  if (updateError) {
    console.error(
      "Error al reenviar propiedad:",
      updateError
    );

    throw new Error(
      "No se pudo guardar y reenviar la propiedad."
    );
  }

  // ========================================
  // ACTUALIZAR PÁGINAS
  // ========================================

  revalidatePath("/panel");
  revalidatePath(`/panel/propiedades/${propertyId}`);
  revalidatePath(`/panel/propiedades/${propertyId}/editar`);

  // ========================================
  // VOLVER AL DETALLE
  // ========================================

  redirect(`/panel/propiedades/${propertyId}`);
}

// ========================================
// FUNCIONES AUXILIARES
// ========================================

function obtenerTexto(
  formData: FormData,
  campo: string
): string {
  const valor = formData.get(campo);

  if (typeof valor !== "string") {
    return "";
  }

  return valor.trim();
}

function obtenerTextoOpcional(
  formData: FormData,
  campo: string
): string | null {
  const valor = formData.get(campo);

  if (typeof valor !== "string") {
    return null;
  }

  const limpio = valor.trim();

  return limpio || null;
}

function obtenerNumero(
  formData: FormData,
  campo: string,
  obligatorio = false
): number | null {
  const valor = formData.get(campo);

  if (
    typeof valor !== "string" ||
    valor.trim() === ""
  ) {
    return obligatorio ? null : null;
  }

  const numero = Number(valor);

  if (!Number.isFinite(numero) || numero < 0) {
    return null;
  }

  return numero;
}