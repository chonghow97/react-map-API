import Marker from "../asset/image/marker.png";

const lat = 5.4386528290062275;
const lng = 100.38293858211833;
export const DEFAULT_LOGO = Marker;

export type GeoType = google.maps.LatLng | google.maps.LatLngLiteral;

export const DEFAULT_CENTER: GeoType = {
  lat,
  lng,
};

export const DEFAULT_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY || "";
