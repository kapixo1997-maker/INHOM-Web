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

/* =========================================================
   COLORES INHOM
========================================================= */

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

/* =========================================================
   ESTILOS
========================================================= */

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: C.white,
    color: C.text,
  },

  pad: {
    paddingTop: 42,
    paddingBottom: 48,
    paddingHorizontal: 46,
  },

  /* =========================
     PORTADA
  ========================= */

  cover: {
    position: "relative",
    backgroundColor: C.navy,
    color: C.white,
  },

  coverImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  coverShade: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.48)",
  },

  coverInner: {
    position: "relative",
    height: "100%",
    padding: 46,
    justifyContent: "space-between",
  },

  brand: {
    fontSize: 25,
    fontWeight: 700,
    letterSpacing: 2,
  },

  pill: {
    alignSelf: "flex-start",
    border: "1px solid rgba(255,255,255,.45)",
    borderRadius: 14,
    paddingVertical: 7,
    paddingHorizontal: 12,
    fontSize: 8,
    letterSpacing: 1.2,
  },

  coverTitle: {
    fontSize: 39,
    fontWeight: 700,
    lineHeight: 1.05,
    maxWidth: 430,
  },

  coverMeta: {
    marginTop: 14,
    fontSize: 12,
    color: "#F3F6F5",
    maxWidth: 420,
  },

  priceLabel: {
    marginTop: 24,
    fontSize: 7,
    letterSpacing: 2,
    color: "#D7E2DF",
  },

  price: {
    marginTop: 5,
    fontSize: 29,
    fontWeight: 700,
  },

  coverFoot: {
    borderTop: "1px solid rgba(255,255,255,.35)",
    paddingTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    letterSpacing: 1.4,
    color: "#E1E9E7",
  },

  /* =========================
     ENCABEZADOS
  ========================= */

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: `1px solid ${C.line}`,
    paddingBottom: 18,
    marginBottom: 25,
  },

  eyebrow: {
    fontSize: 7,
    fontWeight: 700,
    letterSpacing: 1.8,
    color: C.teal,
    textTransform: "uppercase",
  },

  h1: {
    marginTop: 7,
    fontSize: 22,
    fontWeight: 700,
    color: C.navy,
  },

  h2: {
    marginTop: 7,
    fontSize: 18,
    fontWeight: 700,
    color: C.navy,
  },

  body: {
    marginTop: 12,
    fontSize: 10,
    lineHeight: 1.65,
    color: C.muted,
  },

  logoText: {
    fontSize: 16,
    fontWeight: 700,
    color: C.navy,
    letterSpacing: 1.5,
  },

  /* =========================
     DATOS
  ========================= */

  twoCol: {
    flexDirection: "row",
    gap: 22,
  },

  grow: {
    flexGrow: 1,
    flexBasis: 0,
  },

  side: {
    width: 205,
    backgroundColor: C.pale,
    borderRadius: 16,
    padding: 18,
  },

  stat: {
    paddingVertical: 9,
    borderBottom: `1px solid ${C.line}`,
  },

  statLabel: {
    fontSize: 6.5,
    letterSpacing: 1,
    color: "#7A898D",
    textTransform: "uppercase",
  },

  statValue: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: 700,
    color: C.text,
  },

  section: {
    marginTop: 28,
    borderTop: `1px solid ${C.line}`,
    paddingTop: 20,
  },

  /* =========================
     FOTOS
  ========================= */

  photos: {
    flexDirection: "row",
    gap: 12,
    marginTop: 15,
  },

  photo: {
    flexGrow: 1,
    flexBasis: 0,
    height: 180,
    objectFit: "cover",
    borderRadius: 14,
    backgroundColor: C.pale,
  },

  galleryHero: {
    width: "100%",
    height: 275,
    objectFit: "cover",
    borderRadius: 14,
    backgroundColor: C.pale,
  },

  galleryRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  galleryHalf: {
    width: "49%",
    height: 180,
    objectFit: "cover",
    borderRadius: 12,
    backgroundColor: C.pale,
  },

  galleryThird: {
    width: "32%",
    height: 145,
    objectFit: "cover",
    borderRadius: 12,
    backgroundColor: C.pale,
  },

  /* =========================
     AMENIDADES / TARJETAS
  ========================= */

  cards: {
    flexDirection: "row",
    gap: 15,
    marginTop: 22,
  },

  card: {
    flexGrow: 1,
    flexBasis: 0,
    borderRadius: 16,
    padding: 18,
    backgroundColor: C.pale2,
    border: `1px solid ${C.line}`,
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 12,
  },

  chip: {
    width: "47%",
    backgroundColor: C.white,
    borderRadius: 8,
    padding: 8,
    fontSize: 8,
    color: C.text,
  },

  /* =========================
     PLANOS
  ========================= */

  planCard: {
    marginTop: 18,
    border: `1px solid ${C.line}`,
    borderRadius: 16,
    padding: 12,
    backgroundColor: C.pale2,
  },

  planImage: {
    width: "100%",
    height: 500,
    objectFit: "contain",
    backgroundColor: C.white,
    borderRadius: 10,
  },

  planLabel: {
    marginTop: 10,
    fontSize: 10,
    fontWeight: 700,
    color: C.navy,
  },

  planDescription: {
    marginTop: 4,
    fontSize: 8,
    color: C.muted,
  },

  /* =========================
     CONTACTO
  ========================= */

  contact: {
    marginTop: 25,
    backgroundColor: C.navy,
    color: C.white,
    borderRadius: 17,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
  },

  contactTitle: {
    fontSize: 17,
    fontWeight: 700,
  },

  contactText: {
    marginTop: 7,
    fontSize: 8.5,
    lineHeight: 1.5,
    color: "#D7E2DF",
  },

  adviser: {
    width: 190,
    backgroundColor: "rgba(255,255,255,.1)",
    borderRadius: 12,
    padding: 13,
  },

  adviserLabel: {
    fontSize: 6.5,
    letterSpacing: 1,
    color: "#C6D5D1",
  },

  adviserName: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: 700,
  },

  adviserLine: {
    marginTop: 7,
    fontSize: 8,
    color: "#EEF4F2",
  },

  footer: {
    position: "absolute",
    left: 46,
    right: 46,
    bottom: 28,
    borderTop: `1px solid ${C.line}`,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 6.5,
    letterSpacing: 1.2,
    color: "#8A979A",
  },
});

