export type CoordinateType = google.maps.LatLng | google.maps.LatLngLiteral;
export type PlaceResult = google.maps.places.PlaceResult;
export type AutocompleteType = google.maps.places.Autocomplete;
export type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];

export type MapHookType = (
  setMapLists: React.Dispatch<
    React.SetStateAction<google.maps.places.PlaceResult[]>
  >
) => {
  onCloseClick: () => void;
  onLoad: (autocomplete: AutocompleteType) => void;
  onPlaceChanged: () => void;
  onClickMarker: (curr: CoordinateType) => void;
  isOpenMapInfo: boolean;
  title: string;
  position: CoordinateType;
};
