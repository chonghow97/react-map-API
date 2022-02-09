import { useEffect, useState } from "react";
import { AutocompleteType, CoordinateType } from "../@types";
import { DEFAULT_CENTER } from "../config/constant";
import { getLocationString } from "../helper";

export const useMapHook = () => {
  // ============== STATE
  const [autocomplete, setAutoComplete] = useState<AutocompleteType | null>(
    null
  );
  const [isOpenMapInfo, setisOpenMapInfo] = useState(false);
  const [title, setTitle] = useState("Griter");
  const [position, setPosition] = useState<CoordinateType>(DEFAULT_CENTER);

  // ==============  AUTOCOMPLETE

  const onLoad: (autocomplete: AutocompleteType) => void = (autocomplete) => {
    setAutoComplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const { geometry, name } = autocomplete.getPlace() || {};
      setTitle(name || "");
      const { location } = geometry || {};
      setPosition((prev) => location || prev);
      setisOpenMapInfo(false);
    } else {
      console.error("unable to load cause autocomplete is null");
    }
  };

  // ==============  MARKER
  const onClickMarker: (curr: CoordinateType) => void = (curr) => {
    setPosition(curr);
    setisOpenMapInfo(true);
  };

  // ==============  MAP INFO

  const onCloseClick = () => {
    setisOpenMapInfo(false);
  };

  // ============== GET CURRENT LOCATION

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess);
    } else {
      console.log("Geolocation is not supported for this Browser/OS.");
    }
  }, []);

  const onSuccess: PositionCallback = (current) => {
    const { latitude, longitude } = current.coords;
    setTitle(getLocationString(latitude, longitude));
    setPosition({ lat: latitude, lng: longitude });
  };

  return {
    onCloseClick,
    onLoad,
    onPlaceChanged,
    onClickMarker,
    isOpenMapInfo,
    title,
    position,
  };
};