/* =========================================================
   HELPERS
========================================================= */

function money(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "Precio a consultar";
  }

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

/* =========================================================
   DOCUMENTO PDF
========================================================= */

function PdfDocument({
  propiedad,
  fotos,
  planos,
  asesor,
}: {
  propiedad: any;
  fotos: string[];
  planos: string[];
  asesor: {
    nombre: string | null;
    telefono: string | null;
    email: string | null;
  } | null;
}) {
  const ubicacion =
    [propiedad.direccion, propiedad.colonia, propiedad.ciudad]
      .filter(Boolean)
      .join(", ") || "Ubicación no especificada";

  const caracteristicas = [
    ["Recámaras", propiedad.recamaras],
    ["Baños", propiedad.banos],
    ["Estacionamientos", propiedad.estacionamientos],
    [
      "Terreno",
      propiedad.terreno_m2 ? `${propiedad.terreno_m2} m²` : null,
    ],
    [
      "Construcción",
      propiedad.construccion_m2
        ? `${propiedad.construccion_m2} m²`
        : null,
    ],
  ].filter(
    ([, value]) =>
      value !== null &&
      value !== undefined &&
      value !== ""
  );

  const amenidades = Array.isArray(propiedad.amenidades)
    ? propiedad.amenidades
    : [];

  const fallbackItems = caracteristicas.map(
    ([label, value]) => `${label}: ${value}`
  );

  const chips = amenidades.length
    ? amenidades.slice(0, 8)
    : fallbackItems.slice(0, 8);

  return (
    <Document
      title={`INHOM - ${propiedad.titulo}`}
      author="INHOM"
      subject="Catálogo de propiedad"
    >
      {/* =====================================================
          PÁGINA 1 — PORTADA
      ===================================================== */}

      <Page size="A4" style={[styles.page, styles.cover]}>
        {fotos[0] && (
          <Image src={fotos[0]} style={styles.coverImage} />
        )}

        <View style={styles.coverShade} />

        <View style={styles.coverInner}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.brand}>INHOM</Text>

            <Text style={styles.pill}>
              {[
                propiedad.operacion,
                propiedad.tipo,
                propiedad.ciudad,
              ]
                .filter(Boolean)
                .join(" · ") || "PROPIEDAD"}
            </Text>
          </View>

          <View>
            <Text style={styles.coverTitle}>
              {propiedad.titulo}
            </Text>

            <Text style={styles.coverMeta}>
              {ubicacion}
            </Text>

            <Text style={styles.priceLabel}>
              PRECIO
            </Text>

            <Text style={styles.price}>
              {money(propiedad.precio)}
            </Text>
          </View>

          <View style={styles.coverFoot}>
            <Text>
              ARQUITECTURA · CONSTRUCCIÓN · BIENES RAÍCES
            </Text>

            <Text>CATÁLOGO DE PROPIEDAD</Text>
          </View>
        </View>
      </Page>

      {/* =====================================================
          PÁGINA 2 — INFORMACIÓN
      ===================================================== */}

      <Page size="A4" style={[styles.page, styles.pad]}>
        <View style={styles.top}>
          <View>
            <Text style={styles.eyebrow}>
              LA PROPIEDAD
            </Text>

            <Text style={styles.h1}>
              {propiedad.titulo}
            </Text>
          </View>

          <Text style={styles.logoText}>
            INHOM
          </Text>
        </View>

        <View style={styles.twoCol}>
          <View style={styles.grow}>
            <Text style={styles.eyebrow}>
              DESCRIPCIÓN
            </Text>

            <Text style={styles.h2}>
              Conoce la propiedad
            </Text>

            <Text style={styles.body}>
              {propiedad.descripcion ||
                "Información disponible bajo consulta."}
            </Text>
          </View>

          {caracteristicas.length > 0 && (
            <View style={styles.side}>
              <Text style={styles.eyebrow}>
                DATOS PRINCIPALES
              </Text>

              {caracteristicas.map(
                ([label, value]) => (
                  <View
                    key={String(label)}
                    style={styles.stat}
                  >
                    <Text style={styles.statLabel}>
                      {String(label)}
                    </Text>

                    <Text style={styles.statValue}>
                      {String(value)}
                    </Text>
                  </View>
                )
              )}
            </View>
          )}
        </View>

        {/* FOTOS DE PRESENTACIÓN */}

        {fotos.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.eyebrow}>
              RECORRIDO VISUAL
            </Text>

            <Text style={styles.h2}>
              Espacios de la propiedad
            </Text>

            <View style={styles.photos}>
              {fotos[1] || fotos[0] ? (
                <Image
                  src={fotos[1] || fotos[0]}
                  style={styles.photo}
                />
              ) : null}

              {fotos[2] || fotos[0] ? (
                <Image
                  src={fotos[2] || fotos[0]}
                  style={styles.photo}
                />
              ) : null}
            </View>
          </View>
        )}

        {/* AMENIDADES */}

        {amenidades.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.eyebrow}>
              AMENIDADES DESTACADAS
            </Text>

            <View style={styles.chips}>
              {amenidades
                .slice(0, 6)
                .map((item: string) => (
                  <Text
                    key={item}
                    style={styles.chip}
                  >
                    {item}
                  </Text>
                ))}
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <Text>
            ARQUITECTURA · CONSTRUCCIÓN · BIENES RAÍCES
          </Text>

          <Text>02</Text>
        </View>
      </Page>

      {/* =====================================================
          PÁGINA 3 — GALERÍA
      ===================================================== */}

      {fotos.length > 0 && (
        <Page size="A4" style={[styles.page, styles.pad]}>
          <View style={styles.top}>
            <View>
              <Text style={styles.eyebrow}>
                RECORRIDO VISUAL
              </Text>

              <Text style={styles.h1}>
                Galería de la propiedad
              </Text>
            </View>

            <Text style={styles.logoText}>
              INHOM
            </Text>
          </View>

          <Image
            src={fotos[0]}
            style={styles.galleryHero}
          />

          {fotos.length > 2 && (
            <View style={styles.galleryRow}>
              {fotos[1] && (
                <Image
                  src={fotos[1]}
                  style={styles.galleryHalf}
                />
              )}

              {fotos[2] && (
                <Image
                  src={fotos[2]}
                  style={styles.galleryHalf}
                />
              )}
            </View>
          )}

          {fotos.length > 3 && (
            <View style={styles.galleryRow}>
              {fotos.slice(3, 6).map(
                (foto, index) => (
                  <Image
                    key={`foto-${index}`}
                    src={foto}
                    style={styles.galleryThird}
                  />
                )
              )}
            </View>
          )}

          <View style={styles.footer}>
            <Text>
              ARQUITECTURA · CONSTRUCCIÓN · BIENES RAÍCES
            </Text>

            <Text>03</Text>
          </View>
        </Page>
      )}

      {/* =====================================================
          FOTOGRAFÍAS ADICIONALES
      ===================================================== */}

      {fotos.length > 6 &&
        Array.from({
          length: Math.ceil((fotos.length - 6) / 6),
        }).map((_, pageIndex) => {
          const start = 6 + pageIndex * 6;
          const pagePhotos = fotos.slice(
            start,
            start + 6
          );

          return (
            <Page
              key={`gallery-page-${pageIndex}`}
              size="A4"
              style={[styles.page, styles.pad]}
            >
              <View style={styles.top}>
                <View>
                  <Text style={styles.eyebrow}>
                    GALERÍA
                  </Text>

                  <Text style={styles.h1}>
                    Más espacios
                  </Text>
                </View>

                <Text style={styles.logoText}>
                  INHOM
                </Text>
              </View>

              {Array.from({
                length: Math.ceil(
                  pagePhotos.length / 2
                ),
              }).map((__, rowIndex) => {
                const row = pagePhotos.slice(
                  rowIndex * 2,
                  rowIndex * 2 + 2
                );

                return (
                  <View
                    key={`row-${rowIndex}`}
                    style={[
                      styles.galleryRow,
                      {
                        marginTop:
                          rowIndex === 0 ? 0 : 10,
                      },
                    ]}
                  >
                    {row.map(
                      (foto, photoIndex) => (
                        <Image
                          key={`extra-${photoIndex}`}
                          src={foto}
                          style={{
                            width:
                              row.length === 1
                                ? "100%"
                                : "49%",
                            height: 205,
                            objectFit: "cover",
                            borderRadius: 12,
                          }}
                        />
                      )
                    )}
                  </View>
                );
              })}

              <View style={styles.footer}>
                <Text>
                  ARQUITECTURA · CONSTRUCCIÓN · BIENES RAÍCES
                </Text>

                <Text>
                  {String(4 + pageIndex).padStart(
                    2,
                    "0"
                  )}
                </Text>
              </View>
            </Page>
          );
        })}

      {/* =====================================================
          PLANOS
          SOLO APARECE SI EXISTEN
      ===================================================== */}

      {planos.map((plano, index) => (
        <Page
          key={`plano-${index}`}
          size="A4"
          style={[styles.page, styles.pad]}
        >
          <View style={styles.top}>
            <View>
              <Text style={styles.eyebrow}>
                DISTRIBUCIÓN
              </Text>

              <Text style={styles.h1}>
                {planos.length === 1
                  ? "Plano de la propiedad"
                  : `Plano ${index + 1}`}
              </Text>
            </View>

            <Text style={styles.logoText}>
              INHOM
            </Text>
          </View>

          <View style={styles.planCard}>
            <Image
              src={plano}
              style={styles.planImage}
            />

            <Text style={styles.planLabel}>
              {planos.length === 1
                ? "Plano arquitectónico"
                : `Plano ${index + 1}`}
            </Text>

            <Text style={styles.planDescription}>
              Representación gráfica de la distribución
              y organización de los espacios de esta
              propiedad.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text>
              ARQUITECTURA · CONSTRUCCIÓN · BIENES RAÍCES
            </Text>

            <Text>
              PLANO {index + 1}
            </Text>
          </View>
        </Page>
      ))}

      {/* =====================================================
          ÚLTIMA PÁGINA — INFORMACIÓN Y CONTACTO
      ===================================================== */}

      <Page size="A4" style={[styles.page, styles.pad]}>
        <View style={styles.top}>
          <View>
            <Text style={styles.eyebrow}>
              INHOM BIENES RAÍCES
            </Text>

            <Text style={styles.h1}>
              Información de la propiedad
            </Text>
          </View>

          <Text style={styles.logoText}>
            INHOM
          </Text>
        </View>

        <View style={styles.cards}>
          <View style={styles.card}>
            <Text style={styles.eyebrow}>
              {amenidades.length
                ? "AMENIDADES"
                : "CARACTERÍSTICAS"}
            </Text>

            <Text style={styles.h2}>
              {amenidades.length
                ? "Lo que ofrece esta propiedad"
                : "Información principal"}
            </Text>

            <View style={styles.chips}>
              {chips.map((item: string) => (
                <Text
                  key={item}
                  style={styles.chip}
                >
                  {item}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.eyebrow}>
              UBICACIÓN
            </Text>

            <Text style={styles.h2}>
              {propiedad.ciudad ||
                "Ubicación disponible bajo consulta"}
            </Text>

            <Text style={styles.body}>
              {ubicacion}
            </Text>
          </View>
        </View>

        <View style={styles.contact}>
          <View style={styles.grow}>
            <Text
              style={[
                styles.eyebrow,
                { color: "#BFD5CF" },
              ]}
            >
              INHOM BIENES RAÍCES
            </Text>

            <Text style={styles.contactTitle}>
              ¿Te interesa esta propiedad?
            </Text>

            <Text style={styles.contactText}>
              Nuestro equipo puede brindarte
              información adicional, resolver tus
              dudas y acompañarte durante el proceso.
            </Text>
          </View>

          <View style={styles.adviser}>
            <Text style={styles.adviserLabel}>
              ASESOR RESPONSABLE
            </Text>

            <Text style={styles.adviserName}>
              {asesor?.nombre || "Equipo INHOM"}
            </Text>

            {asesor?.telefono && (
              <Text style={styles.adviserLine}>
                {asesor.telefono}
              </Text>
            )}

            {asesor?.email && (
              <Text style={styles.adviserLine}>
                {asesor.email}
              </Text>
            )}
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
            padding: 20,
            borderRadius: 14,
            backgroundColor: C.pale,
          }}
        >
          <Text style={styles.eyebrow}>
            NOTA
          </Text>

          <Text style={styles.body}>
            La información presentada en este catálogo
            tiene fines informativos y comerciales.
            Disponibilidad, precio y características
            pueden estar sujetos a actualización.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>
            ARQUITECTURA · CONSTRUCCIÓN · BIENES RAÍCES
          </Text>

          <Text>INHOM</Text>
        </View>
      </Page>
    </Document>
  );
}

