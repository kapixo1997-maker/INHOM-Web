import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "INHOM | Bienes Raíces, Arquitectura y Construcción",
    template: "%s | INHOM",
  },

  description:
    "INHOM ofrece servicios de bienes raíces, arquitectura, construcción, gestión inmobiliaria y asesoría en Chetumal, Quintana Roo.",

  keywords: [
    "INHOM",
    "bienes raíces Chetumal",
    "inmobiliaria Chetumal",
    "casas en venta Chetumal",
    "terrenos en venta Chetumal",
    "arquitectura Chetumal",
    "construcción Chetumal",
    "gestión inmobiliaria",
    "Quintana Roo",
  ],

  authors: [
    {
      name: "INHOM",
    },
  ],

  creator: "INHOM",
  publisher: "INHOM",

  metadataBase: new URL("https://inhom-web.vercel.app"),

  openGraph: {
    title: "INHOM | Bienes Raíces, Arquitectura y Construcción",
    description:
      "Encuentra propiedades, desarrolla proyectos arquitectónicos y construye tu patrimonio con INHOM.",
    url: "https://inhom-web.vercel.app",
    siteName: "INHOM",
    locale: "es_MX",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "INHOM | Bienes Raíces, Arquitectura y Construcción",
    description:
      "Bienes raíces, arquitectura, construcción y gestión inmobiliaria en Chetumal, Quintana Roo.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}