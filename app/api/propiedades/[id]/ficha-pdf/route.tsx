import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
  renderToBuffer,
} from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import React from "react";

import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const C = {
  navy: "#123E4C",
  teal: "#2F806F",
  pale: "#F2F6F5",
  pale2: "#F7F9F8",
  text: "#243238",
  muted: "#66767B",
  line: "#DDE5E3",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", backgroundColor: C.white, color: C.text },
  pad: { padding: 46 },
  cover: { position: "relative", backgroundColor: C.navy, color: C.white },
  coverImage: { position: "absolute", width: "100%", height: "100%", objectFit: "cover" },
  coverShade: { position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.46)" },
  coverInner: { position: "relative", height: "100%", padding: 46, justifyContent: "space-between" },
  brand: { fontSize: 25, fontWeight: 700, letterSpacing: 1.4 },
  pill: { alignSelf: "flex-start", border: "1px solid rgba(255,255,255,.45)", borderRadius: 14, paddingVertical: 7, paddingHorizontal: 12, fontSize: 8, letterSpacing: 1.2 },
  coverTitle: { fontSize: 39, fontWeight: 700, lineHeight: 1.02, maxWidth: 430 },
  coverMeta: { marginTop: 14, fontSize: 12, color: "#F3F6F5", maxWidth: 420 },
  priceLabel: { marginTop: 24, fontSize: 7, letterSpacing: 2, color: "#D7E2DF" },
  price: { marginTop: 5, fontSize: 29, fontWeight: 700 },
  coverFoot: { borderTop: "1px solid rgba(255,255,255,.35)", paddingTop: 14, flexDirection: "row", justifyContent: "space-between", fontSize: 7, letterSpacing: 1.4, color: "#E1E9E7" },

  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `1px solid ${C.line}`, paddingBottom: 18, marginBottom: 25 },
  eyebrow: { fontSize: 7, fontWeight: 700, letterSpacing: 1.8, color: C.teal, textTransform: "uppercase" },
  h1: { marginTop: 7, fontSize: 22, fontWeight: 700, color: C.navy },
  h2: { marginTop: 7, fontSize: 19, fontWeight: 700, color: C.navy },
  body: { marginTop: 12, fontSize: 10, lineHeight: 1.65, color: C.muted },
  logoText: { fontSize: 16, fontWeight: 700, color: C.navy, letterSpacing: 1 },
  twoCol: { flexDirection: "row", gap: 22 },
  grow: { flexGrow: 1, flexBasis: 0 },
  side: { width: 205, backgroundColor: C.pale, borderRadius: 16, padding: 18 },
  stat: { paddingVertical: 9, borderBottom: `1px solid ${C.line}` },
  statLabel: { fontSize: 6.5, letterSpacing: 1, color: "#7A898D", textTransform: "uppercase" },
  statValue: { marginTop: 3, fontSize: 11, fontWeight: 700, color: C.text },
  section: { marginTop: 28, borderTop: `1px solid ${C.line}`, paddingTop: 20 },
  photos: { flexDirection: "row", gap: 12, marginTop: 15 },
  photo: { flexGrow: 1, flexBasis: 0, height: 180, objectFit: "cover", borderRadius: 14, backgroundColor: C.pale },
  galleryMain: { width: "60%", height: 220, objectFit: "cover", borderRadius: 14, backgroundColor: C.pale },
  gallerySide: { width: "40%", gap: 10 },
  gallerySmall: { width: "100%", height: 105, objectFit: "cover", borderRadius: 12, backgroundColor: C.pale },
  cards: { flexDirection: "row", gap: 15, marginTop: 22 },
  card: { flexGrow: 1, flexBasis: 0, borderRadius: 16, padding: 18, backgroundColor: C.pale2, border: `1px solid ${C.line}` },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 7, marginTop: 12 },
  chip: { width: "47%", backgroundColor: C.white, borderRadius: 8, padding: 8, fontSize: 8, color: C.text },
  contact: { marginTop: 22, backgroundColor: C.navy, color: C.white, borderRadius: 17, padding: 20, flexDirection: "row", justifyContent: "space-between", gap: 18 },
  contactTitle: { fontSize: 17, fontWeight: 700 },
  contactText: { marginTop: 7, fontSize: 8.5, lineHeight: 1.5, color: "#D7E2DF" },
  adviser: { width: 190, backgroundColor: "rgba(255,255,255,.1)", borderRadius: 12, padding: 13 },
  adviserLabel: { fontSize: 6.5, letterSpacing: 1, color: "#C6D5D1" },
  adviserName: { marginTop: 4, fontSize: 10, fontWeight: 700 },
  adviserLine: { marginTop: 7, fontSize: 8, color: "#EEF4F2" },
  footer: { position: "absolute", left: 46, right: 46, bottom: 28, borderTop: `1px solid ${C.line}`, paddingTop: 10, flexDirection: "row", justifyContent: "space-between", fontSize: 6.5, letterSpacing: 1.2, color: "#8A979A" },
});

