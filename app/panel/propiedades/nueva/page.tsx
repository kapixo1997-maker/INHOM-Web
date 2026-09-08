"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Save,
  MapPin,
  DollarSign,
  BedDouble,
  Bath,
  Car,
  Ruler,
  Loader2,
  Images,
  UploadCloud,
  X,
  ImageIcon,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

const MAX_FOTOS = 50;
const MAX_PLANOS = 20;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

type SelectedImage = {
  id: string;
  file: File;
  preview: string;
};

export default function NuevaPropiedadPage() {
  const router = useRouter();

  const supabase = useMemo(() => createClient(), []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("casa");
  const [operacion, setOperacion] = useState("venta");
  const [precio, setPrecio] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [ubicacionUrl, setUbicacionUrl] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [recamaras, setRecamaras] = useState("");
  const [banos, setBanos] = useState("");
  const [estacionamientos, setEstacionamientos] = useState("");

  const [terreno, setTerreno] = useState("");
  const [construccion, setConstruccion] = useState("");

  const [imagenes, setImagenes] = useState<SelectedImage[]>([]);
  const [planos, setPlanos] = useState<SelectedImage[]>([]);

  // ============================================================
  // LIMPIAR PREVIEWS AL SALIR
  // ============================================================

  useEffect(() => {
    return () => {
      imagenes.forEach((imagen) => URL.revokeObjectURL(imagen.preview));
      planos.forEach((plano) => URL.revokeObjectURL(plano.preview));
    };
  }, [imagenes, planos]);

  // ============================================================
  // SELECCIONAR IMÁGENES
  // ============================================================

  const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) {
      return;
    }

    setError("");

    const espaciosDisponibles = MAX_FOTOS - imagenes.length;

    if (espaciosDisponibles <= 0) {
      setError(`Puedes subir un máximo de ${MAX_FOTOS} fotografías.`);
      event.target.value = "";
      return;
    }

    const archivosSeleccionados = files.slice(0, espaciosDisponibles);

    const archivosInvalidos = archivosSeleccionados.filter(
      (file) => !file.type.startsWith("image/")
    );

    if (archivosInvalidos.length > 0) {
      setError("Solamente puedes seleccionar archivos de imagen.");
      event.target.value = "";
      return;
    }

    const archivosMuyGrandes = archivosSeleccionados.filter(
      (file) => file.size > MAX_FILE_SIZE
    );

    if (archivosMuyGrandes.length > 0) {
      setError("Cada fotografía debe pesar máximo 10 MB.");
      event.target.value = "";
      return;
    }

    const nuevasImagenes: SelectedImage[] = archivosSeleccionados.map(
      (file) => ({
        id: `${crypto.randomUUID()}-${file.name}`,
        file,
        preview: URL.createObjectURL(file),
      })
    );

    setImagenes((actuales) => [...actuales, ...nuevasImagenes]);

    if (files.length > espaciosDisponibles) {
      setError(
        `Solo se agregaron ${espaciosDisponibles} fotografías. El máximo es ${MAX_FOTOS}.`
      );
    }

    event.target.value = "";
  };

  // ============================================================
  // SELECCIONAR PLANOS
  // ============================================================

  const handlePlanosChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    setError("");

    const espaciosDisponibles = MAX_PLANOS - planos.length;

    if (espaciosDisponibles <= 0) {
      setError(`Puedes subir un máximo de ${MAX_PLANOS} planos.`);
      event.target.value = "";
      return;
    }

    const archivosSeleccionados = files.slice(0, espaciosDisponibles);

    if (archivosSeleccionados.some((file) => !file.type.startsWith("image/"))) {
      setError("Los planos deben subirse como imágenes.");
      event.target.value = "";
      return;
    }

    if (archivosSeleccionados.some((file) => file.size > MAX_FILE_SIZE)) {
      setError("Cada plano debe pesar máximo 10 MB.");
      event.target.value = "";
      return;
    }

    const nuevosPlanos: SelectedImage[] = archivosSeleccionados.map((file) => ({
      id: `${crypto.randomUUID()}-${file.name}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setPlanos((actuales) => [...actuales, ...nuevosPlanos]);

    if (files.length > espaciosDisponibles) {
      setError(`Solo se agregaron ${espaciosDisponibles} planos. El máximo es ${MAX_PLANOS}.`);
    }

    event.target.value = "";
  };

  // ============================================================
  // QUITAR IMAGEN ANTES DE ENVIAR
  // ============================================================

  const eliminarImagenSeleccionada = (id: string) => {
    setImagenes((actuales) => {
      const imagen = actuales.find((item) => item.id === id);

      if (imagen) {
        URL.revokeObjectURL(imagen.preview);
      }

      return actuales.filter((item) => item.id !== id);
    });
  };

  const eliminarPlanoSeleccionado = (id: string) => {
    setPlanos((actuales) => {
      const plano = actuales.find((item) => item.id === id);
      if (plano) URL.revokeObjectURL(plano.preview);
      return actuales.filter((item) => item.id !== id);
    });
  };

  // ============================================================
  // EXTENSIÓN SEGURA
  // ============================================================

  const obtenerExtension = (file: File) => {
    const extensionNombre = file.name.split(".").pop()?.toLowerCase();

    if (
      extensionNombre &&
      /^[a-z0-9]+$/.test(extensionNombre) &&
      extensionNombre.length <= 5
    ) {
      return extensionNombre;
    }

    if (file.type === "image/png") return "png";
    if (file.type === "image/webp") return "webp";
    if (file.type === "image/gif") return "gif";
    if (file.type === "image/heic") return "heic";
    if (file.type === "image/heif") return "heif";

    return "jpg";
  };

  // ============================================================
  // ENVIAR PROPIEDAD
  // ============================================================

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    // ------------------------------------------------------------
    // 1. VERIFICAR USUARIO
    // ------------------------------------------------------------

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("Tu sesión no es válida. Vuelve a iniciar sesión.");
      setLoading(false);
      return;
    }

    // ------------------------------------------------------------
    // 2. CREAR PROPIEDAD Y RECUPERAR UUID
    // ------------------------------------------------------------

    const { data: propiedadCreada, error: insertError } = await supabase
      .from("properties")
      .insert({
        titulo: titulo.trim(),
        tipo,
        operacion,
        precio: precio ? Number(precio) : null,
        direccion: ubicacion.trim(),
        descripcion: descripcion.trim() || null,
        ubicacion_url: ubicacionUrl.trim() || null,
        recamaras: recamaras ? Number(recamaras) : null,
        banos: banos ? Number(banos) : null,
        estacionamientos: estacionamientos
          ? Number(estacionamientos)
          : null,
        terreno_m2: terreno ? Number(terreno) : null,
        construccion_m2: construccion ? Number(construccion) : null,
        created_by: user.id,
        estado_publicacion: "pendiente",
      })
      .select("id")
      .single();

    if (insertError || !propiedadCreada) {
      console.error("ERROR AL GUARDAR PROPIEDAD:", insertError);

      setError(
        `No se pudo guardar la propiedad. ${
          insertError?.message ?? "No se recibió el ID de la propiedad."
        }`
      );

      setLoading(false);
      return;
    }

    const propertyId = propiedadCreada.id;

    // ------------------------------------------------------------
    // 3. SUBIR FOTOGRAFÍAS
    // ------------------------------------------------------------

    const archivosSubidos: string[] = [];

    try {
      for (let index = 0; index < imagenes.length; index++) {
        const imagen = imagenes[index];

        const extension = obtenerExtension(imagen.file);

        const nombreArchivo = `${String(index + 1).padStart(
          2,
          "0"
        )}-${crypto.randomUUID()}.${extension}`;

        const storagePath = `${propertyId}/${nombreArchivo}`;

        // --------------------------------------------------------
        // SUBIR ARCHIVO A STORAGE
        // --------------------------------------------------------

        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(storagePath, imagen.file, {
            cacheControl: "3600",
            upsert: false,
            contentType: imagen.file.type || undefined,
          });

        if (uploadError) {
          throw new Error(
            `No se pudo subir "${imagen.file.name}": ${uploadError.message}`
          );
        }

        archivosSubidos.push(storagePath);

        // --------------------------------------------------------
        // OBTENER URL PÚBLICA
        // --------------------------------------------------------

        const {
          data: { publicUrl },
        } = supabase.storage
          .from("property-images")
          .getPublicUrl(storagePath);

        // --------------------------------------------------------
        // REGISTRAR IMAGEN EN property_images
        // --------------------------------------------------------

        const { error: imageInsertError } = await supabase
          .from("property_images")
          .insert({
            property_id: propertyId,
            storage_path: storagePath,
            public_url: publicUrl,
            orden: index,
            tipo: "foto",
          });

        if (imageInsertError) {
          throw new Error(
            `La fotografía se subió, pero no pudo registrarse: ${imageInsertError.message}`
          );
        }
      }

      // ----------------------------------------------------------
      // 4. SUBIR PLANOS
      // ----------------------------------------------------------
      for (let index = 0; index < planos.length; index++) {
        const plano = planos[index];
        const extension = obtenerExtension(plano.file);
        const nombreArchivo = `plano-${String(index + 1).padStart(2, "0")}-${crypto.randomUUID()}.${extension}`;
        const storagePath = `${propertyId}/planos/${nombreArchivo}`;

        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(storagePath, plano.file, {
            cacheControl: "3600",
            upsert: false,
            contentType: plano.file.type || undefined,
          });

        if (uploadError) {
          throw new Error(`No se pudo subir el plano "${plano.file.name}": ${uploadError.message}`);
        }

        archivosSubidos.push(storagePath);

        const { data: { publicUrl } } = supabase.storage
          .from("property-images")
          .getPublicUrl(storagePath);

        const { error: planoInsertError } = await supabase
          .from("property_images")
          .insert({
            property_id: propertyId,
            storage_path: storagePath,
            public_url: publicUrl,
            orden: index,
            tipo: "plano",
          });

        if (planoInsertError) {
          throw new Error(`El plano se subió, pero no pudo registrarse: ${planoInsertError.message}`);
        }
      }
    } catch (imageError) {
      console.error("ERROR AL SUBIR FOTOGRAFÍAS:", imageError);

      // ----------------------------------------------------------
      // LIMPIEZA SI ALGO FALLA
      // ----------------------------------------------------------

      if (archivosSubidos.length > 0) {
        const { error: removeError } = await supabase.storage
          .from("property-images")
          .remove(archivosSubidos);

        if (removeError) {
          console.error(
            "ERROR AL LIMPIAR ARCHIVOS SUBIDOS:",
            removeError
          );
        }
      }

      const { error: deletePropertyError } = await supabase
        .from("properties")
        .delete()
        .eq("id", propertyId);

      if (deletePropertyError) {
        console.error(
          "ERROR AL ELIMINAR PROPIEDAD INCOMPLETA:",
          deletePropertyError
        );
      }

      setError(
        imageError instanceof Error
          ? `No se pudo completar el envío. ${imageError.message}`
          : "No se pudieron subir las fotografías."
      );

      setLoading(false);
      return;
    }

    // ------------------------------------------------------------
    // 5. TODO CORRECTO
    // ------------------------------------------------------------

    setSuccess(
      `Propiedad enviada correctamente${
        imagenes.length > 0 ? ` con ${imagenes.length} fotografía${imagenes.length === 1 ? "" : "s"}` : ""
      }${planos.length > 0 ? ` y ${planos.length} plano${planos.length === 1 ? "" : "s"}` : ""}.`
    );

    setLoading(false);

    setTimeout(() => {
      router.push("/panel");
      router.refresh();
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#F5F7F7]">
      {/* HEADER */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#17495B]">
              INHOM
            </p>

            <h1 className="mt-1 text-2xl font-black text-gray-900">
              Nueva propiedad
            </h1>
          </div>

          <Link
            href="/panel"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
            Volver al panel
          </Link>
        </div>
      </header>

      {/* CONTENIDO */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
        <div className="mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#17495B] text-white shadow-sm">
            <Building2 size={27} />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#17495B]">
            Propiedades
          </p>

          <h2 className="mt-2 text-3xl font-black text-gray-900 md:text-4xl">
            Subir nueva propiedad
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600">
            Ingresa la información del inmueble y agrega sus fotografías. La
            propiedad quedará pendiente hasta ser revisada y aprobada.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-10"
        >
          {/* INFORMACIÓN PRINCIPAL */}
          <div>
            <h3 className="text-xl font-black text-gray-900">
              Información principal
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Datos principales con los que identificaremos la propiedad.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* TÍTULO */}
              <div className="md:col-span-2">
                <label
                  htmlFor="titulo"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Título de la propiedad *
                </label>

                <input
                  id="titulo"
                  type="text"
                  required
                  value={titulo}
                  onChange={(event) => setTitulo(event.target.value)}
                  placeholder="Ej. Casa en Residencial Las Américas"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                />
              </div>

              {/* TIPO */}
              <div>
                <label
                  htmlFor="tipo"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Tipo de propiedad *
                </label>

                <select
                  id="tipo"
                  required
                  value={tipo}
                  onChange={(event) => setTipo(event.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                >
                  <option value="casa">Casa</option>
                  <option value="terreno">Terreno</option>
                  <option value="departamento">Departamento</option>
                  <option value="local">Local comercial</option>
                  <option value="oficina">Oficina</option>
                  <option value="bodega">Bodega</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* OPERACIÓN */}
              <div>
                <label
                  htmlFor="operacion"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Operación *
                </label>

                <select
                  id="operacion"
                  required
                  value={operacion}
                  onChange={(event) => setOperacion(event.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                >
                  <option value="venta">Venta</option>
                  <option value="renta">Renta</option>
                </select>
              </div>
            </div>
          </div>

          <div className="my-10 border-t border-gray-200" />

          {/* PRECIO Y UBICACIÓN */}
          <div>
            <h3 className="text-xl font-black text-gray-900">
              Precio y ubicación
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Ingresa la dirección de la propiedad y, si cuentas con ella, agrega
              también su ubicación directa en Google Maps.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* PRECIO */}
              <div>
                <label
                  htmlFor="precio"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Precio *
                </label>

                <div className="relative">
                  <DollarSign
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="precio"
                    type="number"
                    required
                    min="0"
                    step="1"
                    value={precio}
                    onChange={(event) => setPrecio(event.target.value)}
                    placeholder="1550000"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-gray-900 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                  />
                </div>
              </div>

              {/* DIRECCIÓN */}
              <div>
                <label
                  htmlFor="ubicacion"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Dirección o ubicación *
                </label>

                <div className="relative">
                  <MapPin
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="ubicacion"
                    type="text"
                    required
                    value={ubicacion}
                    onChange={(event) => setUbicacion(event.target.value)}
                    placeholder="Ej. Av. Héroes #294, Chetumal"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-gray-900 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                  />
                </div>
              </div>

              {/* ENLACE DE UBICACIÓN */}
              <div className="md:col-span-2">
                <label
                  htmlFor="ubicacionUrl"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Enlace de ubicación
                  <span className="ml-2 font-normal text-gray-400">
                    (opcional)
                  </span>
                </label>

                <div className="relative">
                  <MapPin
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="ubicacionUrl"
                    type="url"
                    value={ubicacionUrl}
                    onChange={(event) => setUbicacionUrl(event.target.value)}
                    placeholder="Pega aquí el enlace de Google Maps"
                    className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-11 pr-4 text-gray-900 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                  />
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Abre la propiedad en Google Maps, selecciona “Compartir” y pega aquí
                  el enlace. Los visitantes podrán abrir directamente la ubicación.
                </p>
              </div>
            </div>
          </div>

          <div className="my-10 border-t border-gray-200" />

          {/* CARACTERÍSTICAS */}
          <div>
            <h3 className="text-xl font-black text-gray-900">
              Características
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Puedes dejar vacíos los campos que no correspondan al inmueble.
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* RECÁMARAS */}
              <div>
                <label
                  htmlFor="recamaras"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Recámaras
                </label>

                <div className="relative">
                  <BedDouble
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="recamaras"
                    type="number"
                    min="0"
                    step="1"
                    value={recamaras}
                    onChange={(event) => setRecamaras(event.target.value)}
                    placeholder="2"
                    className="w-full rounded-xl border border-gray-300 py-3.5 pl-11 pr-4 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                  />
                </div>
              </div>

              {/* BAÑOS */}
              <div>
                <label
                  htmlFor="banos"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Baños
                </label>

                <div className="relative">
                  <Bath
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="banos"
                    type="number"
                    min="0"
                    step="0.5"
                    value={banos}
                    onChange={(event) => setBanos(event.target.value)}
                    placeholder="2"
                    className="w-full rounded-xl border border-gray-300 py-3.5 pl-11 pr-4 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                  />
                </div>
              </div>

              {/* ESTACIONAMIENTOS */}
              <div>
                <label
                  htmlFor="estacionamientos"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Estacionamientos
                </label>

                <div className="relative">
                  <Car
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="estacionamientos"
                    type="number"
                    min="0"
                    step="1"
                    value={estacionamientos}
                    onChange={(event) =>
                      setEstacionamientos(event.target.value)
                    }
                    placeholder="1"
                    className="w-full rounded-xl border border-gray-300 py-3.5 pl-11 pr-4 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* TERRENO */}
              <div>
                <label
                  htmlFor="terreno"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Terreno (m²)
                </label>

                <div className="relative">
                  <Ruler
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="terreno"
                    type="number"
                    min="0"
                    step="0.01"
                    value={terreno}
                    onChange={(event) => setTerreno(event.target.value)}
                    placeholder="164"
                    className="w-full rounded-xl border border-gray-300 py-3.5 pl-11 pr-4 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                  />
                </div>
              </div>

              {/* CONSTRUCCIÓN */}
              <div>
                <label
                  htmlFor="construccion"
                  className="mb-2 block text-sm font-bold text-gray-800"
                >
                  Construcción (m²)
                </label>

                <div className="relative">
                  <Ruler
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="construccion"
                    type="number"
                    min="0"
                    step="0.01"
                    value={construccion}
                    onChange={(event) => setConstruccion(event.target.value)}
                    placeholder="100"
                    className="w-full rounded-xl border border-gray-300 py-3.5 pl-11 pr-4 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="my-10 border-t border-gray-200" />

          {/* DESCRIPCIÓN */}
          <div>
            <label
              htmlFor="descripcion"
              className="mb-2 block text-sm font-bold text-gray-800"
            >
              Descripción
            </label>

            <textarea
              id="descripcion"
              rows={7}
              value={descripcion}
              onChange={(event) => setDescripcion(event.target.value)}
              placeholder="Describe la propiedad, sus espacios, características importantes, amenidades, referencias de ubicación, etc."
              className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#17495B] focus:ring-2 focus:ring-[#17495B]/20"
            />
          </div>

          <div className="my-10 border-t border-gray-200" />

          {/* FOTOGRAFÍAS */}
          <div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#17495B]/10 text-[#17495B]">
                <Images size={24} />
              </div>

              <div>
                <h3 className="text-xl font-black text-gray-900">
                  Fotografías de la propiedad
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Puedes agregar hasta {MAX_FOTOS} fotografías. La primera
                  imagen será utilizada como portada.
                </p>
              </div>
            </div>

            {/* SELECTOR */}
            <label
              htmlFor="fotografias"
              className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition hover:border-[#17495B] hover:bg-[#17495B]/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#17495B] shadow-sm">
                <UploadCloud size={27} />
              </div>

              <p className="mt-4 font-bold text-gray-900">
                Seleccionar fotografías
              </p>

              <p className="mt-1 text-sm text-gray-500">
                JPG, JPEG, PNG, WEBP, HEIC u otras imágenes compatibles.
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Máximo 10 MB por fotografía
              </p>

              <input
                id="fotografias"
                type="file"
                accept="image/*"
                multiple
                disabled={loading || imagenes.length >= MAX_FOTOS}
                onChange={handleImagesChange}
                className="hidden"
              />
            </label>

            {/* CONTADOR */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {imagenes.length === 0
                  ? "Todavía no has seleccionado fotografías."
                  : `${imagenes.length} ${
                      imagenes.length === 1
                        ? "fotografía seleccionada"
                        : "fotografías seleccionadas"
                    }`}
              </p>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
                {imagenes.length}/{MAX_FOTOS}
              </span>
            </div>

            {/* PREVIEWS */}
            {imagenes.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {imagenes.map((imagen, index) => (
                  <div
                    key={imagen.id}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
                  >
                    <div className="aspect-[4/3]">
                      <img
                        src={imagen.preview}
                        alt={`Fotografía ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* PORTADA */}
                    {index === 0 && (
                      <div className="absolute left-2 top-2 rounded-full bg-[#17495B] px-3 py-1 text-xs font-bold text-white shadow">
                        Portada
                      </div>
                    )}

                    {/* ELIMINAR */}
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        eliminarImagenSeleccionada(imagen.id)
                      }
                      className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white shadow transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Eliminar fotografía ${index + 1}`}
                    >
                      <X size={18} />
                    </button>

                    <div className="flex items-center gap-2 bg-white px-3 py-2">
                      <ImageIcon
                        size={15}
                        className="shrink-0 text-[#17495B]"
                      />

                      <p className="truncate text-xs font-medium text-gray-600">
                        {imagen.file.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 rounded-xl border border-[#17495B]/15 bg-[#17495B]/5 px-4 py-3 text-sm text-[#17495B]">
              <strong>Consejo:</strong> coloca primero la fotografía que quieras
              usar como portada de la propiedad.
            </div>
          </div>

          <div className="my-10 border-t border-gray-200" />

          {/* PLANOS */}
          <div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#17495B]/10 text-[#17495B]">
                <Ruler size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">Planos de la propiedad</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Sube aquí plantas arquitectónicas, distribución, planta baja, planta alta u otros planos.
                </p>
              </div>
            </div>

            <label
              htmlFor="planos"
              className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition hover:border-[#17495B] hover:bg-[#17495B]/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#17495B] shadow-sm">
                <UploadCloud size={27} />
              </div>
              <p className="mt-4 font-bold text-gray-900">Seleccionar planos</p>
              <p className="mt-1 text-sm text-gray-500">JPG, JPEG, PNG, WEBP, HEIC u otras imágenes compatibles.</p>
              <p className="mt-1 text-xs text-gray-400">Máximo 10 MB por plano</p>
              <input
                id="planos"
                type="file"
                accept="image/*"
                multiple
                disabled={loading || planos.length >= MAX_PLANOS}
                onChange={handlePlanosChange}
                className="hidden"
              />
            </label>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {planos.length === 0
                  ? "Todavía no has seleccionado planos."
                  : `${planos.length} ${planos.length === 1 ? "plano seleccionado" : "planos seleccionados"}`}
              </p>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">
                {planos.length}/{MAX_PLANOS}
              </span>
            </div>

            {planos.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {planos.map((plano, index) => (
                  <div key={plano.id} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                    <div className="aspect-[4/3]">
                      <img src={plano.preview} alt={`Plano ${index + 1}`} className="h-full w-full object-cover" />
                    </div>
                    <div className="absolute left-2 top-2 rounded-full bg-[#17495B] px-3 py-1 text-xs font-bold text-white shadow">
                      Plano {index + 1}
                    </div>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => eliminarPlanoSeleccionado(plano.id)}
                      className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white shadow transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Eliminar plano ${index + 1}`}
                    >
                      <X size={18} />
                    </button>
                    <div className="flex items-center gap-2 bg-white px-3 py-2">
                      <Ruler size={15} className="shrink-0 text-[#17495B]" />
                      <p className="truncate text-xs font-medium text-gray-600">{plano.file.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MENSAJES */}
          {error && (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-8 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              {success}
            </div>
          )}

          {/* BOTONES */}
          <div className="mt-10 flex flex-col-reverse gap-3 border-t border-gray-200 pt-8 sm:flex-row sm:justify-end">
            <Link
              href="/panel"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17495B] px-7 py-3.5 font-semibold text-white shadow-md transition hover:bg-[#123B4A] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={19} className="animate-spin" />
                  {imagenes.length > 0 || planos.length > 0
                    ? "Subiendo propiedad..."
                    : "Guardando..."}
                </>
              ) : (
                <>
                  <Save size={19} />
                  Enviar propiedad
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}