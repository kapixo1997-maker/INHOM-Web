"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient as createAdminClient } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";

/* =========================================================
   CLIENTE ADMINISTRATIVO DE SUPABASE
   SOLO SERVIDOR
========================================================= */

function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !secretKey) {
    throw new Error(
      "Faltan las variables de entorno necesarias para administrar usuarios."
    );
  }

  return createAdminClient(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/* =========================================================
   CERRAR SESIÓN
========================================================= */

export async function cerrarSesion() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error al cerrar sesión:", error);
    throw new Error("No se pudo cerrar la sesión.");
  }

  redirect("/login");
}

/* =========================================================
   ELIMINAR PROPIEDAD
   SOLO ADMINISTRADORES
========================================================= */

export async function eliminarPropiedad(formData: FormData) {
  const supabase = await createClient();

  /* -------------------------------------------------------
     1. COMPROBAR SESIÓN
  ------------------------------------------------------- */

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  /* -------------------------------------------------------
     2. COMPROBAR QUE SEA ADMINISTRADOR
  ------------------------------------------------------- */

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("rol, activo")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    console.error(
      "No se pudo comprobar el perfil:",
      profileError
    );

    throw new Error(
      "No se pudo comprobar tu permiso para realizar esta acción."
    );
  }

  if (!profile.activo || profile.rol !== "admin") {
    throw new Error(
      "No tienes permisos para eliminar propiedades."
    );
  }

  /* -------------------------------------------------------
     3. OBTENER ID
  ------------------------------------------------------- */

  const propiedadId = formData.get("propiedadId");

  if (
    typeof propiedadId !== "string" ||
    propiedadId.trim() === ""
  ) {
    throw new Error(
      "No se recibió una propiedad válida para eliminar."
    );
  }

  /* -------------------------------------------------------
     4. COMPROBAR QUE LA PROPIEDAD EXISTA
  ------------------------------------------------------- */

  const { data: propiedad, error: propiedadError } =
    await supabase
      .from("properties")
      .select("id, titulo")
      .eq("id", propiedadId)
      .maybeSingle();

  if (propiedadError) {
    console.error(
      "Error al buscar la propiedad:",
      propiedadError
    );

    throw new Error(
      "No se pudo comprobar la propiedad."
    );
  }

  if (!propiedad) {
    throw new Error(
      "La propiedad que intentas eliminar ya no existe."
    );
  }

  /* -------------------------------------------------------
     5. ELIMINAR REGISTRO
  ------------------------------------------------------- */

  const { error: deleteError } = await supabase
    .from("properties")
    .delete()
    .eq("id", propiedadId);

  if (deleteError) {
    console.error(
      "Error al eliminar propiedad:",
      deleteError
    );

    throw new Error(
      "No se pudo eliminar la propiedad."
    );
  }

  /* -------------------------------------------------------
     6. ACTUALIZAR PANEL
  ------------------------------------------------------- */

  revalidatePath("/panel");
  revalidatePath("/propiedades");
}

/* =========================================================
   ACTIVAR / DESACTIVAR SOCIO
   SOLO ADMINISTRADORES
========================================================= */

export async function cambiarEstadoSocio(formData: FormData) {
  const supabase = await createClient();

  /* -------------------------------------------------------
     1. COMPROBAR SESIÓN
  ------------------------------------------------------- */

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  /* -------------------------------------------------------
     2. COMPROBAR QUE SEA ADMINISTRADOR
  ------------------------------------------------------- */

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("rol, activo")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    console.error(
      "No se pudo comprobar el perfil:",
      profileError
    );

    throw new Error(
      "No se pudo comprobar tu permiso para realizar esta acción."
    );
  }

  if (!profile.activo || profile.rol !== "admin") {
    throw new Error(
      "No tienes permisos para administrar socios."
    );
  }

  /* -------------------------------------------------------
     3. OBTENER DATOS DEL SOCIO
  ------------------------------------------------------- */

  const socioId = formData.get("socioId");
  const nuevoEstado = formData.get("nuevoEstado");

  if (
    typeof socioId !== "string" ||
    socioId.trim() === ""
  ) {
    throw new Error(
      "No se recibió un socio válido."
    );
  }

  if (
    nuevoEstado !== "true" &&
    nuevoEstado !== "false"
  ) {
    throw new Error(
      "El estado recibido no es válido."
    );
  }

  const activo = nuevoEstado === "true";

  /* -------------------------------------------------------
     4. EVITAR MODIFICAR LA PROPIA CUENTA
  ------------------------------------------------------- */

  if (socioId === user.id) {
    throw new Error(
      "No puedes cambiar el estado de tu propia cuenta."
    );
  }

  /* -------------------------------------------------------
     5. COMPROBAR QUE LA CUENTA SEA DE UN SOCIO
  ------------------------------------------------------- */

  const { data: socio, error: socioError } = await supabase
    .from("profiles")
    .select("id, rol")
    .eq("id", socioId)
    .maybeSingle();

  if (socioError) {
    console.error(
      "Error al comprobar el socio:",
      socioError
    );

    throw new Error(
      "No se pudo comprobar la cuenta del socio."
    );
  }

  if (!socio || socio.rol !== "socio") {
    throw new Error(
      "La cuenta seleccionada no corresponde a un socio."
    );
  }

  /* -------------------------------------------------------
     6. CAMBIAR ESTADO
  ------------------------------------------------------- */

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      activo,
    })
    .eq("id", socioId);

  if (updateError) {
    console.error(
      "Error al cambiar estado del socio:",
      updateError
    );

    throw new Error(
      "No se pudo cambiar el estado del socio."
    );
  }

  /* -------------------------------------------------------
     7. ACTUALIZAR PANEL
  ------------------------------------------------------- */

  revalidatePath("/panel");
}