function money(value: unknown) {
  if (value === null || value === undefined || value === "") return "Precio a consultar";
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

function safeFileName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_ ]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function PdfDocument({
  propiedad,
  imagenes,
  asesor,
}: {
  propiedad: any;
  imagenes: string[];
  asesor: { nombre: string | null; telefono: string | null; email: string | null } | null;
}) {
  const ubicacion =
    [propiedad.direccion, propiedad.colonia, propiedad.ciudad].filter(Boolean).join(", ") ||
    "Ubicación no especificada";

  const caracteristicas = [
    ["Recámaras", propiedad.recamaras],
    ["Baños", propiedad.banos],
    ["Estacionamientos", propiedad.estacionamientos],
    ["Terreno", propiedad.terreno_m2 ? `${propiedad.terreno_m2} m²` : null],
    ["Construcción", propiedad.construccion_m2 ? `${propiedad.construccion_m2} m²` : null],
  ].filter(([, value]) => value !== null && value !== undefined);

  const amenidades = Array.isArray(propiedad.amenidades) ? propiedad.amenidades : [];
  const fallbackItems = caracteristicas.map(([label, value]) => `${label}: ${value}`);
  const chips = amenidades.length ? amenidades.slice(0, 8) : fallbackItems.slice(0, 8);

  return (
    <Document title={`INHOM - ${propiedad.titulo}`}>
      <Page size="A4" style={[styles.page, styles.cover]}>
        {imagenes[0] && <Image src={imagenes[0]} style={styles.coverImage} />}
        <View style={styles.coverShade} />
        <View style={styles.coverInner}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={styles.brand}>INHOM</Text>
            <Text style={styles.pill}>
              {[propiedad.operacion, propiedad.tipo, propiedad.ciudad].filter(Boolean).join(" · ") || "PROPIEDAD"}
            </Text>
          </View>
          <View>
            <Text style={styles.coverTitle}>{propiedad.titulo}</Text>
            <Text style={styles.coverMeta}>{ubicacion}</Text>
            <Text style={styles.priceLabel}>PRECIO</Text>
            <Text style={styles.price}>{money(propiedad.precio)}</Text>
          </View>
          <View style={styles.coverFoot}>
            <Text>ARQUITECTURA · CONSTRUCCIÓN · BIENES RAÍCES</Text>
            <Text>FICHA DE PROPIEDAD</Text>
          </View>
        </View>
      </Page>

      <Page size="A4" style={[styles.page, styles.pad]}>
        <View style={styles.top}>
          <View>
            <Text style={styles.eyebrow}>FICHA TÉCNICA</Text>
            <Text style={styles.h1}>{propiedad.titulo}</Text>
          </View>
          <Text style={styles.logoText}>INHOM</Text>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.grow}>
            <Text style={styles.eyebrow}>DESCRIPCIÓN</Text>
            <Text style={styles.h2}>Conoce la propiedad</Text>
            <Text style={styles.body}>{propiedad.descripcion || "Sin descripción registrada."}</Text>
          </View>
          <View style={styles.side}>
            <Text style={styles.eyebrow}>DATOS CLAVE</Text>
            {caracteristicas.map(([label, value]) => (
              <View key={String(label)} style={styles.stat}>
                <Text style={styles.statLabel}>{String(label)}</Text>
                <Text style={styles.statValue}>{String(value)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.eyebrow}>DISTRIBUCIÓN Y ESPACIOS</Text>
          <Text style={styles.h2}>Recorrido visual de la propiedad</Text>
          <View style={styles.photos}>
            {imagenes[1] || imagenes[0] ? <Image src={imagenes[1] || imagenes[0]} style={styles.photo} /> : <View style={styles.photo} />}
            {imagenes[2] || imagenes[0] ? <Image src={imagenes[2] || imagenes[0]} style={styles.photo} /> : <View style={styles.photo} />}
          </View>
        </View>

        {amenidades.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.eyebrow}>AMENIDADES DESTACADAS</Text>
            <View style={styles.chips}>
              {amenidades.slice(0, 6).map((item: string) => <Text key={item} style={styles.chip}>✓ {item}</Text>)}
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <Text>ARQUITECTURA · CONSTRUCCIÓN · BIENES RAÍCES</Text>
          <Text>02</Text>
        </View>
      </Page>

      <Page size="A4" style={[styles.page, styles.pad]}>
        <View style={styles.top}>
          <View>
            <Text style={styles.eyebrow}>CONOCE CADA ESPACIO</Text>
            <Text style={styles.h1}>Galería de la propiedad</Text>
          </View>
          <Text style={styles.logoText}>INHOM</Text>
        </View>

        {imagenes[0] ? (
          imagenes.length > 1 ? (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Image src={imagenes[1] || imagenes[0]} style={styles.galleryMain} />
              <View style={styles.gallerySide}>
                <Image src={imagenes[2] || imagenes[0]} style={styles.gallerySmall} />
                <Image src={imagenes[3] || imagenes[1] || imagenes[0]} style={styles.gallerySmall} />
              </View>
            </View>
          ) : (
            <Image src={imagenes[0]} style={{ width: "100%", height: 220, objectFit: "cover", borderRadius: 14 }} />
          )
        ) : (
          <View style={{ height: 220, backgroundColor: C.pale, borderRadius: 14 }} />
        )}

        <View style={styles.cards}>
          <View style={styles.card}>
            <Text style={styles.eyebrow}>{amenidades.length ? "AMENIDADES" : "CARACTERÍSTICAS PRINCIPALES"}</Text>
            <Text style={styles.h2}>{amenidades.length ? "Lo que ofrece esta propiedad" : "Información esencial"}</Text>
            <View style={styles.chips}>
              {chips.map((item: string) => <Text key={item} style={styles.chip}>{item}</Text>)}
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.eyebrow}>UBICACIÓN</Text>
            <Text style={styles.h2}>{propiedad.ciudad || "Ubicación disponible bajo consulta"}</Text>
            <Text style={styles.body}>{propiedad.direccion || propiedad.ciudad || "Solicita al asesor la ubicación y referencias de esta propiedad."}</Text>
          </View>
        </View>

        <View style={styles.contact}>
          <View style={styles.grow}>
            <Text style={styles.eyebrow}>INHOM BIENES RAÍCES</Text>
            <Text style={styles.contactTitle}>¿Te interesa esta propiedad?</Text>
            <Text style={styles.contactText}>Nuestro equipo puede brindarte información adicional y acompañarte durante el proceso.</Text>
          </View>
          <View style={styles.adviser}>
            <Text style={styles.adviserLabel}>ASESOR RESPONSABLE</Text>
            <Text style={styles.adviserName}>{asesor?.nombre || "Equipo INHOM"}</Text>
            {asesor?.telefono && <Text style={styles.adviserLine}>{asesor.telefono}</Text>}
            {asesor?.email && <Text style={styles.adviserLine}>{asesor.email}</Text>}
          </View>
        </View>

        <View style={styles.footer}>
          <Text>ARQUITECTURA · CONSTRUCCIÓN · BIENES RAÍCES</Text>
          <Text>03</Text>
        </View>
      </Page>
    </Document>
  );
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("rol, activo")
    .eq("id", user.id)
    .single();

  if (!profile?.activo) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { data: propiedad } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single();

  if (!propiedad) return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
  if (profile.rol !== "admin" && propiedad.created_by !== user.id) {
    return NextResponse.json({ error: "Sin permiso" }, { status: 403 });
  }

  const { data: imageRows } = await supabase
    .from("property_images")
    .select("storage_path, orden")
    .eq("property_id", id)
    .order("orden", { ascending: true });

  const imagenes = (imageRows || []).map((img: any) => {
    const { data } = supabase.storage.from("property-images").getPublicUrl(img.storage_path);
    return data.publicUrl;
  });

  let asesor: { nombre: string | null; telefono: string | null; email: string | null } | null = null;
  if (propiedad.created_by) {
    const { data } = await supabase
      .from("profiles")
      .select("nombre, telefono, email")
      .eq("id", propiedad.created_by)
      .single();
    asesor = data;
  }

  const buffer = await renderToBuffer(
    <PdfDocument propiedad={propiedad} imagenes={imagenes} asesor={asesor} />,
  );

  const fileName = `INHOM-${safeFileName(propiedad.titulo || "propiedad")}.pdf`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
