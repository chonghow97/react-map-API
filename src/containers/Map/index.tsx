import React, { useEffect, useState } from "react";

import {
  DEFAULT_API_KEY,
  DEFAULT_CENTER,
  DEFAULT_LOGO,
} from "../../config/constant";
import { AutocompleteType, CoordinateType } from "../../@types";

import {
  GoogleMap,
  LoadScript,
  GoogleMapProps,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";

import { MapInfoContainer } from "../MapInfoContainer";

import { InfoLayout, SearchBar } from "../../components";

const Map: React.FC<GoogleMapProps> = (props) => {
  // ============== STATE & VARIABLE
  const { children, ...restProps } = props;
  const [autocomplete, setAutoComplete] = useState<AutocompleteType | null>(
    null
  );
  const [isOpenMapInfo, setisOpenMapInfo] = useState(false);
  const [title, setTitle] = useState("Griter");
  const [position, setPosition] = useState<CoordinateType>(DEFAULT_CENTER);

  // ============== HOOKS

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess);
    } else {
      console.log("Geolocation is not supported for this Browser/OS.");
    }
  }, []);

  // ==============  FUNCTION
  const onSuccess: PositionCallback = (a) => {
    const { latitude, longitude } = a.coords;
    setPosition({ lat: latitude, lng: longitude });
  };

  const onCloseClick = () => {
    setisOpenMapInfo(false);
  };

  const onLoad: (autocomplete: AutocompleteType) => void = (autocomplete) => {
    setAutoComplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const { geometry, name } = autocomplete.getPlace() || {};
      setTitle(name || "");
      const { location } = geometry || {};
      setPosition(location || DEFAULT_CENTER);
    } else {
      console.error("unable to load cause autocomplete is null");
    }
  };

  const onClickMarker: (curr: CoordinateType) => void = (curr) => {
    setPosition(curr);
    setisOpenMapInfo(true);
  };

  // ==============  RENDER
  return (
    <LoadScript googleMapsApiKey={DEFAULT_API_KEY} libraries={["places"]}>
      {/* Map */}
      <GoogleMap center={position} {...restProps}>
        {/* Auto Complete */}
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          {/* Search Bar */}
          <SearchBar />
        </Autocomplete>

        {/* Marker */}
        <Marker
          position={position}
          icon={DEFAULT_LOGO}
          onClick={() => onClickMarker(position)}
        />

        {/* Map Info */}
        {isOpenMapInfo && (
          <InfoLayout
            onCloseClick={onCloseClick}
            position={position}
            children={<MapInfoContainer title={title} />}
          />
        )}
        {children}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
