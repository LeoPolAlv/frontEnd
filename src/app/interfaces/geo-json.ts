export interface GeoJson {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Properties {
  title: string;
  direccion: string;
  oficina: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}
              
