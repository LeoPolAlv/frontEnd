export interface GeoJson {
  type: string;
  features: Feature[];
}

interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

interface Properties {
  title: string;
  direccion: string;
  oficina: string;
}

interface Geometry {
  type: string;
  coordinates: number[];
}
              