/* =========================================================
   GET / PDF
========================================================= */

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;

    const supabase = await createClient();

    /* =========================
       USUARIO
    ========================= */

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    /* =========================
       PERFIL
    ========================= */

    const { data: profile } = await supabase
      .from("profiles")
      .select("rol, activo")
      .eq("id", user.id)
      .single();

    if (!profile?.activo) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    /* =========================
       PROPIEDAD
    ========================= */

    const { data: propiedad, error: propertyError } =
      await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

    if (propertyError || !propiedad) {
      return NextResponse.json(
        { error: "Propiedad no encontrada" },
        { status: 404 }
      );
    }

    if (
      profile.rol !== "admin" &&
      propiedad.created_by !== user.id
    ) {
      return NextResponse.json(
        { error: "Sin permiso" },
        { status: 403 }
      );
    }

    /* =====================================================
       IMÁGENES

       IMPORTANTE:
       Ahora leemos la columna "tipo".
       foto  = fotografía
       plano = plano
    ===================================================== */

    const {
      data: imageRows,
      error: imageError,
    } = await supabase
      .from("property_images")
      .select(
        "storage_path, public_url, orden, tipo"
      )
      .eq("property_id", id)
      .order("orden", { ascending: true });

    if (imageError) {
      console.error(
        "Error obteniendo imágenes:",
        imageError
      );

      return NextResponse.json(
        {
          error:
            "No se pudieron cargar las imágenes de la propiedad.",
        },
        { status: 500 }
      );
    }

    /* =====================================================
       CONVERTIR FILAS A URL
    ===================================================== */

    const getImageUrl = (img: any) => {
      /*
       * Si ya tenemos public_url guardada,
       * usamos esa.
       */
      if (img.public_url) {
        return img.public_url;
      }

      /*
       * Si no existe public_url,
       * la generamos desde storage_path.
       */
      const { data } = supabase.storage
        .from("property-images")
        .getPublicUrl(img.storage_path);

      return data.publicUrl;
    };

    /* =====================================================
       SEPARAR FOTOS
    ===================================================== */

    const fotos = (imageRows || [])
      .filter(
        (img: any) =>
          !img.tipo || img.tipo === "foto"
      )
      .map(getImageUrl)
      .filter(Boolean);

    /* =====================================================
       SEPARAR PLANOS
    ===================================================== */

    const planos = (imageRows || [])
      .filter(
        (img: any) => img.tipo === "plano"
      )
      .map(getImageUrl)
      .filter(Boolean);

    console.log(
      `PDF propiedad ${id}: ${fotos.length} fotos / ${planos.length} planos`
    );

    /* =========================
       ASESOR
    ========================= */

    let asesor: {
      nombre: string | null;
      telefono: string | null;
      email: string | null;
    } | null = null;

    if (propiedad.created_by) {
      const { data } = await supabase
        .from("profiles")
        .select("nombre, telefono, email")
        .eq("id", propiedad.created_by)
        .single();

      asesor = data;
    }

    /* =========================
       CREAR PDF
    ========================= */

    const buffer = await renderToBuffer(
      <PdfDocument
        propiedad={propiedad}
        fotos={fotos}
        planos={planos}
        asesor={asesor}
      />
    );

    /* =========================
       NOMBRE DEL ARCHIVO
    ========================= */

    const fileName = `INHOM-${safeFileName(
      propiedad.titulo || "propiedad"
    )}.pdf`;

    /* =========================
       RESPUESTA
    ========================= */

    return new Response(
      new Uint8Array(buffer),
      {
        headers: {
          "Content-Type": "application/pdf",

          "Content-Disposition":
            `attachment; filename="${fileName}"`,

          "Cache-Control":
            "private, no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "Error generando catálogo PDF:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Ocurrió un error al generar el catálogo de la propiedad.",
      },
      { status: 500 }
    );
  }
}