/* =========================================================
   CREAR SOCIO
   SOLO ADMINISTRADORES
========================================================= */

export async function crearSocio(formData: FormData) {
  const supabase = await createClient();

  /* -------------------------------------------------------
     1. COMPROBAR SESIÓN DEL ADMINISTRADOR
  ------------------------------------------------------- */

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  /* -------------------------------------------------------
     2. COMPROBAR QUE SEA ADMINISTRADOR
  ------------------------------------------------------- */

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("rol, activo")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    console.error(
      "No se pudo comprobar el perfil del administrador:",
      profileError
    );

    throw new Error(
      "No se pudo comprobar tu permiso para crear socios."
    );
  }

  if (!profile.activo || profile.rol !== "admin") {
    throw new Error(
      "No tienes permisos para crear socios."
    );
  }

  /* -------------------------------------------------------
     3. OBTENER Y LIMPIAR DATOS DEL FORMULARIO
  ------------------------------------------------------- */

  const nombreValue = formData.get("nombre");
  const emailValue = formData.get("email");
  const telefonoValue = formData.get("telefono");
  const empresaValue = formData.get("empresa");

  const nombre =
    typeof nombreValue === "string"
      ? nombreValue.trim()
      : "";

  const email =
    typeof emailValue === "string"
      ? emailValue.trim().toLowerCase()
      : "";

  const telefono =
    typeof telefonoValue === "string"
      ? telefonoValue.trim()
      : "";

  const empresa =
    typeof empresaValue === "string"
      ? empresaValue.trim()
      : "";

  /* -------------------------------------------------------
     4. VALIDAR DATOS
  ------------------------------------------------------- */

  if (!nombre) {
    throw new Error(
      "Ingresa el nombre del socio."
    );
  }

  if (!email) {
    throw new Error(
      "Ingresa el correo electrónico del socio."
    );
  }

  const emailValido =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!emailValido) {
    throw new Error(
      "Ingresa un correo electrónico válido."
    );
  }

  /* -------------------------------------------------------
     5. CREAR CLIENTE ADMINISTRATIVO
  ------------------------------------------------------- */

  const supabaseAdmin = getSupabaseAdmin();

  /* -------------------------------------------------------
     6. URL A LA QUE LLEGARÁ EL SOCIO
  ------------------------------------------------------- */

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const redirectTo =
    `${siteUrl}/restablecer-contrasena`;

  /* -------------------------------------------------------
     7. INVITAR AL SOCIO
     SUPABASE CREA EL USUARIO Y ENVÍA EL CORREO
  ------------------------------------------------------- */

  const { data: inviteData, error: inviteError } =
    await supabaseAdmin.auth.admin.inviteUserByEmail(
      email,
      {
        redirectTo,

        data: {
          nombre,
          telefono: telefono || null,
          empresa: empresa || "INHOM",
          rol: "socio",
        },
      }
    );

  if (inviteError) {
    console.error(
      "Error al invitar socio en Supabase Auth:",
      inviteError
    );

    const mensaje =
      inviteError.message.toLowerCase();

    if (
      mensaje.includes("already") ||
      mensaje.includes("registered") ||
      mensaje.includes("exists")
    ) {
      throw new Error(
        "Ya existe una cuenta registrada con ese correo electrónico."
      );
    }

    throw new Error(
      "No se pudo crear ni enviar la invitación al socio."
    );
  }

  const nuevoUsuario = inviteData.user;

  if (!nuevoUsuario) {
    throw new Error(
      "Supabase no devolvió el usuario invitado."
    );
  }

  /* -------------------------------------------------------
     8. CREAR / ACTUALIZAR PERFIL DEL SOCIO
  ------------------------------------------------------- */

  const { error: profileInsertError } =
    await supabaseAdmin
      .from("profiles")
      .upsert(
        {
          id: nuevoUsuario.id,
          nombre,
          email,
          telefono: telefono || null,
          empresa: empresa || "INHOM",
          rol: "socio",
          activo: true,
        },
        {
          onConflict: "id",
        }
      );

  if (profileInsertError) {
    console.error(
      "Error al crear el perfil del socio:",
      profileInsertError
    );

    /* -----------------------------------------------------
       LIMPIEZA:
       SI FALLA PROFILES, ELIMINAMOS EL USUARIO DE AUTH
    ----------------------------------------------------- */

    const { error: rollbackError } =
      await supabaseAdmin.auth.admin.deleteUser(
        nuevoUsuario.id
      );

    if (rollbackError) {
      console.error(
        "También falló la eliminación del usuario incompleto:",
        rollbackError
      );
    }

    throw new Error(
      "La invitación fue creada, pero no se pudo configurar el perfil del socio."
    );
  }

  /* -------------------------------------------------------
     9. ACTUALIZAR PANEL
  ------------------------------------------------------- */

  revalidatePath("/panel");
}