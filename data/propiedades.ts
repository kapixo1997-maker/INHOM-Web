export type Propiedad = {
  id: string;
  tipo: "casa" | "terreno";
  nombre: string;
  precio: number;
  ubicacion: string;
  descripcion: string;
mapa?: string;
portada: string;
  imagenes: string[];
  caracteristicas: {
    habitaciones?: number;
    banos?: number;
    estacionamiento?: boolean;
    construccion?: number;
    terreno: number;
    niveles?: number;
    frente?: number;
    fondo?: number;
  };
  amenidades?: string[];
  idealPara?: string[];
};

export const propiedades: Propiedad[] = [
  {
    id: "casa-lopez-mateos",
    tipo: "casa",
    nombre: "Casa López Mateos",
    precio: 2950000,
    ubicacion: "Chetumal, Quintana Roo",
    descripcion: "Hermosa casa ideal para familias que buscan amplitud y comodidad.",
    mapa: "https://maps.google.com/?q=Chetumal+Quintana+Roo",
    portada: "/propiedades/casa-lopez-mateos/portada.jpg",
    imagenes: [
      "/propiedades/casa-lopez-mateos/portada.jpg",
      "/propiedades/casa-lopez-mateos/fachada.jpg",
      "/propiedades/casa-lopez-mateos/sala-comedor.jpg",
      "/propiedades/casa-lopez-mateos/cocina.jpg",
      "/propiedades/casa-lopez-mateos/recamara-principal.jpg",
      "/propiedades/casa-lopez-mateos/oficina.jpg",
      "/propiedades/casa-lopez-mateos/bano.jpg"
    ],
    caracteristicas:{
      habitaciones:3,
      banos:2,
      estacionamiento:true,
      construccion:196,
      terreno:360,
      niveles:2
    },
    amenidades:["Terraza","Área de lavado","Sala","Comedor","Cocina"]
  },
  {
    id:"casa-av-heroes-294",
    tipo:"casa",
    nombre:"Casa Av. Héroes 294",
    precio:6962624,
    ubicacion:"Av. Héroes #294, Chetumal",
    descripcion:"Casa de dos plantas sobre Avenida Héroes.",
    portada:"/propiedades/casa-av-heroes-294/portada.jpg",
    imagenes:["/propiedades/casa-av-heroes-294/portada.jpg"],
    caracteristicas:{
      habitaciones:2,
      banos:1,
      estacionamiento:true,
      construccion:503.06,
      terreno:283.19,
      niveles:2
    },
    amenidades:["Terraza","Área de lavado","Sala","Comedor","Cocina"]
  },
  {
    id:"casa-las-americas",
    tipo:"casa",
    nombre:"Casa Las Américas",
    precio:1420464,
    ubicacion:"Retorno 1 Norte #427, Fracc. Las Américas, Chetumal",
    descripcion:"Casa de una planta ideal para familias.",
    portada:"/propiedades/casa-las-americas/portada.jpg",
    imagenes:["/propiedades/casa-las-americas/portada.jpg"],
    caracteristicas:{
      habitaciones:2,
      banos:2,
      estacionamiento:true,
      construccion:99.44,
      terreno:164,
      niveles:1
    },
    amenidades:["Área de lavado","Patio de servicio","Sala","Comedor","Cocina"]
  },
  {
    id:"casa-alvaro-obregon",
    tipo:"casa",
    nombre:"Casa Álvaro Obregón",
    precio:6730000,
    ubicacion:"Priv. Álvaro Obregón #432, Centro, Chetumal",
    descripcion:"Residencia amplia con gran potencial.",
    portada:"/propiedades/casa-alvaro-obregon/portada.jpg",
    imagenes:["/propiedades/casa-alvaro-obregon/portada.jpg"],
    caracteristicas:{
      habitaciones:4,
      banos:2,
      estacionamiento:true,
      construccion:452.28,
      terreno:624
    },
    amenidades:["Estudio","Patio","Sala","Comedor","Cocina"]
  },
  {
    id:"terreno-av-heroes",
    tipo:"terreno",
    nombre:"Terreno Comercial Av. Héroes",
    precio:2000000,
    ubicacion:"Av. Héroes, Chetumal",
    descripcion:"Terreno comercial con ubicación estratégica.",
    portada:"/propiedades/terreno-av-heroes/portada.jpg",
    imagenes:["/propiedades/terreno-av-heroes/portada.jpg"],
    caracteristicas:{terreno:673,frente:16,fondo:42},
    idealPara:["Locales comerciales","Oficinas","Departamentos","Inversión"],
    amenidades:["Alta conectividad","Documentación en regla"]
  },
  {
    id:"terreno-justo-sierra",
    tipo:"terreno",
    nombre:"Terreno Justo Sierra",
    precio:1700000,
    ubicacion:"Calle Justo Sierra, Chetumal",
    descripcion:"Terreno de oportunidad en zona estratégica.",
    portada:"/propiedades/terreno-justo-sierra/portada.jpg",
    imagenes:["/propiedades/terreno-justo-sierra/portada.jpg"],
    caracteristicas:{terreno:673,frente:17.8},
    idealPara:["Locales","Oficinas","Departamentos","Inversión"],
    amenidades:["Alta plusvalía","Zona comercial"]
  },
  {
    id:"terreno-av-veracruz",
    tipo:"terreno",
    nombre:"Terreno Comercial Avenida Veracruz",
    precio:4500000,
    ubicacion:"Avenida Veracruz, Chetumal",
    descripcion:"Excelente terreno comercial de gran superficie.",
    portada:"/propiedades/terreno-av-veracruz/portada.jpg",
    imagenes:["/propiedades/terreno-av-veracruz/portada.jpg"],
    caracteristicas:{terreno:2570},
    idealPara:["Plaza comercial","Oficinas","Consultorios","Desarrollo mixto"],
    amenidades:["Alto flujo vehicular","Alta plusvalía","Excelente ubicación"]
  }
];